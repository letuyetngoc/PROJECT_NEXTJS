'use client'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { useWavesurfer } from '@wavesurfer/react'

export default function DetailTrackPage() {
    const trackRef = useRef<HTMLDivElement>(null)
    const searchParams = useSearchParams()
    const audio = searchParams.get('audio')

    const gradient: CanvasGradient  = useMemo(() => {
        const ctx = document.createElement('canvas').getContext('2d')!
        const gradient =  ctx.createLinearGradient(0, 0, 0, 150)
        gradient.addColorStop(0, 'rgb(200, 0, 200)')
        gradient.addColorStop(0.7, 'rgb(100, 0, 100)')
        gradient.addColorStop(1, 'rgb(0, 0, 0)')
        return gradient
    }, [])

    const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
        container: trackRef,
        height: 150,
        waveColor: gradient,
        progressColor: '#ffa500',
        url: `/api?audio=${audio}`,
        barWidth: 2,
    })

    const onPlayPause = useCallback(() => {
        wavesurfer && wavesurfer.playPause()
    }, [wavesurfer])

    return (
        <>
            <div ref={trackRef}>DetailTrackPage</div>
            <button onClick={onPlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
        </>
    )
}
