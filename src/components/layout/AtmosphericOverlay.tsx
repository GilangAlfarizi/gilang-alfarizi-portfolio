export function AtmosphericOverlay() {
	return (
		<div className="pointer-events-none fixed inset-0 z-1" aria-hidden>
			{/* Vignette */}
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.45)_100%)]" />
			{/* Top scrim for navbar legibility */}
			<div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black/50 to-transparent" />
			{/* Bottom scrim for footer */}
			<div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black/55 to-transparent" />
		</div>
	);
}
