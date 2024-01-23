'use client'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { useWavesurfer } from '@wavesurfer/react'
import { Box, Container } from '@mui/material'

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
        height: 150,
        waveColor: gradient || 'rgba(0, 0, 0, 0.75)',
        progressColor: progressGradient || 'rgba(0, 0, 0, 0.75)',
        url: `/api?audio=${audio}`,
        barWidth: 2,
    })

    // Hover effect
    useEffect(() => {
        const handlePointerMove = (e: any) => {
            hoverRef.current!.style.width = `${e.offsetX}px`
        }
        trackRef.current!.addEventListener('pointermove', handlePointerMove)
        return () => {
            trackRef.current!.removeEventListener('pointermove', handlePointerMove)
        }
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
        }
    }, [wavesurfer])
    //

    return (
        <Container maxWidth="xl" sx={{ marginTop: '50px' }}>
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
            </Box>
            <button onClick={onPlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
        </Container>
    )
}
