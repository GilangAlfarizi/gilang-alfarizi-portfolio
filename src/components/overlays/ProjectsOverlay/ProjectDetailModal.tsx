import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

import { GlassPanel } from "@/components/ui/glass-panel";
import { MotionButton } from "@/components/ui/motion-button";
import { useProjectDetail } from "@/hooks/useProjectDetail";
import { easeOut } from "@/lib/motion/presets";

import { ProjectImageGallery } from "./ProjectImageGallery";

interface ProjectDetailModalProps {
	projectId: number | null;
	coverImageUrl: string | null;
	onClose: () => void;
}

export function ProjectDetailModal({
	projectId,
	coverImageUrl,
	onClose,
}: ProjectDetailModalProps) {
	const open = projectId !== null;
	const { project, loading, error, refetch } = useProjectDetail(projectId);
	const [selectedImageId, setSelectedImageId] = useState<number | null>(null);

	useEffect(() => {
		if (!project?.images.length) {
			setSelectedImageId(null);
			return;
		}
		setSelectedImageId(project.images[0].id);
	}, [project?.id, project?.images]);

	useEffect(() => {
		if (!open) return;

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") onClose();
		};

		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.body.style.overflow = previousOverflow;
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [open, onClose]);

	const heroSrc = useMemo(() => {
		if (!project) return coverImageUrl;

		const selected = project.images.find(
			(image) => image.id === selectedImageId,
		);
		return (
			selected?.image ??
			project.images[0]?.image ??
			coverImageUrl ??
			null
		);
	}, [project, selectedImageId, coverImageUrl]);

	return (
		<AnimatePresence>
			{open && (
				<>
					<motion.button
						type="button"
						className="fixed inset-0 z-60 bg-black/65 backdrop-blur-sm"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.25, ease: easeOut }}
						aria-label="Close project detail"
						onClick={onClose}
					/>

					<motion.div
						role="dialog"
						aria-modal="true"
						aria-labelledby="project-detail-title"
						className="fixed inset-0 z-61 flex items-center justify-center p-4 sm:p-6"
						initial={{ opacity: 0, scale: 0.96, y: 12 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.98, y: 8 }}
						transition={{ duration: 0.3, ease: easeOut }}
					>
						<GlassPanel
							className="flex max-h-[min(90dvh,820px)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border-white/15 sm:rounded-3xl"
							onClick={(event) => event.stopPropagation()}
						>
							<div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6 sm:py-4">
								<p className="text-[10px] tracking-[0.22em] text-emerald-400/90 uppercase sm:text-xs">
									Detail of Project
								</p>
								<MotionButton
									variant="glass-outline"
									className="size-9! rounded-full! p-0!"
									onClick={onClose}
									aria-label="Close"
								>
									<X className="size-4 mx-auto" strokeWidth={1.75} />
								</MotionButton>
							</div>

							<div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
								{loading && <ProjectDetailSkeleton />}

								{!loading && error && (
									<div className="flex flex-col items-center gap-4 py-10 text-center">
										<p className="text-sm text-white/70">{error}</p>
										<MotionButton variant="glass" onClick={refetch}>
											Try again
										</MotionButton>
									</div>
								)}

								{!loading && !error && project && (
									<div className="flex flex-col gap-4 lg:gap-5">
										<div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
											<div className="flex min-w-0 flex-col gap-3 lg:max-h-[min(52vh,480px)] lg:overflow-y-auto lg:pr-1">
												<h2
													id="project-detail-title"
													className="font-display text-xl font-bold leading-tight tracking-[0.04em] text-white uppercase sm:text-2xl lg:text-3xl"
												>
													{project.title}
												</h2>
												<p className="text-xs leading-relaxed text-white/75 sm:text-sm">
													{project.description}
												</p>
											</div>

											<div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-black/40 lg:aspect-auto lg:min-h-52 lg:rounded-2xl">
												<AnimatePresence mode="wait">
													{heroSrc ? (
														<motion.img
															key={heroSrc}
															src={heroSrc}
															alt={project.title}
															className="size-full object-cover object-center"
															initial={{ opacity: 0 }}
															animate={{ opacity: 1 }}
															exit={{ opacity: 0 }}
															transition={{
																duration: 0.25,
																ease: easeOut,
															}}
														/>
													) : (
														<motion.div
															key="empty"
															className="flex size-full items-center justify-center text-sm text-white/40"
															initial={{ opacity: 0 }}
															animate={{ opacity: 1 }}
															exit={{ opacity: 0 }}
														>
															No preview
														</motion.div>
													)}
												</AnimatePresence>
											</div>
										</div>

										<ProjectImageGallery
											images={project.images}
											selectedImageId={selectedImageId}
											onSelect={setSelectedImageId}
										/>
									</div>
								)}
							</div>
						</GlassPanel>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}

function ProjectDetailSkeleton() {
	return (
		<div className="flex flex-col gap-4 lg:gap-5">
			<div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
				<div className="space-y-3">
					<div className="h-8 w-3/4 animate-pulse rounded-lg bg-white/10" />
					<div className="h-4 w-full animate-pulse rounded bg-white/10" />
					<div className="h-4 w-full animate-pulse rounded bg-white/10" />
					<div className="h-4 w-2/3 animate-pulse rounded bg-white/10" />
				</div>
				<div className="aspect-video animate-pulse rounded-xl bg-white/10 lg:min-h-52" />
			</div>
			<div className="flex gap-2 overflow-hidden">
				{Array.from({ length: 4 }, (_, index) => (
					<div
						key={index}
						className="aspect-video w-28 shrink-0 animate-pulse rounded-lg bg-white/10 sm:w-36"
					/>
				))}
			</div>
		</div>
	);
}
