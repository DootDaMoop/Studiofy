import React, { useEffect,useRef,useState } from 'react'
import styles from "../styles/apt.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleDown, faAngleUp, faImages, faExclamation, faEllipsis, faDownload, faShare,faShareFromSquare} from '@fortawesome/free-solid-svg-icons'
import html2canvas from 'html2canvas';
import MenuButton from './api/menuButton';

function profile() {
    const [profile, setProfile] = useState(null);
    const [topTracks, setTopTracks] = useState([]);
    const [audioFeatures, setAudioFeatures] = useState([]);
    const [featureAverages, setFeatureAverages] = useState({});
    const [closestTracks, setClosestTracks] = useState({});
    const [selectedImages, setSelectedImages] = useState({});
    const aptRef = useRef(null);
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
            setSelectedImages(data.selected_images);
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

    if(!profile || !topTracks || !audioFeatures || !featureAverages || !closestTracks || !selectedImages) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <MenuButton />
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
                          
                        
                        {/*  BEDROOM / ACOUSTICNESS */}

                        <div className={styles.item}>

                            <div className={styles.itemsHeader}> 
                                <p className={styles.itemHeaderFont}>STUDIO - BEDROOM</p>
                            </div>
                
                            <div className={styles.itemsBody}>

                                <div className={styles.alignment}>
                                    <div class={styles.itemsContent}>

                                            <p className={styles.itemBodyTitle}> ACOUSTICNESS </p>

                                            <div className={styles.progresscontainer}>
                                                <div className={styles.progressbar} style={{ width: widthAcoustic}}>
                                                    <p className={styles.progressPer}> {parseFloat(widthAcoustic).toFixed(0)}% </p>
                                                </div>
                                            </div>

                                            <p className={styles.itemPercDescription}> Represents the average confidence measure of your music being acoustic!</p>
                                            
                                            <div className={styles.bar}></div>

                                            <p className={styles.songCloseFont}> SONG CLOSEST TO YOUR ACOUSTICNESS SCORE:</p>

                                            <p className={styles.closestByFont}>{closestTracks.acousticness?.track_name} By: {closestTracks.acousticness?.artist_names?.join(', ')}    </p>
                                            <img className={styles.trackImg} src={closestTracks.acousticness?.album_art}></img>
                                        
                                            <div className={styles.itemPlayButton}>
                                                <a href={closestTracks.acousticness?.track_link} target='_blank' className={styles.playButtonFont}>PLAY ON SPOTIFY</a>
                                            </div>

                                    </div>

                                        <div className={styles.imgSection}>
                                            {/* TEST */}
                                                {/* <div className={styles.hardCode}>
                                                    <i ><FontAwesomeIcon icon={faImage} /></i>
                                                </div> */}
                                            <div className={styles.itemFrame}>
                                                <img className={styles.pixelBedroom} src={selectedImages.acousticness} alt='apt_image'></img> 
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

                                        <p className={styles.itemPercDescription}>Represents the average occurance of vocals in your music!</p>
                                        
                                        <div className={styles.bar}></div>

                                        <p className={styles.songCloseFont}>SONG CLOSEST TO YOUR INSTRUMENTALNESS SCORE:</p>

                                        <p className={styles.closestByFont}>{closestTracks.instrumentalness?.track_name} By: {closestTracks.instrumentalness?.artist_names?.join(', ')}    </p>
                                        <img className={styles.trackImg} src={closestTracks.instrumentalness?.album_art}></img>
                                    
                                        <div className={styles.itemPlayButton}>
                                            <a href={closestTracks.instrumentalness?.track_link} target='_blank' className={styles.playButtonFont}>PLAY ON SPOTIFY</a>
                                        </div>

                                    </div>

                                        <div className={styles.imgSection}>
                                            <div className={styles.itemFrame}>
                                                    <img className={styles.pixelEntrance} src={selectedImages.instrumentalness} alt='apt_image'></img> 
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

                                            <p className={styles.itemBodyTitle}>LIVEINESS</p>

                                            <div className={styles.progresscontainer}>
                                                <div className={styles.progressbar} style={{ width: widthLiveness}}>
                                                    <p className={styles.progressPer}> {parseFloat(widthLiveness).toFixed(0)}% </p>
                                                </div>
                                            </div>

                                            <p className={styles.itemPercDescription}>Represents the likeliness that your music is being performed live!</p>
                                            
                                            <div className={styles.bar}></div>

                                            <p className={styles.songCloseFont}> CLOSEST TO YOUR LIVENESS SCORE:</p>
                                     
                                            <p className={styles.closestByFont}>{closestTracks.liveness?.track_name} By: {closestTracks.liveness?.artist_names?.join(', ')}    </p>
                                            <img className={styles.trackImg} src={closestTracks.liveness?.album_art}></img>
                                        
                                            <div className={styles.itemPlayButton}>
                                                <a href={closestTracks.liveness?.track_link} target='_blank' className={styles.playButtonFont}>PLAY ON SPOTIFY</a>
                                            </div>

                                    </div>

                                        <div className={styles.imgSection}>
                                            <div className={styles.itemFrame}>
                                                    <img className={styles.pixelKitchen} src={selectedImages.liveness} alt='apt_image'></img> 
                                            </div>
                                        </div>
                                </div>
                            </div>
                            
                        </div>

                        {/* LIVING ROOM / DANCIBILITY */}

                        <div className={styles.item}>

                            <div className={styles.itemsHeader}> 
                                <p className={styles.itemHeaderFont}>STUDIO - LIVING ROOM</p>
                            </div>

                            <div className={styles.itemsBody}>

                                <div className={styles.alignment}>
                                    <div class={styles.itemsContent}>

                                            <p className={styles.itemBodyTitle}>DANCEABILITY </p>

                                            <div className={styles.progresscontainer}>
                                                <div className={styles.progressbar} style={{ width: widthDance}}>
                                                    <p className={styles.progressPer}> {parseFloat(widthDance).toFixed(0)}% </p>
                                                </div>
                                            </div>

                                            <p className={styles.itemPercDescription}>Represents how suitable your music is for dancing!</p>
                                            
                                            <div className={styles.bar}></div>

                                            <p className={styles.songCloseFont}>SONG CLOSEST TO YOUR DANCEABILITY SCORE:</p>
                                           
                                            <p className={styles.closestByFont}>{closestTracks.danceability?.track_name} By: {closestTracks.danceability?.artist_names?.join(', ')}    </p>
                                            <img className={styles.trackImg} src={closestTracks.danceability?.album_art}></img>
                                        
                                            <div className={styles.itemPlayButton}>
                                                <a href={closestTracks.danceability?.track_link} target='_blank' className={styles.playButtonFont}>PLAY ON SPOTIFY</a>
                                            </div>

                                    </div>

                                        <div className={styles.imgSection}>
                                            <div className={styles.itemFrame}>
                                                    <img className={styles.pixelLiving} src={selectedImages.danceability} alt='apt_image'></img> 
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>

                        {/* OFFICE / SPEECHINESS */}

                        <div className={styles.item}>

                            <div className={styles.itemsHeader}> 
                                <p className={styles.itemHeaderFont}>STUDIO - OFFICE</p>
                            </div>
                
                            <div className={styles.itemsBody}>

                                <div className={styles.alignment}>
                                    <div class={styles.itemsContent}>

                                            <p className={styles.itemBodyTitle}>SPEECHINESS</p>

                                            <div className={styles.progresscontainer}>
                                                <div className={styles.progressbar} style={{ width: widthDance}}>
                                                    <p className={styles.progressPer}> {parseFloat(widthDance).toFixed(0)}% </p>
                                                </div>
                                            </div>

                                            <p className={styles.itemPercDescription}>Represents the average presence of spoken words in your music and audios!</p>
                                            
                                            <div className={styles.bar}></div>

                                            <p className={styles.songCloseFont}>SONG CLOSEST TO YOUR SPEECHINESS SCORE:</p>
                                     
                                            <p className={styles.closestByFont}>{closestTracks.speechiness?.track_name} By: {closestTracks.speechiness?.artist_names?.join(', ')}    </p>
                                            <img className={styles.trackImg} src={closestTracks.speechiness?.album_art}></img>
                                        
                                            <div className={styles.itemPlayButton}>
                                                <a href={closestTracks.speechiness?.track_link} target='_blank' className={styles.playButtonFont}>PLAY ON SPOTIFY</a>
                                            </div>

                                    </div>

                                        <div className={styles.imgSection}>
                                            <div className={styles.itemFrame}>
                                                    <img className={styles.pixelOffice} src={selectedImages.speechiness} alt='apt_image'></img> 
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
                                <i><FontAwesomeIcon icon={faImages} className={styles.iconsFormater}/></i>
                                <p className={styles.menuFont}> {profile.display_name} Studio - STUDIOIFY</p>
                                <i> <FontAwesomeIcon icon={faEllipsis} className={styles.iconsFormater}></FontAwesomeIcon></i>
                            </div>

                            <div className={styles.pixelBorder} ref={aptRef}>
                                <img className={styles.pixelFinal} src={selectedImages.valence} alt={`wallfloor`}></img>
                                <img className={styles.pixelFinal} src={selectedImages.danceability} alt={`livingroom`}></img>
                                <img className={styles.pixelFinal} src={selectedImages.acousticness} alt={`bedroom`}></img>
                                <img className={styles.pixelFinal} src={selectedImages.liveness} alt={`kitchen`}></img>
                                <img className={styles.pixelFinal} src={selectedImages.instrumentalness} alt={`entrance`}></img>
                                <img className={styles.pixelFinal} src={selectedImages.speechiness} alt={`office`}></img>
                                <img className={styles.pixelFinal} src={selectedImages.energy} style={{mixBlendMode: 'multiply'}} alt={`lighting`}></img>
                            </div>          
                        </div> 

                        <div className={styles.interactContainer}>
                                <button onClick={downloadApartmentHandler} style={{cursor: 'pointer'}} className={styles.downloadAPT}>
                                    <img style={{height: '75%'}} src='/images/Download.png'></img>
                                    {/* <img className={styles.shareImg}src='/images/Copy Link.png'></img> */}

                                    <p className={styles.shareFont}>SAVE YOUR STUDIO</p>
                                </button>

                                <button className={styles.shareLink}>
                                    {/* <img src='/images/Copy Link.png' className={styles.iconsFormater}></img> */}
                                    <i><FontAwesomeIcon icon={faShareFromSquare} className={styles.iconsFormater} /></i>
                                    {/* <img className={styles.shareImg}src='/images/Copy Link.png'></img> */}
                                    <p className={styles.shareFont}>SHARE OUR SITE!</p>
                                </button>
                        </div>
                            
                            <i className={styles.circleDownFooter}><FontAwesomeIcon icon={faAngleUp} style={{ fontSize: '2vw' }} /></i>
                    </div>

                    
                </main>
            </body>
        </>
    );
}

export default profile;