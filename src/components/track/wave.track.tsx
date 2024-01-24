'use client'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { useWavesurfer } from '@wavesurfer/react'
import { Box, Container, IconButton, Tooltip } from '@mui/material'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

export default function DetailTrackPage() {

    const trackRef = useRef<HTMLDivElement>(null)
    const durationRef = useRef<HTMLDivElement>(null)
    const hoverRef = useRef<HTMLDivElement>(null)
    const timeRef = useRef<HTMLDivElement>(null)

    const searchParams = useSearchParams()
    const audio = searchParams.get('audio')

    let gradient, progressGradient

    if (typeof window !== "undefined") {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')!

        // Define the waveform gradient
        gradient = useMemo(() => {
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1)
            gradient.addColorStop(0, '#656666') // Top color
            gradient.addColorStop((canvas.height * 0.7) / canvas.height, '#656666') // Top color
            gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
            gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
            gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#B1B1B1') // Bottom color
            gradient.addColorStop(1, '#B1B1B1') // Bottom color
            return gradient
        }, [])

        // Define the progress gradient
        progressGradient = useMemo(() => {
            const progressGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1)
            progressGradient.addColorStop(0, '#EE772F') // Top color
            progressGradient.addColorStop((canvas.height * 0.7) / canvas.height, '#EB4926') // Top color
            progressGradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
            progressGradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
            progressGradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#F6B094') // Bottom color
            progressGradient.addColorStop(1, '#F6B094') // Bottom color
            return progressGradient
        }, [])
    }


    const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
        container: trackRef,
        height: 70,
        waveColor: gradient || 'rgba(0, 0, 0, 0.75)',
        progressColor: progressGradient || 'rgba(0, 0, 0, 0.75)',
        url: `/api?audio=${audio}`,
        barWidth: 3,
    })

    // Hover effect
    useEffect(() => {
        const handlePointerMove = (e: any) => {
            hoverRef.current!.style.width = `${e.offsetX}px`
        }
        trackRef.current!.addEventListener('pointermove', handlePointerMove)
    }, [])

    const onPlayPause = useCallback(() => {
        wavesurfer && wavesurfer.playPause()
    }, [wavesurfer])

    // Current time & duration
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secondsRemainder = Math.round(seconds) % 60
        const paddedSeconds = `0${secondsRemainder}`.slice(-2)
        return `${minutes}:${paddedSeconds}`
    }

    useEffect(() => {
        if (wavesurfer) {
            wavesurfer!.on('decode', (duration) => (durationRef.current!.textContent = formatTime(duration)))
            wavesurfer!.on('timeupdate', (currentTime) => (timeRef.current!.textContent = formatTime(currentTime)))
            wavesurfer.once('interaction', () => wavesurfer.play())
        }
    }, [wavesurfer])
    //

    const arrComments = [
        {
            id: 1,
            avatar: "http://localhost:8000/images/chill1.png",
            moment: 10,
            user: "username 1",
            content: "just a comment1"
        },
        {
            id: 2,
            avatar: "http://localhost:8000/images/chill1.png",
            moment: 30,
            user: "username 2",
            content: "just a comment3"
        },
        {
            id: 3,
            avatar: "http://localhost:8000/images/chill1.png",
            moment: 50,
            user: "username 3",
            content: "just a comment3"
        },
    ]
    const calcLeft = (moment: number): number => {
        let duration: number = Number(durationRef.current?.textContent?.replace(':', '.'))
        const left = (moment * (100)) / (duration * 60)
        return left
    }
    return (
        <Container maxWidth="xl" sx={{ marginTop: '50px' }}>
            <Box sx={{ flexGrow: 1 }}>
                <Box sx={{
                    background: 'linear-gradient(135deg, rgb(106, 112, 67) 0%, rgb(11, 15, 20) 100%)',
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: '1' }}>
                        <Box sx={{ display: 'flex' }}>
                            <IconButton sx={{ color: '#f50', padding: 0, paddingRight: '10px', display: 'flex', alignItems: 'flex-start' }} onClick={onPlayPause}>
                                {isPlaying ? <PauseCircleIcon sx={{ fontSize: '40px' }} /> : <PlayCircleIcon sx={{ fontSize: '40px' }} />}
                            </IconButton >
                            <Box sx={{ color: '#fff' }}>
                                <Box px={1} sx={{ fontSize: '20px', background: "#333", marginBottom: '10px', width: 'fit-content' }}>Noi nay co anh</Box>
                                <Box px={1} sx={{ fontSize: '13px', background: "#333", width: 'fit-content' }}>Son Tung</Box>
                            </Box>
                        </Box>
                        <Box ref={trackRef} sx={{
                            position: 'relative',
                            cursor: 'pointer',
                            "&:hover": {
                                "& .trackHover": {
                                    opacity: "1",
                                }
                            },
                            ".time": {
                                position: 'absolute',
                                zIndex: 11,
                                top: '50%',
                                marginTop: '-1px',
                                transform: 'translateY(-50%)',
                                fontSize: '11px',
                                background: 'rgba(0, 0, 0, 0.75)',
                                padding: '2px',
                                color: '#ddd',
                            }
                        }}>
                            <Box ref={timeRef} className="time" sx={{ left: 0 }}>0:00</Box>
                            <Box ref={durationRef} className="time" sx={{ right: 0 }}>0:00</Box>
                            <Box ref={hoverRef} className="trackHover" sx={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                zIndex: 10,
                                pointerEvents: 'none',
                                height: '100%',
                                width: 0,
                                mixBlendMode: 'overlay',
                                background: 'rgba(255, 255, 255, 0.5)',
                                opacity: 0,
                                transition: 'opacity 0.2s ease',
                            }}></Box>
                            <Box className="overlay"
                                sx={{
                                    position: "absolute",
                                    height: "30px",
                                    width: "100%",
                                    bottom: "0",
                                    backdropFilter: "brightness(0.5)",
                                }}
                            >
                            </Box>

                            {
                                arrComments.map(comment => {
                                    return (
                                        <Tooltip title="Just a comment" arrow>
                                            <Box
                                                key={comment.id}
                                                sx={{
                                                    position: "absolute",
                                                    height: "30px",
                                                    bottom: "0",
                                                    zIndex: '10',
                                                    left: calcLeft(comment.moment) + '%'
                                                }}
                                                onPointerMove={() => {
                                                    hoverRef.current!.style.width = `${calcLeft(comment.moment)}%`
                                                }}
                                            >
                                                <img

                                                    src='https://picsum.photos/id/1/200/300'
                                                    width={30}
                                                    height={30}
                                                >

                                                </img>
                                            </Box>
                                        </Tooltip>
                                    )
                                })
                            }
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', padding: '20px' }}>
                        <Box sx={{ width: '200px', height: '200px', background: '#ccc' }}>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}
