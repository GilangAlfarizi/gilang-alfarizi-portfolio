import { motion } from "motion/react";

import { GlassPanel } from "@/components/ui/glass-panel";
import { MotionButton } from "@/components/ui/motion-button";
import { fadeUp } from "@/lib/motion/presets";

interface CapabilitiesErrorStateProps {
	message: string;
	onRetry: () => void;
}

export function CapabilitiesErrorState({
	message,
	onRetry,
}: CapabilitiesErrorStateProps) {
	return (
		<motion.div
			className="flex size-full items-center justify-center px-6"
			initial="hidden"
			animate="visible"
			variants={fadeUp}
		>
			<GlassPanel className="max-w-md space-y-4 rounded-2xl p-6 text-center">
				<p className="text-[10px] tracking-[0.2em] text-red-400/90 uppercase">
					Failed to load skills
				</p>
				<p className="text-sm text-white/70">{message}</p>
				<MotionButton variant="glass" onClick={onRetry}>
					Try again
				</MotionButton>
			</GlassPanel>
		</motion.div>
	);
}
