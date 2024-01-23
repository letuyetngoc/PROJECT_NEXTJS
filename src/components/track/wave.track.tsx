'use client'
import React, { useEffect, useRef } from 'react'
import WaveSurfer from 'wavesurfer.js'
import { useSearchParams } from 'next/navigation'

export default function DetailTrackPage() {
    const trackRef = useRef<HTMLDivElement>(null)
    const searchParams = useSearchParams()
    const audio = searchParams.get('audio')
    
    useEffect(() => {
        if (trackRef.current) {
            const wavesurfer = WaveSurfer.create({
                container: trackRef.current,
                waveColor: 'rgb(200, 0, 200)',
                progressColor: 'rgb(100, 0, 100)',
                // url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${audio}`,
                url: `/api?audio=${audio}`,
            })
        }
    }, [])
    return (
        <div ref={trackRef}>DetailTrackPage</div>
    )
}
