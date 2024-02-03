import React from 'react'
import { sendRequest } from '@/utils/api'
import ProfileTrack from '@/components/track/profile.track';

export default async function ProfilePage({ params }: { params: { slug: string } }) {
  const tracks = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/users?current=1&pageSize=10`,
    method: 'POST',
    body: { id: params.slug },
  })

  return (
    <ProfileTrack tracks={tracks.data?.result ?? []} />
  )
}

