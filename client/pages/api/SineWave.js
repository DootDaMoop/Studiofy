import React, { useEffect, useRef } from 'react'
import styles from "../../styles/sine_wave.module.css";

function generateWavePath(amplitude, frequency, width, height, points = 100) {
    let path = '';
    for(let i = 0; i <= points; i++) {
        const x = (i / points) * width;
        const y = amplitude * Math.sin((x/width) * 2 * Math.PI * frequency) + height / 2;
        path += `${i === 0 ? 'M' : 'L'}${x},${y}`;
    }
    return path;
}

const SineWave = ({amplitude = 40, frequency = 1, width = 1440, height = 320}) => {
    const pathRef1 = useRef(null);
    
    useEffect(() => {
        const wavePath = generateWavePath(amplitude, frequency, width, height);
        if(pathRef1.current) {
            pathRef1.current.setAttribute('d', wavePath + `L${width},${height}L0,${height}Z`);
        }
    }, [amplitude, frequency, width, height]);

    return(
        <div className={`${styles.button_container}`}>
            <svg className={`${styles.wave} ${styles.wave1}`} viewBox={`0 0 ${width} ${height}`}>
                <path ref={pathRef1} fill='#000000' fillOpacity='1'></path>
            </svg>
        </div>
    )
}

export default SineWave