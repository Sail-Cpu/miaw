import { createContext, useState } from 'react';
import PropTypes from "prop-types";

export const ThemeContext = createContext();

const ThemeContextProvider = ({children}) => {
    const [theme, setTheme] = useState('light');
    const colors = {
        light: {
            primary: '#2563EB',
            secondary: '#fff',
            text: '#1F2937',
            tabHover: '#e9eaec'
        },
        dark: {
            primary: '#2563EB',
            secondary: '#1b1c21',
            text: '#cccccc',
            tabHover: '#282a31'
        },
    };

    const toggleDarkTheme = () => {
        document.querySelector("body").setAttribute("data-theme", "dark");
        setTheme("dark");
    };

    return (
        <ThemeContext.Provider value={{ theme, colors, toggleDarkTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

ThemeContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ThemeContextProvider;