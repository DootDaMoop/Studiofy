import React, { useContext } from 'react'
import { DayNightContext } from './DayNightMode';

function DayNightToggleButton() {
    const {mode, toggleMode} = useContext(DayNightContext);

    return (
        <button onClick={toggleMode}>
            Toggle {mode === 'day' ? 'Night' : 'Day'} Mode
        </button>
    );
};

export default DayNightToggleButton