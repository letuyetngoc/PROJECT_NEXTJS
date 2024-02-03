'use client'
import React, { useContext } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { TrackContext } from '@/lib/track.wrapper';
import PauseIcon from '@mui/icons-material/Pause';
import { useRouter } from 'next/navigation'

const ProfileTrackItem = (props: { track: ITrackTop }) => {
    const { track } = props
    const router = useRouter()
    const { trackInfo, setTrackInfo } = useContext(TrackContext);

    return (
        <Card sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography onClick={() => {
                        router.push(`/track/${track._id}?audio/${track.trackUrl}&id=${track._id}`)
                    }}
                        component="div" variant="h5" sx={{ cursor: 'pointer', '&:hover': { textDecoration: "underline" } }}>
                        {track.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {track.description}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <IconButton aria-label="previous">
                        {true ? <SkipNextIcon /> : <SkipPreviousIcon />}
                    </IconButton>
                    {
                        (track._id === trackInfo._id && trackInfo.isPlaying === true) ?
                            <IconButton aria-label={track._id} onClick={() => {
                                setTrackInfo({ ...track, isPlaying: false })
                            }}>
                                <PauseIcon sx={{ height: 38, width: 38 }} />
                            </IconButton>
                            :
                            <IconButton aria-label={track._id} onClick={() => {
                                setTrackInfo({ ...track, isPlaying: true })
                            }}>
                                <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                            </IconButton>
                    }
                    <IconButton aria-label="next">
                        {true ? <SkipPreviousIcon /> : <SkipNextIcon />}
                    </IconButton>
                </Box>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 151, height: 151 }}
                image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${track.imgUrl}`}
                alt="track image"
            />
        </Card>
    )
}
export default ProfileTrackItem