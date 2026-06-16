import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 }
    });

    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    };

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    };

    
    const playWithId = async (id) => {
        setTrack(songsData[id]);
    };

    const previous = () => {
        const currentIndex = songsData.findIndex(s => s.name === track.name);
        if (currentIndex > 0) {
            setTrack(songsData[currentIndex - 1]);
        }
    };

    const next = () => {
        const currentIndex = songsData.findIndex(s => s.name === track.name);
        if (currentIndex < songsData.length - 1) {
            setTrack(songsData[currentIndex + 1]); 
        }
    };

    
    useEffect(() => {
        if (audioRef.current && playStatus) {
            audioRef.current.play();
        }
    }, [track]);

    
    useEffect(() => {
        const audioEl = audioRef.current;
        if (!audioEl) return;

        const updateTime = () => {
            const current = audioEl.currentTime || 0;
            const duration = audioEl.duration || 0;

           
            if (duration > 0) {
                seekBar.current.style.width = Math.floor((current / duration) * 100) + "%";
            }

            setTime({
                currentTime: {
                    second: Math.floor(current % 60),
                    minute: Math.floor(current / 60)
                },
                totalTime: {
                    second: duration ? Math.floor(duration % 60) : 0,
                    minute: duration ? Math.floor(duration / 60) : 0
                }
            });
        };

        
        audioEl.addEventListener("timeupdate", updateTime);

       
        return () => audioEl.removeEventListener("timeupdate", updateTime);
    }, [audioRef]);

    const seekSong = (e)=>{
        if(audioRef.current && audioRef.current.duration){
            const clickX = e.nativeEvent.offsetX;
            const totalWidth = seekBg.current.offsetWidth;
            const newTime = (clickX/totalWidth) * audioRef.current.duration;
            audioRef.current.currentTime = newTime;
        }
    }

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track, setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        play, pause,
        playWithId,
        previous, next,
        seekSong
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;