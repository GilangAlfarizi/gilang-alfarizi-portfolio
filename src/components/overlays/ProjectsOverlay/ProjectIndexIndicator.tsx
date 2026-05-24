import { cn } from "@/lib/utils";

interface ProjectIndexIndicatorProps {
	total: number;
	activeIndex: number;
	onSelect: (index: number) => void;
}

export function ProjectIndexIndicator({
	total,
	activeIndex,
	onSelect,
}: ProjectIndexIndicatorProps) {
	if (total <= 1) return null;

	return (
		<div
			className="pointer-events-auto flex justify-center gap-2 pb-1"
			aria-label="Project navigation"
		>
			{Array.from({ length: total }, (_, index) => (
				<button
					key={index}
					type="button"
					aria-label={`Project ${index + 1}`}
					aria-current={activeIndex === index}
					onClick={() => onSelect(index)}
					className={cn(
						"rounded-full transition-all",
						activeIndex === index
							? "size-2 bg-emerald-400"
							: "size-1.5 bg-white/30 hover:bg-white/50",
					)}
				/>
			))}
		</div>
	);
}
