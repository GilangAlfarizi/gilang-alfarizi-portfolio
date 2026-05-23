import { motion } from "motion/react";

import mainBackground from "@/assets/main-background.jpg";

import { transitionSlow } from "@/lib/motion/presets";

export function PersistentBackground() {
	return (
		<div className="fixed inset-0 z-0 overflow-hidden" aria-hidden>
			<motion.img
				src={mainBackground}
				alt=""
				className="size-full object-cover object-center"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={transitionSlow}
				fetchPriority="high"
			/>
		</div>
	);
}
