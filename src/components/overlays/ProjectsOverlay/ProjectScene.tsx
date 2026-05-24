import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

import { GlassPanel } from "@/components/ui/glass-panel";
import { MotionButton } from "@/components/ui/motion-button";
import { fadeUp, staggerContainer } from "@/lib/motion/presets";
import type { Project } from "@/types/project";

interface ProjectSceneProps {
	project: Project;
	index: number;
	total: number;
}

function formatIndex(value: number): string {
	return String(value + 1).padStart(2, "0");
}

export function ProjectScene({ project, index, total }: ProjectSceneProps) {
	return (
		<motion.div
			className="mx-auto flex size-full max-w-6xl flex-col justify-center gap-5 px-4 pb-4 sm:px-6 lg:gap-6"
			variants={staggerContainer}
			initial="hidden"
			animate="visible"
		>
			<motion.div
				variants={fadeUp}
				className="grid overflow-hidden rounded-2xl border border-white/10 bg-black/20 shadow-[0_16px_48px_rgba(0,0,0,0.45)] backdrop-blur-sm lg:grid-cols-[1.05fr_0.95fr] lg:rounded-3xl"
			>
				<div className="relative aspect-[16/10] overflow-hidden bg-black/40 lg:aspect-auto lg:min-h-[340px]">
					{project.coverImageUrl ? (
						<img
							src={project.coverImageUrl}
							alt={project.title}
							className="size-full object-cover object-center"
							loading={index === 0 ? "eager" : "lazy"}
						/>
					) : (
						<div className="flex size-full items-center justify-center text-sm text-white/40">
							No preview
						</div>
					)}
					<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/20" />
				</div>

				<GlassPanel className="flex flex-col justify-center rounded-none border-0 border-t border-white/10 bg-black/30 p-5 sm:p-6 lg:border-t-0 lg:border-l lg:p-8">
					<p className="text-[10px] tracking-[0.22em] text-emerald-400 uppercase sm:text-xs">
						{formatIndex(index)} / {String(total).padStart(2, "0")} · Project
					</p>

					<h3 className="font-display mt-3 text-xl leading-tight font-bold tracking-[0.04em] text-white uppercase sm:text-2xl lg:text-3xl">
						{project.title}
					</h3>

					<p className="mt-4 line-clamp-5 text-xs leading-relaxed text-white/70 sm:text-sm lg:line-clamp-6">
						{project.description}
					</p>

					<div className="mt-6">
						<MotionButton
							variant="glass-outline"
							className="inline-flex items-center gap-2 !px-5 !py-2.5 text-xs tracking-[0.14em] uppercase sm:text-sm"
							onClick={() => {
								// Detail modal / case study — Phase 8
							}}
						>
							View Project
							<ArrowRight className="size-4" strokeWidth={1.75} />
						</MotionButton>
					</div>
				</GlassPanel>
			</motion.div>
		</motion.div>
	);
}
