'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { Box, Container, Typography } from '@mui/material';
import { useHasMounted } from '@/utils/customHook';

export default function AppFooter() {
    const hasMounted = useHasMounted();

    // prevent nextjs pre-render this component
    if (!hasMounted) return <></>
    //
    return (
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, background: '#f2f2f2' }}>
            <Container sx={{ display: 'flex', gap: 10, '.rhap_main rhap_horizontal-reverse': { gap: '20px' } }}>
                <AudioPlayer
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/hoidanit.mp3`}
                    onPlay={e => console.log("onPlay")}
                    style={{ boxShadow: 'none', background: '#f2f2f2' }}
                    layout={'horizontal-reverse'}
                />
                <Box sx={{ minWidth: '10%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant='body2' sx={{ fontSize: '12px', color: '#868686' }}>Ngoc Le</Typography>
                    <Typography variant='body2' sx={{ fontSize: '16px', color: '#000' }}>Who Iam I</Typography>
                </Box>
            </Container>
        </AppBar >
    )
}
