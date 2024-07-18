"use client"

import { createContext, useContext, useState, ReactNode } from "react"


type ThemeContext = {
    isLightMode: boolean,
    toggleTheme: () => void
};

const ThemeContext = createContext<ThemeContext | undefined>(undefined)

export const ThemeProvider = ({children}: {children: ReactNode}) => {
    const [isLightMode, setIsLightMode] = useState(false);

    const toggleTheme = () => {
        setIsLightMode((prev) => !prev)
    }

    return(
        <ThemeContext.Provider value={{ isLightMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if(context === undefined){
        throw new Error("use theme must be inside a theme provider");
    }

    return context;
}

