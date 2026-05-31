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

export function CertificateGridPage({ items, page }: CertificateGridPageProps) {
	return (
		<motion.div
			className="mx-auto w-full max-w-70 px-2 sm:max-w-md sm:px-4 lg:max-w-3xl"
			variants={staggerContainer}
			initial="hidden"
			animate="visible">
			<div className="grid grid-cols-1  sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
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
