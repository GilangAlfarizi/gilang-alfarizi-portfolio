import { motion } from "motion/react";

import { useNavigation } from "@/hooks/useNavigation";
import { GlassPanel } from "@/components/ui/glass-panel";
import { MotionButton } from "@/components/ui/motion-button";
import { fadeDown, staggerContainer } from "@/lib/motion/presets";
import { NAV_ITEMS } from "@/types/navigation";
import { cn } from "@/lib/utils";

import { MobileNavMenu } from "./MobileNavMenu";

export function Navbar() {
	const { activeSection, setActiveSection } = useNavigation();

	return (
		<motion.header
			className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-6 sm:pt-5"
			initial="hidden"
			animate="visible"
			variants={staggerContainer}>
			<motion.div variants={fadeDown} className="w-full max-w-5xl">
				<GlassPanel className="flex items-center justify-between gap-2 rounded-full px-3 py-2 sm:gap-4 sm:px-6 sm:py-2.5">
					<a
						href="/"
						className="shrink-0 font-display text-xs font-bold tracking-[0.16em] text-white sm:text-sm sm:tracking-[0.2em] md:text-base"
						onClick={(e) => {
							e.preventDefault();
							setActiveSection("home");
						}}>
						GILANG'S
					</a>

					<nav
						className="hidden items-center gap-0.5 lg:flex"
						aria-label="Main">
						{NAV_ITEMS.map((item) => (
							<NavLink
								key={item.id}
								label={item.label}
								isActive={activeSection === item.id}
								onClick={() => setActiveSection(item.id)}
							/>
						))}
					</nav>

					{/* Tablet: compact nav */}
					<nav
						className="hidden items-center gap-0.5 md:flex lg:hidden"
						aria-label="Main compact">
						{NAV_ITEMS.map((item) => (
							<NavLink
								key={item.id}
								label={item.shortLabel ?? item.label}
								isActive={activeSection === item.id}
								onClick={() => setActiveSection(item.id)}
								compact
							/>
						))}
					</nav>

					<div className="flex items-center gap-2">
						<MotionButton
							variant="glass-outline"
							className="hidden shrink-0 lg:inline-flex">
							<a
								href="https://wa.me/6287888760035"
								target="_blank"
								rel="noopener">
								Contact
							</a>
						</MotionButton>
						<MobileNavMenu />
					</div>
				</GlassPanel>
			</motion.div>
		</motion.header>
	);
}

function NavLink({
	label,
	isActive,
	onClick,
	compact = false,
}: {
	label: string;
	isActive: boolean;
	onClick: () => void;
	compact?: boolean;
}) {
	return (
		<motion.button
			type="button"
			onClick={onClick}
			className={cn(
				"relative font-medium tracking-wide transition-colors",
				compact ? "px-2 py-1.5 text-xs" : "px-3 py-1.5 text-sm",
				isActive ? "text-white" : "text-white/60 hover:text-white/90",
			)}
			whileHover={{ scale: 1.04 }}
			whileTap={{ scale: 0.96 }}
			transition={{ duration: 0.2 }}>
			{label}
			{isActive && (
				<motion.span
					layoutId="nav-underline"
					className="absolute inset-x-1.5 -bottom-0.5 h-px bg-white sm:inset-x-2"
					transition={{ type: "spring", stiffness: 380, damping: 30 }}
				/>
			)}
		</motion.button>
	);
}
