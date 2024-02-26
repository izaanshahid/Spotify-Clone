import {PropsWithChildren, createContext, useState, useContext} from 'react';
import { Track } from '../types';

type playerContextType={
    track?: Track;
    setTrack: (track: Track)=> void;
}

const playerContext = createContext<playerContextType>({
    setTrack:()=>{},
});

export default function PlayerProvider({children}:PropsWithChildren){
    const [track, setTrack] = useState<Track>()
    console.log(track?.name)
       return(
        <playerContext.Provider value={{track, setTrack}}>
            {children}
        </playerContext.Provider>
    )
}

export const usePlayerContext = () => useContext(playerContext);