import DetailTrackPage from '@/components/track/wave.track'
import React from 'react'

export default function TrackPageDetail({ params }: { params: { slug: string } }) {
    console.log('check====>',params.slug)
  return (
    <DetailTrackPage/>
  )
}
