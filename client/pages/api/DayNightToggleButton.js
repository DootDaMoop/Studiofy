import React, { useContext } from 'react'
import { DayNightContext } from './DayNightMode';

function DayNightToggleButton() {
    const {mode, toggleMode} = useContext(DayNightContext);

    return (
        <>
            {mode === 'day' ?
                <img src='/images/dayButton.png' onClick={toggleMode} alt='Day Night Mode Toggle Button'  style={{ width:'95px', height:'50px' ,display:'flex', position: 'absolute', top: '5%', left: '5%', zIndex: '1'}}></img>
                :
                <img src='/images/nightButton.png' onClick={toggleMode} alt='Day Night Mode Toggle Button'  style={{width:'95px', height:'50px' ,display:'flex', position: 'absolute', top: '5%', left: '5%', zIndex: '1'}}></img>
            }
        </>
        
    );
};

export default DayNightToggleButton