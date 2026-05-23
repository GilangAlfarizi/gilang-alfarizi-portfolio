import {
	createContext,
	useCallback,
	useMemo,
	useState,
	type ReactNode,
} from "react";

import type { Section } from "@/types/navigation";

interface NavigationContextValue {
	activeSection: Section;
	setActiveSection: (section: Section) => void;
}

export const NavigationContext = createContext<NavigationContextValue | null>(
	null,
);

export function NavigationProvider({ children }: { children: ReactNode }) {
	const [activeSection, setActiveSectionState] = useState<Section>("home");

	const setActiveSection = useCallback((section: Section) => {
		setActiveSectionState(section);
	}, []);

	const value = useMemo(
		() => ({ activeSection, setActiveSection }),
		[activeSection, setActiveSection],
	);

	return (
		<NavigationContext.Provider value={value}>
			{children}
		</NavigationContext.Provider>
	);
}
