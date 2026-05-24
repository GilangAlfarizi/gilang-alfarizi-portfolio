import { type RefObject } from "react";

import { useScrollCapture } from "@/hooks/useScrollCapture";

interface UseHomeBeatsOptions {
	scrollableBeatIndex?: number;
	scrollContainerRef?: RefObject<HTMLElement | null>;
}

export function useHomeBeats(
	beatCount: number,
	options: UseHomeBeatsOptions = {},
) {
	const { activeIndex, direction, containerRef, goToIndex } =
		useScrollCapture(beatCount, options);

	return {
		beatIndex: activeIndex,
		beatCount,
		direction,
		containerRef,
		goToBeat: goToIndex,
	};
}
