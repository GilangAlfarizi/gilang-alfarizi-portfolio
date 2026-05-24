import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

import { useAllCertificates } from "@/hooks/useAllCertificates";
import { useCertificatePageSize } from "@/hooks/useCertificatePageSize";
import { useScrollCapture } from "@/hooks/useScrollCapture";
import { beatSlide } from "@/lib/motion/presets";
import { CERTIFICATES_GRID_COLS } from "@/types/certificate";

import { OverlaySectionHeader } from "../shared/OverlaySectionHeader";
import { PageIndexIndicator } from "../shared/PageIndexIndicator";
import { CertificateGridPage } from "./CertificateGridPage";
import {
	CertificatesEmptyState,
	CertificatesErrorState,
	CertificatesLoadingState,
} from "./CertificatesStates";
import type { Certificate } from "@/types/certificate";

function buildPageSlots(
	items: Certificate[],
	pageIndex: number,
	pageSize: number,
): (Certificate | null)[] {
	const pageItems = items.slice(
		pageIndex * pageSize,
		pageIndex * pageSize + pageSize,
	);

	return Array.from({ length: pageSize }, (_, index) => pageItems[index] ?? null);
}

export function CertificatesOverlay() {
	const pageSize = useCertificatePageSize();
	const [pageIndex, setPageIndex] = useState(0);

	const { certificates, total, loading, error, refetch } = useAllCertificates();

	const totalPages = Math.max(1, Math.ceil(certificates.length / pageSize));
	const columns =
		pageSize === CERTIFICATES_GRID_COLS * 2 ? CERTIFICATES_GRID_COLS : 1;
	const currentPage = pageIndex + 1;

	const pageSlots = useMemo(
		() => buildPageSlots(certificates, pageIndex, pageSize),
		[certificates, pageIndex, pageSize],
	);

	const { direction, containerRef, goToIndex } = useScrollCapture(totalPages, {
		enabled: !loading && !error && totalPages > 1,
		index: pageIndex,
		onIndexChange: setPageIndex,
	});

	useEffect(() => {
		setPageIndex(0);
	}, [pageSize]);

	useEffect(() => {
		if (pageIndex >= totalPages) {
			setPageIndex(Math.max(totalPages - 1, 0));
		}
	}, [pageIndex, totalPages]);

	const hasContent = !loading && !error && total > 0;
	const showEmpty = !loading && !error && total === 0;

	return (
		<div
			ref={containerRef}
			className="relative flex size-full touch-pan-y flex-col overflow-hidden"
		>
			{loading && <CertificatesLoadingState />}

			{!loading && error && (
				<CertificatesErrorState message={error} onRetry={refetch} />
			)}

			{showEmpty && <CertificatesEmptyState />}

			{hasContent && (
				<>
					<OverlaySectionHeader
						eyebrow="Verified Credentials"
						title="Proof of Craft"
					/>

					<div className="relative min-h-0 flex-1">
						<AnimatePresence mode="wait" custom={direction}>
							<motion.div
								key={`${currentPage}-${pageSize}`}
								custom={direction}
								variants={beatSlide}
								initial="enter"
								animate="center"
								exit="exit"
								className="absolute inset-0 flex items-center justify-center"
							>
								<CertificateGridPage
									items={pageSlots}
									page={currentPage}
									totalPages={totalPages}
									columns={columns}
								/>
							</motion.div>
						</AnimatePresence>
					</div>

					<PageIndexIndicator
						total={totalPages}
						activeIndex={pageIndex}
						onSelect={goToIndex}
					/>

					{totalPages > 1 && pageIndex < totalPages - 1 && (
						<p className="pointer-events-none pb-1 text-center text-[10px] tracking-[0.2em] text-white/35 uppercase">
							Scroll for next page
						</p>
					)}
				</>
			)}
		</div>
	);
}
