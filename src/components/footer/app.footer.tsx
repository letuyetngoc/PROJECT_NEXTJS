'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { Box, Container } from '@mui/material';
import { useHasMounted } from '@/utils/customHook';

export default function AppFooter() {
    const hasMounted = useHasMounted();

    // prevent nextjs pre-render this component
    if(!hasMounted) return <></>
    //
    return (
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, background: '#f2f2f2' }}>
            <Container sx={{ display: 'flex', gap:10 }}>
                <AudioPlayer
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/hoidanit.mp3`}
                    onPlay={e => console.log("onPlay")}
                    style={{boxShadow:'none', background:'#f2f2f2'}}
                />
                <Box sx={{ minWidth: '10%', textAlign:'center', ml: 3, "p": { color: "#868686" } }}>
                    <Box component='p'>Ngoc Le</Box>
                    <Box component='p'>Who Iam I</Box>
                </Box>
            </Container>
        </AppBar>
    )
}
