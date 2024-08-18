import React, { useContext } from 'react'
import { DayNightContext } from './DayNightMode';

function DayNightToggleButton() {
    const {mode, toggleMode} = useContext(DayNightContext);

    return (
        <>
            {mode === 'day' ?
                <img src='/images/dayButton.png' onClick={toggleMode} alt='Day Night Mode Toggle Button'></img>
                :
                <img src='/images/nightButton.png' onClick={toggleMode} alt='Day Night Mode Toggle Button'></img>
            }
        </>
        
    );
};

export default DayNightToggleButton