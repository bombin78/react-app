// Выяснить где в действительность должен находиться этот хук
// По логике так как он много где может использоваться, он должен
// находиться в папке shared
import { useContext, useEffect } 			from 'react';
import {
    LOCAL_STORAGE_THEME_KEY,
    Theme,
    ThemeContext,
} 								from './ThemeContext';

interface UseThemeResult {
	toggleTheme: () => void;
	theme: Theme;
}

export function useTheme(): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext);

    useEffect(() => {
        const initTheme = Theme.LIGHT;
        setTheme?.(initTheme);
        document.body.className = initTheme;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, initTheme);
    }, [setTheme]);

    const toggleTheme = () => {
        let newTheme: Theme;

        switch (theme) {
        case Theme.DARK:
            newTheme = Theme.LIGHT;
            break;
        case Theme.LIGHT:
            newTheme = Theme.MARINE;
            break;
        case Theme.MARINE:
            newTheme = Theme.DARK;
            break;
        default:
            newTheme = Theme.LIGHT;
        }

        setTheme?.(newTheme);
        document.body.className = newTheme;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return {
        theme: theme || Theme.LIGHT,
        toggleTheme,
    };
}
