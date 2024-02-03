import DetailTrackPage from '@/components/track/wave.track'
import { sendRequest } from '@/utils/api'
import React from 'react'

export default async function TrackPageDetail({ params }: { params: { slug: string } }) {

  const track = await sendRequest<IBackendRes<ITrackTop>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${params.slug}`,
    method: 'GET',
  })

  return (
    <DetailTrackPage track={track.data!} />
  )
}
