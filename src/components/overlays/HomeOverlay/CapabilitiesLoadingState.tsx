import { GlassPanel } from "@/components/ui/glass-panel";

export function CapabilitiesLoadingState() {
	return (
		<div className="flex size-full items-center justify-center px-4 pr-10 sm:px-6 sm:pr-12">
			<div className="grid w-full max-w-6xl gap-6 md:grid-cols-[1.35fr_0.65fr]">
				<div className="space-y-4">
					<div className="mx-auto h-16 max-w-md animate-pulse rounded-xl bg-white/10 md:mx-0" />
					{Array.from({ length: 3 }, (_, index) => (
						<div key={index} className="space-y-2">
							<div className="h-3 w-20 animate-pulse rounded bg-white/10" />
							<GlassPanel className="h-16 animate-pulse rounded-xl bg-white/5" />
						</div>
					))}
				</div>
				<GlassPanel className="min-h-56 animate-pulse rounded-xl bg-white/5" />
			</div>
		</div>
	);
}
