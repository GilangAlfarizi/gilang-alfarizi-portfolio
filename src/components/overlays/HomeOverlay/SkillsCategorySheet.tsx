import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";

import { SkillTile } from "@/components/skills/SkillTile";
import { GlassPanel } from "@/components/ui/glass-panel";
import { MotionButton } from "@/components/ui/motion-button";
import type { SkillCategoryGroup } from "@/lib/skills/groupSkillsByType";
import { easeOut } from "@/lib/motion/presets";

interface SkillsCategorySheetProps {
	category: SkillCategoryGroup | null;
	onClose: () => void;
}

export function SkillsCategorySheet({
	category,
	onClose,
}: SkillsCategorySheetProps) {
	const open = category !== null;

	useEffect(() => {
		if (!open) return;

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") onClose();
		};

		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [open, onClose]);

	return (
		<AnimatePresence>
			{open && category && (
				<>
					<motion.button
						type="button"
						className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px]"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.25, ease: easeOut }}
						aria-label="Close skills panel"
						onClick={onClose}
					/>

					<motion.div
						role="dialog"
						aria-modal="true"
						aria-labelledby="skills-sheet-title"
						className="fixed inset-x-0 bottom-0 z-50 max-h-[min(72vh,520px)] px-4 pb-6 sm:px-6"
						initial={{ y: "100%" }}
						animate={{ y: 0 }}
						exit={{ y: "100%" }}
						transition={{ duration: 0.35, ease: easeOut }}
					>
						<GlassPanel className="flex max-h-[min(72vh,520px)] flex-col overflow-hidden rounded-t-2xl border-white/15">
							<div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
								<div>
									<p className="text-[10px] tracking-[0.2em] text-emerald-400/90 uppercase">
										Arsenal
									</p>
									<h3
										id="skills-sheet-title"
										className="font-display text-lg font-bold tracking-[0.06em] text-white uppercase"
									>
										{category.label}
									</h3>
								</div>
								<MotionButton
									variant="glass-outline"
									className="size-9! p-0!"
									onClick={onClose}
									aria-label="Close"
								>
									<X className="size-4" strokeWidth={1.75} />
								</MotionButton>
							</div>

							<div className="overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
								{category.skills.length > 0 ? (
									<div className="flex flex-wrap gap-2.5 sm:gap-3">
										{category.skills.map((skill) => (
											<SkillTile
												key={skill.id}
												skill={skill}
												className="size-11 sm:size-12"
											/>
										))}
									</div>
								) : (
									<p className="text-sm text-white/50">
										No skills in this category yet.
									</p>
								)}
							</div>
						</GlassPanel>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
