import DetailTrackPage from '@/components/track/wave.track'
import { sendRequest } from '@/utils/api'
import React from 'react'

export default async function TrackPageDetail({ params }: { params: { slug: string } }) {

  const track = await sendRequest<IBackendRes<ITrackTop>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${params.slug}`,
    method: 'GET',
  })

  const comments = await sendRequest<IBackendRes<IModelPaginate<IComment>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/comments`,
    method: 'POST',
    queryParams: {
      current: 1,
      pageSize: 100,
      trackId: params.slug,
      sort:'-createdAt'
    }
  })

  return (
    <DetailTrackPage track={track.data!} comments={comments.data?.result!} />
  )
}
