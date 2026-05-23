import { AnimatePresence, motion } from "motion/react";

import { useNavigation } from "@/hooks/useNavigation";
import { HomeOverlay } from "@/components/overlays/HomeOverlay/HomeOverlay";
import { easeOut } from "@/lib/motion/presets";
import type { Section } from "@/types/navigation";

const overlayTransition = {
	duration: 0.45,
	ease: easeOut,
};

function PlaceholderOverlay({ title }: { title: string }) {
	return (
		<div className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
			<p className="font-display text-sm tracking-[0.25em] text-emerald-400/90 uppercase">
				Coming soon
			</p>
			<h2 className="mt-4 font-display text-3xl tracking-wide text-white uppercase sm:text-4xl">
				{title}
			</h2>
		</div>
	);
}

function SectionContent({ section }: { section: Section }) {
	switch (section) {
		case "home":
			return <HomeOverlay />;
		case "projects":
			return <PlaceholderOverlay title="Projects" />;
		case "about":
			return <PlaceholderOverlay title="About" />;
		case "certificates":
			return <PlaceholderOverlay title="Certificates" />;
	}
}

export function OverlayStage() {
	const { activeSection } = useNavigation();

	return (
		<main className="fixed inset-0 z-10 flex items-center justify-center overflow-hidden pt-24 pb-20">
			<AnimatePresence mode="wait">
				<motion.div
					key={activeSection}
					className="size-full"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -16 }}
					transition={overlayTransition}>
					<SectionContent section={activeSection} />
				</motion.div>
			</AnimatePresence>
		</main>
	);
}
