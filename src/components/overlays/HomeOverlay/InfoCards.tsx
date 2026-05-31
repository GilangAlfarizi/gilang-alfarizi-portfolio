import { Code2, Paintbrush } from "lucide-react";
import { motion } from "motion/react";

import { GlassPanel } from "@/components/ui/glass-panel";
import { easeOut, fadeRight, staggerContainer } from "@/lib/motion/presets";

const CARDS = [
	{
		icon: Code2,
		label: "Server Side",
		value: "APIs & Database",
	},
	{
		icon: Paintbrush,
		label: "Client Side",
		value: "ReactJs & NextJs",
	},
] as const;

export function InfoCards() {
	return (
		<motion.div
			className="pointer-events-auto hidden flex-col gap-3 lg:flex"
			initial="hidden"
			animate="visible"
			variants={staggerContainer}>
			{CARDS.map((card) => (
				<motion.div
					key={card.label}
					variants={fadeRight}
					whileHover={{ scale: 1.02, y: -2 }}
					transition={{ duration: 0.25, ease: easeOut }}>
					<GlassPanel className="flex w-52 items-center gap-3 rounded-xl px-4 py-3">
						<CardContent card={card} />
					</GlassPanel>
				</motion.div>
			))}
		</motion.div>
	);
}

function CardContent({ card }: { card: (typeof CARDS)[number] }) {
	const Icon = card.icon;

	return (
		<>
			<div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-emerald-400">
				<Icon className="size-4" strokeWidth={1.75} />
			</div>
			<div className="min-w-0">
				<p className="text-[10px] tracking-[0.12em] text-white/50 uppercase">
					{card.label}
				</p>
				<p className="truncate text-sm font-semibold text-white">
					{card.value}
				</p>
			</div>
		</>
	);
}
