import { motion } from "motion/react";

import { MotionButton } from "@/components/ui/motion-button";
import { fadeUp } from "@/lib/motion/presets";

const FOOTER_LINKS = [
	{ label: "Github", href: "https://github.com" },
	{ label: "LinkedIn", href: "https://linkedin.com" },
	{ label: "Source", href: "#" },
] as const;

export function Footer() {
	const year = new Date().getFullYear();

	return (
		<motion.footer
			className="fixed inset-x-0 bottom-0 z-50 px-4 pb-5 sm:px-6"
			initial="hidden"
			animate="visible"
			variants={fadeUp}
		>
			<div className="mx-auto flex max-w-6xl items-end justify-between gap-4">
				<p className="text-xs tracking-[0.15em] text-white/50 uppercase">
					© {year} Celestial Futurity
				</p>

				<div className="flex items-center gap-1 sm:gap-2">
					{FOOTER_LINKS.map((link) => (
						<MotionButton
							key={link.label}
							variant="ghost"
							className="text-xs tracking-wider uppercase sm:text-sm"
							onClick={() => window.open(link.href, "_blank", "noopener")}
						>
							{link.label}
						</MotionButton>
					))}
				</div>
			</div>
		</motion.footer>
	);
}
