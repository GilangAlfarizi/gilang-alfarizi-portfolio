import { motion } from "motion/react";

import { GlassPanel } from "@/components/ui/glass-panel";
import { fadeUp } from "@/lib/motion/presets";
import type { Certificate } from "@/types/certificate";

interface CertificateCardProps {
	certificate: Certificate;
	index: number;
}

function formatDate(value: string): string {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return value;
	return date.toLocaleDateString("en-US", {
		month: "short",
		year: "numeric",
	});
}

export function CertificateCard({ certificate, index }: CertificateCardProps) {
	return (
		<motion.article
			variants={fadeUp}
			whileHover={{ y: -3, scale: 1.01 }}
			transition={{ duration: 0.25 }}
			className="group h-full"
		>
			<GlassPanel className="flex h-full min-h-[140px] flex-col overflow-hidden rounded-xl border-white/10 p-0 sm:min-h-[160px]">
				<div className="relative aspect-[4/3] overflow-hidden bg-black/40">
					{certificate.image ? (
						<img
							src={certificate.image}
							alt={certificate.title}
							className="size-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
							loading={index < 3 ? "eager" : "lazy"}
						/>
					) : (
						<div className="flex size-full items-center justify-center text-xs text-white/40">
							No image
						</div>
					)}
					<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
				</div>

				<div className="flex flex-1 flex-col gap-0.5 p-2.5 sm:p-3">
					<h3 className="line-clamp-2 text-[11px] leading-snug font-semibold text-white sm:text-xs">
						{certificate.title}
					</h3>
					<p className="line-clamp-1 text-[10px] text-white/55">
						{certificate.issuer}
					</p>
					<p className="mt-auto text-[9px] tracking-wide text-emerald-400/85 uppercase">
						{formatDate(certificate.issuedAt)}
					</p>
				</div>
			</GlassPanel>
		</motion.article>
	);
}
