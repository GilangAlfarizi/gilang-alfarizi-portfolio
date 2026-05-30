import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { useNavigation } from "@/hooks/useNavigation";
import { GlassPanel } from "@/components/ui/glass-panel";
import { MotionButton } from "@/components/ui/motion-button";
import { easeOut } from "@/lib/motion/presets";
import { NAV_ITEMS } from "@/types/navigation";
import { cn } from "@/lib/utils";

export function MobileNavMenu() {
	const [open, setOpen] = useState(false);
	const { activeSection, setActiveSection } = useNavigation();

	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	const navigate = (section: (typeof NAV_ITEMS)[number]["id"]) => {
		setActiveSection(section);
		setOpen(false);
	};

	return (
		<div className="md:hidden">
			<MotionButton
				variant="glass-outline"
				className="px-3! py-2!"
				aria-expanded={open}
				aria-controls="mobile-nav-panel"
				aria-label={open ? "Close menu" : "Open menu"}
				onClick={() => setOpen((prev) => !prev)}
			>
				{open ? <X className="size-4" /> : <Menu className="size-4" />}
			</MotionButton>

			{createPortal(
				<AnimatePresence>
					{open && (
						<>
							<motion.button
								type="button"
								className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.25, ease: easeOut }}
								aria-label="Close menu overlay"
								onClick={() => setOpen(false)}
							/>

							<motion.div
								id="mobile-nav-panel"
								role="dialog"
								aria-modal="true"
								className="fixed inset-x-4 top-20 z-[70]"
								initial={{ y: -12 }}
								animate={{ y: 0 }}
								exit={{ y: -8 }}
								transition={{ duration: 0.3, ease: easeOut }}
							>
								<GlassPanel className="rounded-2xl p-4">
									<nav
										className="flex flex-col gap-1"
										aria-label="Mobile"
									>
										{NAV_ITEMS.map((item) => (
											<button
												key={item.id}
												type="button"
												onClick={() => navigate(item.id)}
												className={cn(
													"rounded-xl px-4 py-3 text-left text-sm font-medium tracking-wide transition-colors",
													activeSection === item.id
														? "bg-white/10 text-white"
														: "text-white/65 hover:bg-white/5 hover:text-white",
												)}
											>
												{item.label}
											</button>
										))}
									</nav>

									<div className="mt-3 border-t border-white/10 pt-3">
										<MotionButton
											variant="glass"
											className="w-full justify-center"
											onClick={() => setOpen(false)}
										>
											Connect
										</MotionButton>
									</div>
								</GlassPanel>
							</motion.div>
						</>
					)}
				</AnimatePresence>,
				document.body,
			)}
		</div>
	);
}
