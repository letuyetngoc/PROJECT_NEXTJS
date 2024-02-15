import React from 'react'
import { sendRequest } from '@/utils/api'
import ProfileTrack from '@/components/track/profile.track';

export default async function ProfilePage({ params }: { params: { slug: string } }) {
  
  const temp = params.slug.split('.html')
  const temp1 = temp[0].split('-')
  const id = temp1[temp1.length - 1]

  const tracks = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/users?current=1&pageSize=10`,
    method: 'POST',
    body: { id: id },
  })

  return (
    <ProfileTrack tracks={tracks.data?.result ?? []} />
  )
}

