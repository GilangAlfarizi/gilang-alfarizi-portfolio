import { motion, type HTMLMotionProps } from "motion/react";

import { cn } from "@/lib/utils";

import { easeOut } from "@/lib/motion/presets";

type MotionButtonProps = HTMLMotionProps<"button"> & {
	variant?: "glass" | "glass-outline" | "ghost";
};

const variantStyles = {
	glass:
		"rounded-full border border-white/15 bg-white/10 px-6 py-2.5 text-sm font-medium tracking-wide text-white backdrop-blur-md",
	"glass-outline":
		"rounded-full border border-white/25 bg-transparent px-5 py-2 text-sm font-medium tracking-wide text-white/90 backdrop-blur-sm",
	ghost:
		"rounded-full px-3 py-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white",
};

export function MotionButton({
	className,
	variant = "glass",
	children,
	...props
}: MotionButtonProps) {
	return (
		<motion.button
			type="button"
			className={cn(
				"cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
				variantStyles[variant],
				className,
			)}
			whileHover={{
				scale: 1.03,
				backgroundColor:
					variant === "glass-outline"
						? "rgba(255,255,255,0.08)"
						: "rgba(255,255,255,0.16)",
				borderColor: "rgba(255,255,255,0.35)",
			}}
			whileTap={{ scale: 0.97 }}
			transition={{ duration: 0.25, ease: easeOut }}
			{...props}
		>
			{children}
		</motion.button>
	);
}
