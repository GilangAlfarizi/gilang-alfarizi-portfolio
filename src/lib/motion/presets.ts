import type { Transition, Variants } from "motion/react";

/** Cinematic ease-out — smooth deceleration */
export const easeOut = [0.22, 1, 0.36, 1] as const;

export const transitionBase: Transition = {
	duration: 0.55,
	ease: easeOut,
};

export const transitionFast: Transition = {
	duration: 0.3,
	ease: easeOut,
};

export const transitionSlow: Transition = {
	duration: 0.75,
	ease: easeOut,
};

export const staggerContainer: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.15,
		},
	},
};

export const fadeUp: Variants = {
	hidden: { opacity: 0, y: 24 },
	visible: {
		opacity: 1,
		y: 0,
		transition: transitionBase,
	},
};

export const fadeDown: Variants = {
	hidden: { opacity: 0, y: -16 },
	visible: {
		opacity: 1,
		y: 0,
		transition: transitionBase,
	},
};

export const fadeIn: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: transitionBase,
	},
};

export const fadeRight: Variants = {
	hidden: { opacity: 0, x: 32 },
	visible: {
		opacity: 1,
		x: 0,
		transition: transitionBase,
	},
};

export const scaleIn: Variants = {
	hidden: { opacity: 0, scale: 0.96 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: transitionBase,
	},
};

export const beatSlide: Variants = {
	enter: (direction: number) => ({
		opacity: 0,
		y: direction > 0 ? 48 : -48,
	}),
	center: {
		opacity: 1,
		y: 0,
		transition: transitionBase,
	},
	exit: (direction: number) => ({
		opacity: 0,
		y: direction > 0 ? -40 : 40,
		transition: { duration: 0.4, ease: easeOut },
	}),
};
