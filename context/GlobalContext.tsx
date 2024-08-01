"use client"
import React, { createContext, useContext, useState, ReactNode } from "react";

interface GlobalContextType{
    selectedEventCategory: string | null,
    setSelectedEventCategory: (category: string | null) => void
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined)


interface GlobalContextProviderProps {
    children: ReactNode
}

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({children}) => {

    const [selectedEventCategory, setSelectedEventCategory] =  useState<string | null>(null)

    return(
        <GlobalContext.Provider value={{ selectedEventCategory, setSelectedEventCategory }}>
            {children}
        </GlobalContext.Provider>
    );
}

export const useGlobalContext = ():GlobalContextType => {
    const context = useContext(GlobalContext);

    if(context == undefined){
        throw new Error("useGlobalContext must be used within a GlobalProvider")
    }

    return context;
}