import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";

export function ScrollHint() {
	return (
		<motion.div
			className="pointer-events-none absolute inset-x-0 bottom-1 flex flex-col items-center gap-1 "
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 1.2, duration: 0.5 }}
		>
			<span className="text-[10px] tracking-[0.25em] text-white/45 uppercase">
				Scroll
			</span>
			<motion.div
				animate={{ y: [0, 6, 0] }}
				transition={{
					duration: 1.6,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				}}
			>
				<ChevronDown className="size-4 text-white/50" strokeWidth={1.5} />
			</motion.div>
		</motion.div>
	);
}
