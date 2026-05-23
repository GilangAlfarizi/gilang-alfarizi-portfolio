import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type RefObject,
} from "react";

const TRANSITION_LOCK_MS = 550;
const WHEEL_THRESHOLD = 28;

interface UseHomeBeatsOptions {
	/** Beat index that may scroll internally before changing beats */
	scrollableBeatIndex?: number;
	scrollContainerRef?: RefObject<HTMLElement | null>;
}

export function useHomeBeats(
	beatCount: number,
	options: UseHomeBeatsOptions = {},
) {
	const { scrollableBeatIndex, scrollContainerRef } = options;
	const [beatIndex, setBeatIndex] = useState(0);
	const [direction, setDirection] = useState(1);
	const containerRef = useRef<HTMLDivElement>(null);
	const lockedRef = useRef(false);
	const touchStartY = useRef(0);

	const goToBeat = useCallback(
		(nextIndex: number) => {
			if (lockedRef.current) return;
			if (nextIndex < 0 || nextIndex >= beatCount) return;
			if (nextIndex === beatIndex) return;

			setDirection(nextIndex > beatIndex ? 1 : -1);
			setBeatIndex(nextIndex);
			lockedRef.current = true;
			window.setTimeout(() => {
				lockedRef.current = false;
			}, TRANSITION_LOCK_MS);
		},
		[beatCount, beatIndex],
	);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		const handleScrollableBeatWheel = (
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
				goToBeat(beatIndex - 1);
				return true;
			}

			return false;
		};

		const onWheel = (event: WheelEvent) => {
			if (Math.abs(event.deltaY) < WHEEL_THRESHOLD) return;

			const scrollEl = scrollContainerRef?.current;
			if (
				scrollEl &&
				scrollableBeatIndex !== undefined &&
				beatIndex === scrollableBeatIndex
			) {
				if (handleScrollableBeatWheel(event, scrollEl)) {
					event.preventDefault();
					return;
				}
			}

			event.preventDefault();

			if (event.deltaY > 0) {
				goToBeat(beatIndex + 1);
			} else {
				goToBeat(beatIndex - 1);
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
				scrollableBeatIndex !== undefined &&
				beatIndex === scrollableBeatIndex
			) {
				const atTop = scrollEl.scrollTop <= 0;
				if (delta > 0 && !atTop) return;
				if (delta < 0 && atTop) {
					goToBeat(beatIndex - 1);
					return;
				}
			}

			if (delta > 0) {
				goToBeat(beatIndex + 1);
			} else {
				goToBeat(beatIndex - 1);
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
		beatIndex,
		goToBeat,
		scrollContainerRef,
		scrollableBeatIndex,
	]);

	return {
		beatIndex,
		beatCount,
		direction,
		containerRef,
		goToBeat,
	};
}
