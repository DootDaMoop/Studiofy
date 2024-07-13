import React, { useEffect, useRef, useState } from 'react'
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

const SineWave = ({amplitude = 40, frequency = 1}) => {
    const pathRef1 = useRef(null);
    const [dimensions, setDimensions] = useState({width: 0, height: 0});

    useEffect(() => {
        if(typeof window !== "undefined") {
            const handleResize = () => {
                setDimensions({width: window.innerWidth, height: window.innerHeight / 5});
            };

            window.addEventListener('resize', handleResize);
            handleResize();

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);
    
    useEffect(() => {
        const {width, height} = dimensions;
        if(width > 0 && height > 0) {
            const wavePath = generateWavePath(amplitude, frequency, width, height);
            if(pathRef1.current) {
                pathRef1.current.setAttribute('d', wavePath + `L${width},${height}L0,${height}Z`);
            }
        }
        
    }, [amplitude, frequency, dimensions]);

    if(dimensions.width === 0 || dimensions.height === 0) {
        return null;
    }

    return(
        <div className={`${styles.waveContainer}`}>
            <svg className={`${styles.wave} ${styles.wave1}`} viewBox={`0 0 ${dimensions.width} ${dimensions.height}`} preserveAspectRatio='none'>
                <path ref={pathRef1} fill='#000000' fillOpacity='1'></path>
            </svg>
        </div>
    )
}

export default SineWave