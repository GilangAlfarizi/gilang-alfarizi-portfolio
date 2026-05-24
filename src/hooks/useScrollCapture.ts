import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type RefObject,
} from "react";

const TRANSITION_LOCK_MS = 550;
const WHEEL_THRESHOLD = 28;

interface UseScrollCaptureOptions {
	scrollableIndex?: number;
	scrollContainerRef?: RefObject<HTMLElement | null>;
	enabled?: boolean;
	index?: number;
	onIndexChange?: (index: number) => void;
}

export function useScrollCapture(
	itemCount: number,
	options: UseScrollCaptureOptions = {},
) {
	const {
		scrollableIndex,
		scrollContainerRef,
		enabled = true,
		index: controlledIndex,
		onIndexChange,
	} = options;

	const [internalIndex, setInternalIndex] = useState(0);
	const activeIndex = controlledIndex ?? internalIndex;
	const [direction, setDirection] = useState(1);
	const containerRef = useRef<HTMLDivElement>(null);
	const lockedRef = useRef(false);
	const touchStartY = useRef(0);

	const setActiveIndex = useCallback(
		(nextIndex: number) => {
			if (onIndexChange) {
				onIndexChange(nextIndex);
			} else {
				setInternalIndex(nextIndex);
			}
		},
		[onIndexChange],
	);

	const goToIndex = useCallback(
		(nextIndex: number) => {
			if (!enabled || lockedRef.current) return;
			if (nextIndex < 0 || nextIndex >= itemCount) return;
			if (nextIndex === activeIndex) return;

			setDirection(nextIndex > activeIndex ? 1 : -1);
			setActiveIndex(nextIndex);
			lockedRef.current = true;
			window.setTimeout(() => {
				lockedRef.current = false;
			}, TRANSITION_LOCK_MS);
		},
		[activeIndex, enabled, itemCount, setActiveIndex],
	);

	useEffect(() => {
		if (!enabled || itemCount <= 1) return;

		const el = containerRef.current;
		if (!el) return;

		const handleScrollableWheel = (
			event: WheelEvent,
			scrollEl: HTMLElement,
		): boolean => {
			const canScroll = scrollEl.scrollHeight > scrollEl.clientHeight + 8;
			if (!canScroll) return false;

			const atTop = scrollEl.scrollTop <= 0;
			const atBottom =
				scrollEl.scrollTop + scrollEl.clientHeight >=
				scrollEl.scrollHeight - 2;

			if (event.deltaY > 0 && !atBottom) {
				scrollEl.scrollTop += event.deltaY;
				return true;
			}

			if (event.deltaY < 0 && !atTop) {
				scrollEl.scrollTop += event.deltaY;
				return true;
			}

			if (event.deltaY < 0 && atTop) {
				goToIndex(activeIndex - 1);
				return true;
			}

			return false;
		};

		const onWheel = (event: WheelEvent) => {
			if (Math.abs(event.deltaY) < WHEEL_THRESHOLD) return;

			const scrollEl = scrollContainerRef?.current;
			if (
				scrollEl &&
				scrollableIndex !== undefined &&
				activeIndex === scrollableIndex
			) {
				if (handleScrollableWheel(event, scrollEl)) {
					event.preventDefault();
					return;
				}
			}

			event.preventDefault();

			if (event.deltaY > 0) {
				goToIndex(activeIndex + 1);
			} else {
				goToIndex(activeIndex - 1);
			}
		};

		const onTouchStart = (event: TouchEvent) => {
			touchStartY.current = event.touches[0]?.clientY ?? 0;
		};

		const onTouchEnd = (event: TouchEvent) => {
			const endY = event.changedTouches[0]?.clientY ?? 0;
			const delta = touchStartY.current - endY;
			if (Math.abs(delta) < 48) return;

			const scrollEl = scrollContainerRef?.current;
			if (
				scrollEl &&
				scrollableIndex !== undefined &&
				activeIndex === scrollableIndex
			) {
				const atTop = scrollEl.scrollTop <= 0;
				if (delta > 0 && !atTop) return;
				if (delta < 0 && atTop) {
					goToIndex(activeIndex - 1);
					return;
				}
			}

			if (delta > 0) {
				goToIndex(activeIndex + 1);
			} else {
				goToIndex(activeIndex - 1);
			}
		};

		el.addEventListener("wheel", onWheel, { passive: false });
		el.addEventListener("touchstart", onTouchStart, { passive: true });
		el.addEventListener("touchend", onTouchEnd, { passive: true });

		return () => {
			el.removeEventListener("wheel", onWheel);
			el.removeEventListener("touchstart", onTouchStart);
			el.removeEventListener("touchend", onTouchEnd);
		};
	}, [
		activeIndex,
		enabled,
		goToIndex,
		itemCount,
		scrollContainerRef,
		scrollableIndex,
	]);

	useEffect(() => {
		if (controlledIndex !== undefined) return;
		if (activeIndex >= itemCount && itemCount > 0) {
			setInternalIndex(itemCount - 1);
		}
	}, [activeIndex, controlledIndex, itemCount]);

	return {
		activeIndex,
		direction,
		containerRef,
		goToIndex,
	};
}
