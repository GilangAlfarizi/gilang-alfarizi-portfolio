import { AnimatePresence, motion } from "motion/react";
import { useRef } from "react";

import { useHomeBeats } from "@/hooks/useHomeBeats";
import { beatSlide } from "@/lib/motion/presets";

import { BeatIndicator } from "./BeatIndicator";
import { CapabilitiesBeat } from "./beats/CapabilitiesBeat";
import { HeroBeat } from "./beats/HeroBeat";

const HOME_BEAT_COUNT = 2;
const CAPABILITIES_BEAT_INDEX = 1;

export function HomeOverlay() {
	const capabilitiesScrollRef = useRef<HTMLDivElement>(null);
	const { beatIndex, direction, containerRef, goToBeat } = useHomeBeats(
		HOME_BEAT_COUNT,
		{
			scrollableBeatIndex: CAPABILITIES_BEAT_INDEX,
			scrollContainerRef: capabilitiesScrollRef,
		},
	);

	return (
		<div
			ref={containerRef}
			className="relative size-full touch-pan-y"
			aria-roledescription="carousel"
			aria-label="Home story sections"
		>
			<BeatIndicator
				count={HOME_BEAT_COUNT}
				activeIndex={beatIndex}
				onSelect={goToBeat}
			/>

			<AnimatePresence mode="wait" custom={direction}>
				{beatIndex === 0 ? (
					<motion.div
						key="hero"
						custom={direction}
						variants={beatSlide}
						initial="enter"
						animate="center"
						exit="exit"
						className="absolute inset-0"
					>
						<HeroBeat />
					</motion.div>
				) : (
					<motion.div
						key="capabilities"
						custom={direction}
						variants={beatSlide}
						initial="enter"
						animate="center"
						exit="exit"
						className="absolute inset-0"
					>
						<CapabilitiesBeat ref={capabilitiesScrollRef} />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
