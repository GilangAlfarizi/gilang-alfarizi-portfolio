import { useEffect, useState } from "react";

import {
	CERTIFICATES_DESKTOP_PAGE_SIZE,
	CERTIFICATES_MOBILE_PAGE_SIZE,
} from "@/types/certificate";

export function useCertificatePageSize(): number {
	const [pageSize, setPageSize] = useState(CERTIFICATES_DESKTOP_PAGE_SIZE);

	useEffect(() => {
		const update = () => {
			const width = window.innerWidth;
			if (width >= 639) {
				setPageSize(CERTIFICATES_DESKTOP_PAGE_SIZE);
			} else {
				setPageSize(CERTIFICATES_MOBILE_PAGE_SIZE);
			}
		};

		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, []);

	return pageSize;
}
