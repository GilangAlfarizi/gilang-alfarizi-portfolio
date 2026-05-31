import { HeroSection } from "../HeroSection";
import { InfoCards } from "../InfoCards";

export function HeroBeat() {
	return (
		<div className="relative flex size-full min-h-0 justify-center px-4 pr-10 sm:px-6 sm:pr-12">
			<HeroSection />

			<div className="pointer-events-none absolute right-4 bottom-1/2 hidden max-w-xs translate-y-1/2 lg:block xl:right-8">
				<InfoCards />
			</div>
		</div>
	);
}
