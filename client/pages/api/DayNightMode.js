import React, { createContext, useEffect, useState } from 'react'

export const DayNightContext = createContext();

export const DayNightMode = ({children}) => {
    const [mode, setMode] = useState(() => {
        if(typeof window !== 'undefined') {
            return localStorage.getItem('mode') || 'day';
        }
        return 'day';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-mode', mode);
    }, [mode]);
    
    const toggleMode = () => {
        const newMode = mode === 'day' ? 'night' : 'day';
        setMode(newMode);
        localStorage.setItem('mode', newMode);
    };

    return (
        <DayNightContext.Provider value={{mode, toggleMode}}>
            {children}
        </DayNightContext.Provider>
    );
};

export default DayNightMode