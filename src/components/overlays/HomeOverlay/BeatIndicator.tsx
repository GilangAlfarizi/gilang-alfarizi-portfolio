import { motion } from "motion/react";

import { cn } from "@/lib/utils";

interface BeatIndicatorProps {
	count: number;
	activeIndex: number;
	onSelect: (index: number) => void;
}

export function BeatIndicator({
	count,
	activeIndex,
	onSelect,
}: BeatIndicatorProps) {
	return (
		<div
			className="pointer-events-auto fixed right-3 top-1/2 z-20 -translate-y-1/2 flex-col gap-2 sm:right-4"
			aria-label="Home sections">
			{Array.from({ length: count }, (_, index) => (
				<button
					key={index}
					type="button"
					aria-label={`Go to section ${index + 1}`}
					aria-current={activeIndex === index}
					onClick={() => onSelect(index)}
					className="group flex items-center justify-end gap-2">
					<span
						className={cn(
							"text-[10px] tracking-widest uppercase opacity-0 transition-opacity group-hover:opacity-100",
							activeIndex === index ? "text-emerald-400/90" : "text-white/40",
						)}>
						{String(index + 1).padStart(2, "0")}
					</span>
					<motion.span
						className={cn(
							"block rounded-full",
							activeIndex === index
								? "bg-emerald-400"
								: "bg-white/30 group-hover:bg-white/50",
						)}
						animate={{
							width: activeIndex === index ? 10 : 6,
							height: activeIndex === index ? 10 : 6,
						}}
						transition={{ duration: 0.25 }}
					/>
				</button>
			))}
		</div>
	);
}
