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
    const widthDance = `${parseFloat(featureAverages.danceability) * 100}%`;
    const widthAcoustic = `${parseFloat(featureAverages.acousticness) * 100}%`;
    const widthEnergy = `${parseFloat(featureAverages.energy) * 100}%`;
    const widthInstrument = `${parseFloat(featureAverages.instrumentalness) * 100}%`;
    const widthLiveness = `${parseFloat(featureAverages.liveness) * 100}%`;
    const widthSpeech = `${parseFloat(featureAverages.speechiness) * 100}%`;
    const widthValence = `${parseFloat(featureAverages.valence) * 100}%`;



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
                    <div className={styles.profileimg} style={{ backgroundImage: `url(${profile.images[0]?.url})` }}></div>
                    <p className={styles.menuFont} >Menu</p>  
                    <i><FontAwesomeIcon icon={faAngleDown} /></i>
                </button>
                
                {toggle && 
                        <ul className={styles.buttonDropDown}>
                            <li>
                                <a className={styles.menuFont}  href='/privacy'>
                                    <p>Privacy </p>     
                                </a>
                            </li>

                            <li >
                                <a className={styles.menuFont}  href='/about'>
                                    <p>About</p>
                                </a>
                            </li>

                            {/* TODO: Backend Logout! This wont actually log the user out, just go back to the login page. */}
                            <li >
                                <a className={styles.menuFont}  href='http://localhost:3000/'>
                                    <p>Logout</p>
                                </a>  
                            </li>
                        </ul> }
            </header>

            <body className={styles.main}>
                <section>    
                        <div className={styles.titleContainer}>
                            <p className={styles.titleText}>WELCOME TO STUDIOFY</p>

                            <div className={styles.pixelFooter}>
                                <p className={styles.pixelFooterFont}> LET'S GO ON A ROOM TOUR...</p>
                                <i className={styles.circleDown}><FontAwesomeIcon icon={faAngleDown} /></i>
                            </div>
                    </div> 
                </section>
            </body>

                <main>
                    <section className={styles.itemsContainer}>
                        
                            {/* <div className={styles.items}>
                                <a href='#categ1ref' ref={categ1ref}></a>
                                <p>Danceability: {parseFloat(featureAverages.danceability).toFixed(2)}</p>
                                <a href={closestTracks.danceability?.track_link} target='_blank'>Closest Track: {closestTracks.danceability?.track_name}</a>
                                <p>Artist: {closestTracks.danceability?.artist_names?.join(', ')}</p>
                                <img className={styles.img} src={closestTracks.danceability?.album_art}></img>
                            </div>
                        
                            <div className={styles.items}>
                                <a href='#categ2ref' ref={categ2ref}></a>
                                <p>Acousticness: {parseFloat(featureAverages.acousticness).toFixed(2)}</p>
                                <a href={closestTracks.acousticness?.track_link} target='_blank'>Closest Track: {closestTracks.acousticness?.track_name}</a>
                                <p>Artist: {closestTracks.acousticness?.artist_names?.join(', ')}</p>
                                <img className={styles.img} src={closestTracks.acousticness?.album_art}></img>
                            </div>

                            <div className={styles.items}>
                                <a href='#categ3ref' ref={categ3ref}></a>
                                <p>Energy: {parseFloat(featureAverages.energy).toFixed(2)}</p>
                                <a href={closestTracks.energy?.track_link} target='_blank'>Closest Track: {closestTracks.energy?.track_name}</a>
                                <p>Artist: {closestTracks.energy?.artist_names?.join(', ')}</p>
                                <img className={styles.img} src={closestTracks.energy?.album_art}></img>
                            </div>
                        </div>

                        <div>
                            <div className={styles.items}>
                                <a href='#categ4ref' ref={categ4ref}></a>
                                <p>Instrumentalness: {parseFloat(featureAverages.instrumentalness).toFixed(2)}</p> 
                                <a href={closestTracks.instrumentalness?.track_link} target='_blank'>Closest Track: {closestTracks.instrumentalness?.track_name}</a>
                                <p>Artist: {closestTracks.instrumentalness?.artist_names?.join(', ')}</p>
                                <img className={styles.img} src={closestTracks.instrumentalness?.album_art}></img>
                            </div>

                            <div className={styles.items}>
                                <a href='#categ5ref' ref={categ5ref}></a>
                                <p>Liveness:  {parseFloat(featureAverages.liveness).toFixed(2)}</p>  
                                <a href={closestTracks.liveness?.track_link} target='_blank'>Closest Track: {closestTracks.liveness?.track_name}</a>
                                <p>Artist: {closestTracks.liveness?.artist_names?.join(', ')}</p>
                                <img className={styles.img} src={closestTracks.liveness?.album_art}></img>
                            </div>

                            <div className={styles.items}>
                                <a href='#categ6ref' ref={categ6ref}></a>
                                <p>Speechiness: {parseFloat(featureAverages.speechiness).toFixed(2)}</p>
                                <a href={closestTracks.speechiness?.track_link} target='_blank'>Closest Track: {closestTracks.speechiness?.track_name}</a>
                                <p>Artist: {closestTracks.speechiness?.artist_names?.join(', ')}</p>
                                <img className={styles.img} src={closestTracks.speechiness?.album_art}></img>
                            </div> */}

                            {/* MAKE PROGRESSBAR and PERHAPS CARD INTO COMPONENTS FOR REUSEABILITY && DO WE HAVE TO INCLUDE ARTIST NAME?? */}
                            
                            <section>
                                <div className={styles.itemsHeader}> 
                                    <p className={styles.menuFont}>STUDIO - ENTRANCE</p>
                                </div>
                    
                                <div className={styles.itemsBody}>
                                    <div className={styles.itemBodyLeft}>
                                        <p className={styles.fontTest}> VALANCE </p>
                                        <div className={styles.progresscontainer}>
                                            <div className={styles.progressbar} style={{ width: widthValence}}>
                                            <p className={styles.progressPer}> {parseFloat(widthValence).toFixed(0)}% </p>
                                            </div>
                                        </div>
                                        <p className={styles.fontTest}> This Percentage descrbes the musical positiveness conveyed by your Top 50 Most Played Songs!</p>
                                        
                                        <div className={styles.bar}></div>

                                        <p className={styles.fontTest}> THE SONG CLOSEST TO YOUR AVERAGE VOCAL LEVEL IS: </p>
                                        <a href={closestTracks.valence?.track_link} target='_blank'>Closest Track: {closestTracks.valence?.track_name}</a>
                                        


                                        <a href='#categ7ref' ref={categ7ref}></a>
                                        <p>Valence: {parseFloat(featureAverages.valence).toFixed(2)}</p>
                                        
                                        <p>Artist: {closestTracks.valence?.artist_names?.join(', ')}</p>
                                        <img className={styles.trackImg} src={closestTracks.valence?.album_art}></img>
                                    
                                        <div className={styles.itemPlayButton}>
                                            <p>PLAY ON SPOTIFY</p>
                                        </div>
                                    </div>

                                    <div className={styles.itemBodyRight}>
                                        <img className={styles.pixelBedroom} src='/images/bedroom-0.65-1.00.png' alt='apt_image'></img> 
                                    </div> 
                                </div>
                            </section>

                            <section>
                                <div className={styles.itemsHeader}> 
                                    <p className={styles.menuFont}>STUDIO - ENTRANCE</p>
                                </div>
                    
                                <div className={styles.itemsBody}>
                                    <div className={styles.itemBodyLeft}>
                                        <p> VALANCE </p>
                                        <div className={styles.progresscontainer}>
                                            <div className={styles.progressbar} style={{ width: widthValence}}>
                                            <p className={styles.progressPer}> {parseFloat(widthValence).toFixed(0)}% </p>
                                            </div>
                                        </div>
                                        <p> This Percentage descrbes the musical positiveness conveyed by your Top 50 Most Played Songs!</p>
                                        
                                        <div className={styles.bar}></div>

                                        <p> THE SONG CLOSEST TO YOUR AVERAGE VOCAL LEVEL IS: 
                                            <a href={closestTracks.valence?.track_link} target='_blank'>Closest Track: {closestTracks.valence?.track_name}</a>
                                        </p>


                                        <a href='#categ7ref' ref={categ7ref}></a>
                                        <p>Valence: {parseFloat(featureAverages.valence).toFixed(2)}</p>
                                        
                                        <p>Artist: {closestTracks.valence?.artist_names?.join(', ')}</p>
                                        <img className={styles.trackImg} src={closestTracks.valence?.album_art}></img>
                                    
                                        <div className={styles.itemPlayButton}>
                                            <p>PLAY ON SPOTIFY</p>
                                        </div>
                                    </div>

                                    <div className={styles.itemBodyRight}>
                                        <img className={styles.pixelBedroom} src='/images/bedroom-0.65-1.00.png' alt='apt_image'></img> 
                                    </div> 
                                </div>
                            </section>

                       
                            <section>
                                <div className={styles.itemsHeader}> 
                                    <p className={styles.menuFont}>STUDIO - ENTRANCE</p>
                                </div>
                    
                                <div className={styles.itemsBody}>
                                    <div className={styles.itemBodyLeft}>
                                        <p> VALANCE </p>
                                        <div className={styles.progresscontainer}>
                                            <div className={styles.progressbar} style={{ width: widthValence}}>
                                            <p className={styles.progressPer}> {parseFloat(widthValence).toFixed(0)}% </p>
                                            </div>
                                        </div>
                                        <p> This Percentage descrbes the musical positiveness conveyed by your Top 50 Most Played Songs!</p>
                                        
                                        <div className={styles.bar}></div>

                                        <p> THE SONG CLOSEST TO YOUR AVERAGE VOCAL LEVEL IS: 
                                            <a href={closestTracks.valence?.track_link} target='_blank'>Closest Track: {closestTracks.valence?.track_name}</a>
                                        </p>


                                        <a href='#categ7ref' ref={categ7ref}></a>
                                        <p>Valence: {parseFloat(featureAverages.valence).toFixed(2)}</p>
                                        
                                        <p>Artist: {closestTracks.valence?.artist_names?.join(', ')}</p>
                                        <img className={styles.trackImg} src={closestTracks.valence?.album_art}></img>
                                    
                                        <div className={styles.itemPlayButton}>
                                            <p>PLAY ON SPOTIFY</p>
                                        </div>
                                    </div>

                                    <div className={styles.itemBodyRight}>
                                        <img className={styles.pixelItem} src='/images/apt01_office.png' alt='apt_image'></img> 
                                    </div> 
                                </div>
                            </section>
                    </section>

                    <section>   
                        <div className={styles.pixelContainer}>
                            <div className={styles.pixelFooter}>
                                <p className={styles.pixelFooterFont}>THE FINAL RESULT</p>
                                <i className={styles.circleDown}><FontAwesomeIcon icon={faAngleDown} /></i>
                            </div>
                            
                            <div className={styles.pixelWindow}>
                                <p className={styles.menuFont}> {profile.display_name} Studio - STUDIOIFY</p>
                            </div>

                            <div className={styles.pixelBorder} ref={aptRef}>
                                <img className={styles.pixelRoom} src='/images/TestRoomExport.png' alt='apt_image'></img>
                            </div>          
                        </div> 
                    </section>

                    <div className={styles.interactContainer}>
                        <button onClick={downloadApartmentHandler} className={styles.downloadAPT}>Download Your Apartment!</button>
                        <button className={styles.shareLink}>Share our Site</button>
                    </div>

                </main>


                <div className={styles.fixedButtonContainer}>
                    <button onClick={handleScrollToNextColumn}>Next Col</button>
                    <button onClick={handleScrollToPrevColumn}>Prev Col</button>
                </div>
        </>
    );
}

export default profile;