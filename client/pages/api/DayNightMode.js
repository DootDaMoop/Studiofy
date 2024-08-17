import React, { createContext, useEffect, useState } from 'react'

export const DayNightContext = createContext();

export const DayNightMode = ({children}) => {
    const [mode, setMode] = useState(() => {
        if(typeof window !== 'undefined') {
            return localStorage.getItem('mode') || 'day';
        }
        return 'day';
    });

    const getCssVariableVal = (varName) => {
        if(typeof window !== undefined) {
            return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
        }
        return '';
    };

    const [stylesList, setStylesList] = useState({});

    const updateStylesList = () => {
        const backgroundColor = getCssVariableVal('--background-color');
        const borderColor = getCssVariableVal('--border-color');
        const textColor = getCssVariableVal('--text-color');
        const iconColor = getCssVariableVal('--text-color');
        const percentColor = getCssVariableVal('--color');
        const statsBoxImageSrc = mode === 'day' ? '/images/statsBox.png' : '/images/nightStatsBox.png';

        console.log('Updating styles:', { backgroundColor, borderColor, textColor, statsBoxImageSrc });

        setStylesList({backgroundColor,borderColor,textColor,iconColor,percentColor,statsBoxImageSrc});
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-mode', mode);
        updateStylesList();
    }, [mode]);
    
    const toggleMode = () => {
        const newMode = mode === 'day' ? 'night' : 'day';
        setMode(newMode);
        localStorage.setItem('mode', newMode);
        updateStylesList();
    };

    return (
        <DayNightContext.Provider value={{mode, toggleMode, stylesList, updateStylesList}}>
            {children}
        </DayNightContext.Provider>
    );
};

export default DayNightMode