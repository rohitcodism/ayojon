import { eventSchema } from "@/schemas/event.schema";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { z } from "zod";

export interface EventFormContextProps {
    event: Partial<z.infer<typeof eventSchema>> | null,
    updatePropertyForm: ( property: Partial<typeof eventSchema>) => void
}

export const newEventFormContext = createContext<EventFormContextProps | null>({
    event: null,
    updatePropertyForm: () => null
})

interface FormContextProviderProps {
    children: ReactNode
}

export const EventFormContextProvider: React.FC<FormContextProviderProps> = ({children}) => {

    const [event, setEvent] = useState<Partial<z.infer<typeof eventSchema>> | null>(null)

    const updatePropertyForm = (value:  Partial<z.infer<typeof eventSchema>>) => {
        setEvent({...event,...value})
    }

    return(
        <newEventFormContext.Provider value={{ event, updatePropertyForm }}>
            {children}
        </newEventFormContext.Provider>
    );
}

export const useEventContext = ():EventFormContextProps => {
    const context = useContext(newEventFormContext);

    if(!context){
        throw new Error("Context must be within the provider.")
    }

    return context;
}