import { motion } from "motion/react";

import { staggerContainer } from "@/lib/motion/presets";
import type { Certificate } from "@/types/certificate";

import { CertificateCard } from "./CertificateCard";
import { CertificateEmptySlot } from "./CertificateEmptySlot";

interface CertificateGridPageProps {
	items: (Certificate | null)[];
	page: number;
	totalPages: number;
	columns: number;
}

export function CertificateGridPage({
	items,
	page,
	totalPages,
	columns,
}: CertificateGridPageProps) {
	return (
		<motion.div
			className="mx-auto w-full max-w-3xl px-3 sm:px-4"
			variants={staggerContainer}
			initial="hidden"
			animate="visible"
		>
			<p className="mb-2 text-center text-[9px] tracking-[0.18em] text-white/40 uppercase">
				Page {page} / {totalPages}
			</p>

			<div
				className="grid gap-2.5 sm:gap-3"
				style={{
					gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
				}}
			>
				{items.map((certificate, index) =>
					certificate ? (
						<CertificateCard
							key={certificate.id}
							certificate={certificate}
							index={index}
						/>
					) : (
						<CertificateEmptySlot key={`empty-${page}-${index}`} />
					),
				)}
			</div>
		</motion.div>
	);
}
