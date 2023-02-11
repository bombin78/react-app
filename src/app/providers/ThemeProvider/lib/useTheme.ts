// Выяснить где в действительность должен находиться этот хук
// По логике так как он много где может использоваться, он должен
// находиться в папке shared
import { useContext } 			from "react";
import { 
	LOCAL_STORAGE_THEME_KEY,
	Theme,
	ThemeContext,
} 								from "./ThemeContext";


interface UseThemeResult {
	toggleTheme: () => void;
	theme: Theme;
};

export function useTheme(): UseThemeResult {
	const {theme, setTheme} = useContext(ThemeContext);

	const toggleTheme = () => {
		const newTheme = (theme === Theme.DARK) ? Theme.LIGHT : Theme.DARK;
		setTheme(newTheme);
		localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
	};

	return {
		theme,
		toggleTheme,
	};
}