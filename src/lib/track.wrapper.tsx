"use client"
import React, { createContext, useContext, useState } from "react";

export const TrackContext = createContext<ITrackContext>({
    trackInfo: {
        '_id': '',
        'title': '',
        'description': '',
        'category': '',
        'imgUrl': '',
        'trackUrl': '',
        'countLike': 0,
        'countPlay': 0,
        'isPlaying': false,
        'uploader': {
            "_id": '',
            "email": '',
            "name": '',
            "role": '',
            "type": ''
        },
        'isDeleted': false,
        'createdAt': '',
        'updatedAt': '',
    },
    setTrackInfo: (val: IShareTrack) => {}
})

export default function TrackContextProvider({ children }: { children: React.ReactNode }) {
    const initVal = {
        '_id': '',
        'title': '',
        'description': '',
        'category': '',
        'imgUrl': '',
        'trackUrl': '',
        'countLike': 0,
        'countPlay': 0,
        'isPlaying': false,
        'uploader': {
            "_id": '',
            "email": '',
            "name": '',
            "role": '',
            "type": ''
        },
        'isDeleted': false,
        'createdAt': '',
        'updatedAt': ''
    }
    const [trackInfo, setTrackInfo] = useState<IShareTrack>(initVal)
    return (
        <TrackContext.Provider value={{ trackInfo, setTrackInfo }}>
            {children}
        </TrackContext.Provider>
    )
}
export const useTrackContext = (): ITrackContext => useContext(TrackContext)