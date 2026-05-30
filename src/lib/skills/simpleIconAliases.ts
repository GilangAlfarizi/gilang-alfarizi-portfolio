/**
 * Maps API / legacy slugs to Simple Icons canonical slugs.
 * @see https://simpleicons.org
 */
export const SIMPLE_ICON_ALIASES: Record<string, string> = {
	css3: "css",
	framermotion: "framer",
	code: "eslint",
	server: "nginx",
	creditcard: "stripe",
};

/** Slugs with no Simple Icons brand — use Lucide in SkillIcon instead. */
export const SIMPLE_ICON_UNSUPPORTED = new Set<string>([
	"amazonwebservices",
	"monitor",
]);

export function normalizeIconSlug(slug: string): string {
	const trimmed = slug.trim().toLowerCase();
	return SIMPLE_ICON_ALIASES[trimmed] ?? trimmed;
}
