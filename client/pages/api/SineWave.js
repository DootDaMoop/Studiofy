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

const SineWave = ({amplitude = 40, frequency = 1, width = "100%", height = "20vh"}) => {
    const pathRef1 = useRef(null);
    
    useEffect(() => {
        const wavePath = generateWavePath(amplitude, frequency, 1440, 1080);
        if(pathRef1.current) {
            pathRef1.current.setAttribute('d', wavePath + `L1440,1080L0,1080Z`);
        }
    }, [amplitude, frequency]);

    return(
        <div className={`${styles.waveContainer}`}>
            <svg className={`${styles.wave} ${styles.wave1}`} viewBox={`0 0 1440 1080`} preserveAspectRatio='none' style={{width, height}}>
                <path ref={pathRef1} fill='#000000' fillOpacity='1'></path>
            </svg>
        </div>
    )
}

export default SineWave