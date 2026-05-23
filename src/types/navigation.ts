export type Section = "home" | "projects" | "about" | "certificates";

export const NAV_ITEMS: {
	id: Section;
	label: string;
	shortLabel?: string;
}[] = [
	{ id: "home", label: "Home" },
	{ id: "projects", label: "Projects", shortLabel: "Work" },
	{ id: "certificates", label: "Certificates", shortLabel: "Certs" },
	{ id: "about", label: "About" },
];
