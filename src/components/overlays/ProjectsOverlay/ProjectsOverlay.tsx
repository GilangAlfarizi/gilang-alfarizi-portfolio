import { AnimatePresence, motion } from "motion/react";

import { useProjects } from "@/hooks/useProjects";
import { useScrollCapture } from "@/hooks/useScrollCapture";
import { beatSlide } from "@/lib/motion/presets";

import { ProjectIndexIndicator } from "./ProjectIndexIndicator";
import { ProjectScene } from "./ProjectScene";
import { ProjectsHeader } from "./ProjectsHeader";
import {
	ProjectsEmptyState,
	ProjectsErrorState,
	ProjectsLoadingState,
} from "./ProjectsStates";

export function ProjectsOverlay() {
	const { projects, loading, error, refetch } = useProjects();
	const projectCount = projects.length;

	const { activeIndex, direction, containerRef, goToIndex } =
		useScrollCapture(projectCount, {
			enabled: !loading && !error && projectCount > 0,
		});

	const activeProject = projects[activeIndex];

	return (
		<div
			ref={containerRef}
			className="relative flex size-full touch-pan-y flex-col overflow-hidden"
		>
			{loading && <ProjectsLoadingState />}

			{!loading && error && (
				<ProjectsErrorState message={error} onRetry={refetch} />
			)}

			{!loading && !error && projectCount === 0 && (
				<ProjectsEmptyState />
			)}

			{!loading && !error && projectCount > 0 && activeProject && (
				<>
					<ProjectsHeader />

					<div className="relative min-h-0 flex-1">
						<AnimatePresence mode="wait" custom={direction}>
							<motion.div
								key={activeProject.id}
								custom={direction}
								variants={beatSlide}
								initial="enter"
								animate="center"
								exit="exit"
								className="absolute inset-0"
							>
								<ProjectScene
									project={activeProject}
									index={activeIndex}
									total={projectCount}
								/>
							</motion.div>
						</AnimatePresence>
					</div>

					<ProjectIndexIndicator
						total={projectCount}
						activeIndex={activeIndex}
						onSelect={goToIndex}
					/>

					{projectCount > 1 && activeIndex < projectCount - 1 && (
						<p className="pointer-events-none pb-1 text-center text-[10px] tracking-[0.2em] text-white/35 uppercase">
							Scroll for next project
						</p>
					)}
				</>
			)}
		</div>
	);
}
