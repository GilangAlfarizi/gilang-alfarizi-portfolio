import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function GlassPanel({
	className,
	...props
}: ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"rounded-2xl border border-white/10 bg-black/25 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl",
				className,
			)}
			{...props}
		/>
	);
}
