import { useEffect, useState } from "react";

import {
	CERTIFICATES_DESKTOP_PAGE_SIZE,
	CERTIFICATES_MOBILE_PAGE_SIZE,
} from "@/types/certificate";

const DESKTOP_QUERY = "(min-width: 1024px)";

export function useCertificatePageSize(): number {
	const [pageSize, setPageSize] = useState(CERTIFICATES_DESKTOP_PAGE_SIZE);

	useEffect(() => {
		const media = window.matchMedia(DESKTOP_QUERY);

		const update = () => {
			setPageSize(
				media.matches
					? CERTIFICATES_DESKTOP_PAGE_SIZE
					: CERTIFICATES_MOBILE_PAGE_SIZE,
			);
		};

		update();
		media.addEventListener("change", update);
		return () => media.removeEventListener("change", update);
	}, []);

	return pageSize;
}
