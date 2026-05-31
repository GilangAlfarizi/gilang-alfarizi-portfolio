import { cn } from "@/lib/utils";
import type { ProjectImage } from "@/types/project";

interface ProjectImageGalleryProps {
	images: ProjectImage[];
	selectedImageId: number | null;
	onSelect: (imageId: number) => void;
}

export function ProjectImageGallery({
	images,
	selectedImageId,
	onSelect,
}: ProjectImageGalleryProps) {
	if (images.length === 0) return null;

	return (
		<div
			className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] sm:gap-2.5 [&::-webkit-scrollbar]:hidden"
			role="listbox"
			aria-label="Project screenshots"
		>
			{images.map((image) => {
				const selected = image.id === selectedImageId;
				const label = image.description || image.slug;

				return (
					<button
						key={image.id}
						type="button"
						role="option"
						aria-selected={selected}
						aria-label={label}
						onClick={() => onSelect(image.id)}
						className={cn(
							"aspect-video w-28 shrink-0 snap-start overflow-hidden rounded-lg border bg-black/40 transition-colors sm:w-36 lg:w-40",
							selected
								? "border-emerald-400/70 ring-1 ring-emerald-400/50"
								: "border-white/15 hover:border-white/30",
						)}
					>
						<img
							src={image.image}
							alt=""
							className="size-full object-cover object-center"
							loading="lazy"
						/>
					</button>
				);
			})}
		</div>
	);
}
