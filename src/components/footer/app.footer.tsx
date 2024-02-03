'use client'
import React, { useContext, useEffect, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { Box, Container, Typography } from '@mui/material';
import { useHasMounted } from '@/utils/customHook';
import { TrackContext } from '@/lib/track.wrapper';
import H5AudioPlayer from 'react-h5-audio-player';

export default function AppFooter() {
    const hasMounted = useHasMounted();
    const { trackInfo, setTrackInfo } = useContext(TrackContext);

    const audioRef = useRef<H5AudioPlayer>(null)
    useEffect(() => {
        if(!trackInfo.isPlaying){
            audioRef.current?.audio.current!.pause()
        } else {
            audioRef.current?.audio.current!.play()
        }
    },[trackInfo.isPlaying])

    // prevent nextjs pre-render this component
    if (!hasMounted) return <></>
    //

    return (
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, background: '#f2f2f2' }}>
            <Container sx={{ display: 'flex', gap: 10, '.rhap_main rhap_horizontal-reverse': { gap: '20px' } }}>
                <AudioPlayer
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${trackInfo.trackUrl}`}
                    onPlay={() => setTrackInfo({ ...trackInfo, isPlaying: true })}
                    onPause={() => setTrackInfo({ ...trackInfo, isPlaying: false })}
                    style={{ boxShadow: 'none', background: '#f2f2f2' }}
                    layout={'horizontal-reverse'}
                    ref={audioRef}
                />
                <Box sx={{ minWidth: '10%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant='body2' sx={{ fontSize: '12px', color: '#868686' }}>{trackInfo.title}</Typography>
                    <Typography variant='body2' sx={{cursor:'pointer', fontSize: '16px', color: '#000' }}>{trackInfo.description}</Typography>
                </Box>
            </Container>
        </AppBar >
    )
}
