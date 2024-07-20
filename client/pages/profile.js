import React, { useEffect,useRef,useState } from 'react'
import styles from "../styles/apt.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleDown, faCircle} from '@fortawesome/free-solid-svg-icons'
import html2canvas from 'html2canvas';


function profile() {
    const [profile, setProfile] = useState(null);
    const [topTracks, setTopTracks] = useState([]);
    const [audioFeatures, setAudioFeatures] = useState([]);
    const [featureAverages, setFeatureAverages] = useState({});
    const [closestTracks, setClosestTracks] = useState({});
    const [toggle, setToggle] = useState(false);
    const aptRef = useRef(null);
    const categ1ref = useRef(null);
    const categ2ref = useRef(null);
    const categ3ref = useRef(null);
    const categ4ref = useRef(null);
    const categ5ref = useRef(null);
    const categ6ref = useRef(null);
    const categ7ref = useRef(null);
    const columnRefs = [categ1ref, categ2ref, categ3ref, categ4ref, categ5ref, categ6ref, categ7ref];
    const [currentColumn, setCurrentColumn] = useState(6);

    useEffect(() => {
        fetch('http://localhost:8080/profile', {
            credentials: 'include'
        })
        .then((response) => {
            if(!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            return response.json();
        })
        .then((data) => {
            setProfile(data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/top-tracks', {
            credentials: 'include'
        })
        .then((response) => {
            if(!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            return response.json();
        })
        .then((data) => {
            setTopTracks(data.top_tracks.items);
            setAudioFeatures(data.audio_features.audio_features);
            setFeatureAverages(data.feature_averages);
            setClosestTracks(data.closest_tracks);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    const downloadApartmentHandler = () => {
        if(aptRef.current) {
            html2canvas(aptRef.current).then((canvas) => {
                const link = window.document.createElement('a');
                link.backgroundColor = null;
                link.download = `${profile.display_name}_studiofy_apartment`;
                link.href = canvas.toDataURL();
                link.click();
            });
        }
    }
    

    const handleScrollToNextColumn = () => {
        const nextColumn = (currentColumn + 1) % columnRefs.length;
        if(columnRefs[nextColumn].current) {
            columnRefs[nextColumn].current.scrollIntoView({behavior: 'smooth'});
        }
        setCurrentColumn(nextColumn);
        console.log(currentColumn);
    };

    const handleScrollToPrevColumn = () => {
        const prevColumn = (currentColumn - 1 + columnRefs.length) % columnRefs.length;
            if(columnRefs[prevColumn].current) {
                columnRefs[prevColumn].current.scrollIntoView({behavior: 'smooth'});
            }
            setCurrentColumn(prevColumn);
            console.log(currentColumn);
    };

    // useEffect(() => {
    //     const handleWheel = (e) => {
    //         if(e.deltaY > 0) {
    //             handleScrollToNextColumn();
    //         } else {
    //             handleScrollToPrevColumn();
    //         }
    //         console.log(e.deltaY);
    //     };
    //     window.addEventListener('wheel', handleWheel);
    //     return () => {
    //         window.removeEventListener('wheel', handleWheel);
    //     };
    // }, [currentColumn]);

    if(!profile || !topTracks || !audioFeatures || !featureAverages || !closestTracks) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <header>
                <button onClick={() => setToggle(!toggle)} className={styles.button}>
                    <div className={styles.profileimg} style={{ backgroundImage: `url(${profile.images[0].url})` }}></div>
                    <p className={styles.font} >Menu</p>  
                    <i><FontAwesomeIcon icon={faAngleDown} /></i>
                </button>
                
                {toggle && 
                        <ul className={styles.dropdown}>
                            <li>
                                <a className={styles.font}  href='/privacy'>
                                    <p>Privacy </p>     
                                </a>
                            </li>

                            <li >
                                <a className={styles.font}  href='/about'>
                                    <p>About</p>
                                </a>
                            </li>

                            {/* TODO: Backend Logout! This wont actually log the user out, just go back to the login page. */}
                            <li >
                                <a className={styles.font}  href='http://localhost:3000/'>
                                    <p>Logout</p>
                                </a>  
                            </li>
                        </ul> }
            </header>

            <body className={styles.sections}>
                <section>   
                    <div className={styles.parent}>
                        <div className={styles.pixelborder} ref={aptRef}>
                            {/* <img className={styles.pixel} src='/images/apt01_base.png' alt='apt_image'></img>
                            <img className={styles.pixel} src='/images/apt01_windows.png' alt='apt_image'></img>
                            <img className={styles.pixel} src='/images/apt01_kitchen.png' alt='apt_image'></img>
                            <img className={styles.pixel} src='/images/apt01_entrance.png' alt='apt_image'></img>
                            <img className={styles.pixel} src='/images/apt01_office.png' alt='apt_image'></img>
                            <img className={styles.pixel} src='/images/apt01_livingroom.png' alt='apt_image'></img>
                            <img className={styles.pixel} src='/images/apt01_bedroom.png' alt='apt_image'></img> */}
                            <img className={styles.pixel} src='/images/TestRoomExport.png' alt='apt_image'></img>
                        </div>
                        <div className={styles.pixelfooter}>
                            <p className={styles.font1}>Lets See Your Breakdown...</p>
                        </div>
                    </div> 
                </section>

                <main className={styles.fadein}>
                    <header className={styles.header1}>
                        <div className={styles.description}> Your Bedroom Stats... </div>
                        <div className={styles.bars}></div>
                        <div className={styles.description1}> Retrieved from Spotifys API, measuring happiness, energy, danceability, tempo, and mood.</div>
                    </header>
                    
                    <section className={styles.container}>
                        
                        <div className={styles.col1}>
                            <div className={styles.item1}>
                                <a href='#categ1ref' ref={categ1ref}></a>
                                <p>Danceability: {parseFloat(featureAverages.danceability).toFixed(2)}</p>
                                <a href={closestTracks.danceability?.track_link} target='_blank'>Closest Track: {closestTracks.danceability?.track_name}</a>
                                <p>Artist: {closestTracks.danceability?.artist_names?.join(', ')}</p>
                                <img src={closestTracks.danceability?.album_art}></img>
                            </div>
                        
                            <div className={styles.item1}>
                                <a href='#categ2ref' ref={categ2ref}></a>
                                <p>Acousticness: {parseFloat(featureAverages.acousticness).toFixed(2)}</p>
                                <a href={closestTracks.acousticness?.track_link} target='_blank'>Closest Track: {closestTracks.acousticness?.track_name}</a>
                                <p>Artist: {closestTracks.acousticness?.artist_names?.join(', ')}</p>
                                <img src={closestTracks.acousticness?.album_art}></img>
                            </div>

                            <div className={styles.item1}>
                                <a href='#categ3ref' ref={categ3ref}></a>
                                <p>Energy: {parseFloat(featureAverages.energy).toFixed(2)}</p>
                                <a href={closestTracks.energy?.track_link} target='_blank'>Closest Track: {closestTracks.energy?.track_name}</a>
                                <p>Artist: {closestTracks.energy?.artist_names?.join(', ')}</p>
                                <img src={closestTracks.energy?.album_art}></img>
                            </div>
                        </div>

                        <div className={styles.col2}>
                            <div className={styles.item1}>
                                <a href='#categ4ref' ref={categ4ref}></a>
                                <p>Instrumentalness: {parseFloat(featureAverages.instrumentalness).toFixed(2)}</p> 
                                <a href={closestTracks.instrumentalness?.track_link} target='_blank'>Closest Track: {closestTracks.instrumentalness?.track_name}</a>
                                <p>Artist: {closestTracks.instrumentalness?.artist_names?.join(', ')}</p>
                                <img src={closestTracks.instrumentalness?.album_art}></img>
                            </div>

                            <div className={styles.item1}>
                                <a href='#categ5ref' ref={categ5ref}></a>
                                <p>Liveness:  {parseFloat(featureAverages.liveness).toFixed(2)}</p>  
                                <a href={closestTracks.liveness?.track_link} target='_blank'>Closest Track: {closestTracks.liveness?.track_name}</a>
                                <p>Artist: {closestTracks.liveness?.artist_names?.join(', ')}</p>
                                <img src={closestTracks.liveness?.album_art}></img>
                            </div>

                            <div className={styles.item1}>
                                <a href='#categ6ref' ref={categ6ref}></a>
                                <p>Speechiness: {parseFloat(featureAverages.speechiness).toFixed(2)}</p>
                                <a href={closestTracks.speechiness?.track_link} target='_blank'>Closest Track: {closestTracks.speechiness?.track_name}</a>
                                <p>Artist: {closestTracks.speechiness?.artist_names?.join(', ')}</p>
                                <img src={closestTracks.speechiness?.album_art}></img>
                            </div>

                            <div className={styles.item1}>
                                <a href='#categ7ref' ref={categ7ref}></a>
                                <p>Valence: {parseFloat(featureAverages.valence).toFixed(2)}</p>
                                <a href={closestTracks.valence?.track_link} target='_blank'>Closest Track: {closestTracks.valence?.track_name}</a>
                                <p>Artist: {closestTracks.valence?.artist_names?.join(', ')}</p>
                                <img src={closestTracks.valence?.album_art}></img>
                            </div>
                        </div>
                    </section>
                </main>

                <button onClick={downloadApartmentHandler} className=''>Download Your Apartment!</button>

                <div className={styles.fixedButtonContainer}>
                    <button onClick={handleScrollToNextColumn}>Next Col</button>
                    <button onClick={handleScrollToPrevColumn}>Prev Col</button>
                </div>
            </body>
        </>
    );
}

export default profile;