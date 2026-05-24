const DEFAULT_BASE_URL = "https://gilang-alfarizi-portfolio-be.vercel.app";

export function getApiBaseUrl(): string {
	const base = import.meta.env.VITE_API_BASE_URL ?? DEFAULT_BASE_URL;
	return base.replace(/\/$/, "");
}

export class ApiError extends Error {
	status: number;

	constructor(message: string, status: number) {
		super(message);
		this.name = "ApiError";
		this.status = status;
	}
}

export async function apiGet<T>(
	path: string,
	params?: Record<string, string | number | undefined>,
): Promise<T> {
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;
	const url = new URL(`${getApiBaseUrl()}${normalizedPath}`);

	if (params) {
		for (const [key, value] of Object.entries(params)) {
			if (value !== undefined) {
				url.searchParams.set(key, String(value));
			}
		}
	}

	const response = await fetch(url.toString(), {
		headers: { Accept: "application/json" },
	});

	if (!response.ok) {
		let message = `Request failed (${response.status})`;
		try {
			const body = (await response.json()) as { message?: string };
			if (body.message) message = body.message;
		} catch {
			// ignore parse errors
		}
		throw new ApiError(message, response.status);
	}

	return response.json() as Promise<T>;
}
