import { motion } from "motion/react";

import { GlassPanel } from "@/components/ui/glass-panel";
import { MotionButton } from "@/components/ui/motion-button";
import { fadeUp } from "@/lib/motion/presets";

export function ProjectsLoadingState() {
	return (
		<div className="flex size-full flex-col items-center justify-center gap-4 px-6">
			<motion.div
				className="size-8 rounded-full border-2 border-white/20 border-t-emerald-400"
				animate={{ rotate: 360 }}
				transition={{
					duration: 0.9,
					repeat: Number.POSITIVE_INFINITY,
					ease: "linear",
				}}
			/>
			<p className="text-xs tracking-[0.2em] text-white/50 uppercase">
				Loading projects…
			</p>
		</div>
	);
}

export function ProjectsErrorState({
	message,
	onRetry,
}: {
	message: string;
	onRetry: () => void;
}) {
	return (
		<motion.div
			className="flex size-full flex-col items-center justify-center gap-4 px-6 text-center"
			initial="hidden"
			animate="visible"
			variants={fadeUp}
		>
			<GlassPanel className="max-w-md space-y-4 rounded-2xl p-6">
				<p className="text-[10px] tracking-[0.2em] text-red-400/90 uppercase">
					Connection error
				</p>
				<p className="text-sm text-white/70">{message}</p>
				<MotionButton variant="glass" onClick={onRetry}>
					Try again
				</MotionButton>
			</GlassPanel>
		</motion.div>
	);
}

export function ProjectsEmptyState() {
	return (
		<motion.div
			className="flex size-full flex-col items-center justify-center px-6 text-center"
			initial="hidden"
			animate="visible"
			variants={fadeUp}
		>
			<p className="font-display text-2xl tracking-wide text-white uppercase">
				No projects yet
			</p>
			<p className="mt-2 text-sm text-white/55">
				Projects will appear here once published.
			</p>
		</motion.div>
	);
}
