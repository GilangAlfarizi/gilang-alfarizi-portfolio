import { NavigationProvider } from "@/app/providers/NavigationProvider";
import { AtmosphericOverlay } from "@/components/layout/AtmosphericOverlay";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { OverlayStage } from "@/components/layout/OverlayStage";
import { PersistentBackground } from "@/components/layout/PersistentBackground";

/**
 * Z-index layers:
 * 0  — PersistentBackground
 * 1  — AtmosphericOverlay (vignette / scrims)
 * 10 — OverlayStage (section content)
 * 50 — Navbar, Footer (always on top)
 */
export function AppShell() {
	return (
		<NavigationProvider>
			<div className="relative min-h-dvh overflow-hidden text-white">
				<PersistentBackground />
				<AtmosphericOverlay />
				<OverlayStage />
				<Navbar />
				<Footer />
			</div>
		</NavigationProvider>
	);
}
