import React, { useEffect,useRef,useState } from 'react'
import styles from "../styles/apt.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleDown, faAngleUp, faCircle, faExclamation} from '@fortawesome/free-solid-svg-icons'
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

                            <div className={styles.titleDescription}>
                                <p className={styles.pixelFooterFont}> LET'S GO ON A ROOM TOUR...</p>
                                <i className={styles.circleDown} style={{ fontSize: '2vw' }}><FontAwesomeIcon icon={faAngleDown} /></i>
                            </div>
                    </div> 
                </section>
            

                <main>
                    <section className={styles.itemsContainer}>
                        {/* 
                            TODO: ADD ADJUSTMENTS FOR EACH FURNITURE PIECE
                            TODO: ADD WIDTH CONTAINER FOR LEFT SIDE OF ITEMS
                            TODO: ADD IMG for FURNITURE FRAME
                            TODO: ADD IMG BESIDE SAVE STUDIO / SHARE SITE
                            TO-FIX: ALIGNMENT FOR ENTRANCE/OFFICE ARE NOT WORKING
                          
                        
                        {/*  BEDROOM / VALANCE */}

                        <div className={styles.item}>

                            <div className={styles.itemsHeader}> 
                                <p className={styles.itemHeaderFont}>STUDIO - BEDROOM</p>
                            </div>
                
                            <div className={styles.itemsBody}>

                                <div className={styles.alignment}>
                                    <div class={styles.itemsContent}>

                                            <p className={styles.itemBodyTitle}> VALANCE </p>

                                            <div className={styles.progresscontainer}>
                                                <div className={styles.progressbar} style={{ width: widthValence}}>
                                                    <p className={styles.progressPer}> {parseFloat(widthValence).toFixed(0)}% </p>
                                                </div>
                                            </div>

                                            <p className={styles.itemPercDescription}> This Percentage Detects the occurence of Vocals in your 50 most Played Songs!</p>
                                            
                                            <div className={styles.bar}></div>

                                            <p className={styles.songCloseFont}> THE SONG CLOSEST TO YOUR AVERAGE VOCAL LEVEL IS:
                                                {/* Closest Track: {closestTracks.valence?.track_name}    */}
                                            </p>

                                            <a href='#categ7ref' ref={categ7ref}></a>                                            
                                            <p className={styles.closestByFont}>{closestTracks.valence?.track_name} By: {closestTracks.valence?.artist_names?.join(', ')}    </p>
                                            <img className={styles.trackImg} src={closestTracks.valence?.album_art}></img>
                                        
                                            <div className={styles.itemPlayButton}>
                                                <a href={closestTracks.valence?.track_link} target='_blank' className={styles.playButtonFont}>PLAY ON SPOTIFY</a>
                                            </div>

                                    </div>

                                        <div className={styles.imgSection}>
                                            <div className={styles.itemFrame}>
                                                    <img className={styles.pixelBedroom} src='/images/bedroom-0.65-1.00.png' alt='apt_image'></img> 
                                            </div>
                                        </div>
                                </div>
                            </div>
                            
                        </div>

                        {/* ENTRANCE / INSTRUMENTALNESS */}

                        <div className={styles.item}>

                            <div className={styles.itemsHeader}> 
                                <p className={styles.itemHeaderFont}>STUDIO - ENTRANCE</p>
                            </div>

                                <div className={styles.itemsBody}>

                                    <div className={styles.alignment}>
                                        <div class={styles.itemsContent}>

                                        <p className={styles.itemBodyTitle}> INSTRUMENTALNESS </p>

                                        <div className={styles.progresscontainer}>
                                            <div className={styles.progressbar} style={{ width: widthInstrument}}>
                                                <p className={styles.progressPer}> {parseFloat(widthInstrument).toFixed(0)}% </p>
                                            </div>
                                        </div>

                                        <p className={styles.itemPercDescription}> This Percentage Detects the occurence of Vocals in your 50 most Played Songs!</p>
                                        
                                        <div className={styles.bar}></div>

                                        <p className={styles.songCloseFont}> THE SONG CLOSEST TO YOUR AVERAGE VOCAL LEVEL IS:
                                            {/* Closest Track: {closestTracks.valence?.track_name}    */}
                                        </p>

                                        <a href='#categ7ref' ref={categ7ref}></a>                                            
                                        <p className={styles.closestByFont}>{closestTracks.instrumentalness?.track_name} By: {closestTracks.instrumentalness?.artist_names?.join(', ')}    </p>
                                        <img className={styles.trackImg} src={closestTracks.instrumentalness?.album_art}></img>
                                    
                                        <div className={styles.itemPlayButton}>
                                            <a href={closestTracks.instrumentalness?.track_link} target='_blank' className={styles.playButtonFont}>PLAY ON SPOTIFY</a>
                                        </div>

                                    </div>

                                        <div className={styles.imgSection}>
                                            <div className={styles.itemFrame}>
                                                    <img className={styles.pixelEntrance} src='/images/entrance-0.65-1.00.png' alt='apt_image'></img> 
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>

                        {/* KITCHEN / LIVEINESS*/}

                        <div className={styles.item}>

                            <div className={styles.itemsHeader}> 
                                <p className={styles.itemHeaderFont}>STUDIO - KITCHEN</p>
                            </div>
                
                            <div className={styles.itemsBody}>

                                <div className={styles.alignment}>
                                    <div class={styles.itemsContent}>

                                            <p className={styles.itemBodyTitle}> LIVEINESS </p>

                                            <div className={styles.progresscontainer}>
                                                <div className={styles.progressbar} style={{ width: widthLiveness}}>
                                                    <p className={styles.progressPer}> {parseFloat(widthLiveness).toFixed(0)}% </p>
                                                </div>
                                            </div>

                                            <p className={styles.itemPercDescription}> This Percentage Detects the occurence of Vocals in your 50 most Played Songs!</p>
                                            
                                            <div className={styles.bar}></div>

                                            <p className={styles.songCloseFont}> THE SONG CLOSEST TO YOUR AVERAGE VOCAL LEVEL IS:
                                                {/* Closest Track: {closestTracks.valence?.track_name}    */}
                                            </p>

                                            <a href='#categ7ref' ref={categ7ref}></a>                                            
                                            <p className={styles.closestByFont}>{closestTracks.liveness?.track_name} By: {closestTracks.liveness?.artist_names?.join(', ')}    </p>
                                            <img className={styles.trackImg} src={closestTracks.liveness?.album_art}></img>
                                        
                                            <div className={styles.itemPlayButton}>
                                                <a href={closestTracks.liveness?.track_link} target='_blank' className={styles.playButtonFont}>PLAY ON SPOTIFY</a>
                                            </div>

                                    </div>

                                        <div className={styles.imgSection}>
                                            <div className={styles.itemFrame}>
                                                    <img className={styles.pixelKitchen} src='/images/kitchen-0.35-0.49.png' alt='apt_image'></img> 
                                            </div>
                                        </div>
                                </div>
                            </div>
                            
                        </div>

                        {/* LIVING ROOM / ENERGY */}

                        <div className={styles.item}>

                            <div className={styles.itemsHeader}> 
                                <p className={styles.itemHeaderFont}>STUDIO - LIVING ROOM</p>
                            </div>

                            <div className={styles.itemsBody}>

                                <div className={styles.alignment}>
                                    <div class={styles.itemsContent}>

                                            <p className={styles.itemBodyTitle}> VALANCE </p>

                                            <div className={styles.progresscontainer}>
                                                <div className={styles.progressbar} style={{ width: widthEnergy}}>
                                                    <p className={styles.progressPer}> {parseFloat(widthEnergy).toFixed(0)}% </p>
                                                </div>
                                            </div>

                                            <p className={styles.itemPercDescription}> This Percentage Detects the occurence of Vocals in your 50 most Played Songs!</p>
                                            
                                            <div className={styles.bar}></div>

                                            <p className={styles.songCloseFont}> THE SONG CLOSEST TO YOUR AVERAGE VOCAL LEVEL IS:
                                                {/* Closest Track: {closestTracks.valence?.track_name}    */}
                                            </p>

                                            <a href='#categ7ref' ref={categ7ref}></a>                                            
                                            <p className={styles.closestByFont}>{closestTracks.energy?.track_name} By: {closestTracks.energy?.artist_names?.join(', ')}    </p>
                                            <img className={styles.trackImg} src={closestTracks.energy?.album_art}></img>
                                        
                                            <div className={styles.itemPlayButton}>
                                                <a href={closestTracks.energy?.track_link} target='_blank' className={styles.playButtonFont}>PLAY ON SPOTIFY</a>
                                            </div>

                                    </div>

                                        <div className={styles.imgSection}>
                                            <div className={styles.itemFrame}>
                                                    <img className={styles.pixelLiving} src='/images/living-0.35-0.49.png' alt='apt_image'></img> 
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>

                        {/* OFFICE / DANCEBILITY */}

                        <div className={styles.item}>

                            <div className={styles.itemsHeader}> 
                                <p className={styles.itemHeaderFont}>STUDIO - OFFICE</p>
                            </div>
                
                            <div className={styles.itemsBody}>

                                <div className={styles.alignment}>
                                    <div class={styles.itemsContent}>

                                            <p className={styles.itemBodyTitle}> VALANCE </p>

                                            <div className={styles.progresscontainer}>
                                                <div className={styles.progressbar} style={{ width: widthDance}}>
                                                    <p className={styles.progressPer}> {parseFloat(widthDance).toFixed(0)}% </p>
                                                </div>
                                            </div>

                                            <p className={styles.itemPercDescription}> This Percentage Detects the occurence of Vocals in your 50 most Played Songs!</p>
                                            
                                            <div className={styles.bar}></div>

                                            <p className={styles.songCloseFont}> THE SONG CLOSEST TO YOUR AVERAGE VOCAL LEVEL IS:
                                                {/* Closest Track: {closestTracks.valence?.track_name}    */}
                                            </p>

                                            <a href='#categ7ref' ref={categ7ref}></a>                                            
                                            <p className={styles.closestByFont}>{closestTracks.danceability?.track_name} By: {closestTracks.danceability?.artist_names?.join(', ')}    </p>
                                            <img className={styles.trackImg} src={closestTracks.danceability?.album_art}></img>
                                        
                                            <div className={styles.itemPlayButton}>
                                                <a href={closestTracks.danceability?.track_link} target='_blank' className={styles.playButtonFont}>PLAY ON SPOTIFY</a>
                                            </div>

                                    </div>

                                        <div className={styles.imgSection}>
                                            <div className={styles.itemFrame}>
                                                    <img className={styles.pixelOffice} src='/images/office-0.35-1.00.png' alt='apt_image'></img> 
                                            </div>
                                        </div>
                                </div>
                            </div>
                            
                        </div>

                    </section>

                    <div className={styles.resultContainer}>
                        <div className={styles.FooterDescription}>
                                <p className={styles.pixelFooterFont}>THE FINAL RESULT</p>
                                <i className={styles.circleDown}><FontAwesomeIcon icon={faExclamation} style={{ fontSize: '2.5vw' }}/></i>
                        </div>
                        
                        <div className={styles.pixelContainer}>
                            <div className={styles.pixelWindow}>
                                <p className={styles.menuFont}> {profile.display_name} Studio - STUDIOIFY</p>
                            </div>

                            <div className={styles.pixelBorder} ref={aptRef}>
                                <img className={styles.pixelRoom} src='/images/TestRoomExport.png' alt='apt_image'></img>
                            </div>          
                        </div> 

                        <div className={styles.interactContainer}>
                                <button onClick={downloadApartmentHandler} className={styles.downloadAPT}>
                                    <p className={styles.shareFont}>SAVE YOUR STUDIO</p>
                                </button>

                                <button className={styles.shareLink}>
                                    <p className={styles.shareFont}>SHARE OUR SITE!</p>
                                </button>
                        </div>
                            
                            <i className={styles.circleDownFooter}><FontAwesomeIcon icon={faAngleUp} style={{ fontSize: '2vw' }} /></i>
                    </div>

                    
                </main>
            </body>


            {/* <footer> 
                <div className={styles.fixedButtonContainer}>
                    <button onClick={handleScrollToNextColumn}>Next Col</button>
                    <button onClick={handleScrollToPrevColumn}>Prev Col</button>
                </div>
            </footer> */}
                
        </>
    );
}

export default profile;