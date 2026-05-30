import type { SimpleIcon } from "simple-icons";
import {
	siBootstrap,
	siCss,
	siDocker,
	siDrizzle,
	siEslint,
	siExpress,
	siFigma,
	siFramer,
	siGo,
	siGoogle,
	siGreensock,
	siHtml5,
	siJavascript,
	siJest,
	siLaravel,
	siLogstash,
	siMongodb,
	siMysql,
	siNestjs,
	siNextdotjs,
	siNodedotjs,
	siNginx,
	siPhp,
	siPostgresql,
	siPostman,
	siPrisma,
	siReact,
	siReactquery,
	siReactrouter,
	siRedis,
	siStripe,
	siSwagger,
	siTailwindcss,
	siTypescript,
	siVite,
} from "simple-icons";

import {
	normalizeIconSlug,
	SIMPLE_ICON_UNSUPPORTED,
} from "./simpleIconAliases";

/**
 * Curated Simple Icons used by the portfolio skills API.
 * Named imports keep the bundle small (no 5MB full icon pack).
 */
const SIMPLE_ICONS_BY_SLUG: Record<string, SimpleIcon> = {
	bootstrap: siBootstrap,
	css: siCss,
	docker: siDocker,
	drizzle: siDrizzle,
	eslint: siEslint,
	express: siExpress,
	figma: siFigma,
	framer: siFramer,
	go: siGo,
	google: siGoogle,
	greensock: siGreensock,
	html5: siHtml5,
	javascript: siJavascript,
	jest: siJest,
	laravel: siLaravel,
	logstash: siLogstash,
	mongodb: siMongodb,
	mysql: siMysql,
	nestjs: siNestjs,
	nextdotjs: siNextdotjs,
	nodedotjs: siNodedotjs,
	nginx: siNginx,
	php: siPhp,
	postgresql: siPostgresql,
	postman: siPostman,
	prisma: siPrisma,
	react: siReact,
	reactquery: siReactquery,
	reactrouter: siReactrouter,
	redis: siRedis,
	stripe: siStripe,
	swagger: siSwagger,
	tailwindcss: siTailwindcss,
	typescript: siTypescript,
	vite: siVite,
};

export function getSimpleIcon(slug: string): SimpleIcon | null {
	const normalized = normalizeIconSlug(slug);
	if (SIMPLE_ICON_UNSUPPORTED.has(normalized)) {
		return null;
	}
	return SIMPLE_ICONS_BY_SLUG[normalized] ?? null;
}
