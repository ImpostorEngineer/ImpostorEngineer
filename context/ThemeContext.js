'use client';

import { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    document.body.dataset.theme = theme === 'light' ? 'dark' : 'light';
    document.body.style.colorScheme = theme === 'light' ? 'dark' : 'light';
    document.body.classList.toggle(theme);
    document.documentElement.style.colorScheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme === 'light' ? 'dark' : 'light';
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}> {children} </ThemeContext.Provider>;
}
export function useTheme() {
  return useContext(ThemeContext);
}
