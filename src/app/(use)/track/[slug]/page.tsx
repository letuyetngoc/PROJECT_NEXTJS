import DetailTrackPage from '@/components/track/wave.track'
import { sendRequest } from '@/utils/api'
import React from 'react'
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
  params: { slug: string }
}
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.slug

  // fetch data
  const track = await sendRequest<IBackendRes<ITrackTop>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${params.slug}`,
    method: 'GET',
    nextOption: { catche: 'no-store' }
  })

  return {
    title: track.data?.title,
    description: track.data?.description,
    openGraph: {
      title: track.data?.title,
      description: track.data?.description,
      type: 'website',
      images: [`https://raw.githubusercontent.com/hoidanit/images-hosting/master/eric.png`],
    },
  }
}

export default async function TrackPageDetail({ params }: { params: { slug: string } }) {
  const temp = params.slug.split('.html')
  const temp1 = temp[0].split('-')
  const id = temp1[temp1.length-1]

  const track = await sendRequest<IBackendRes<ITrackTop>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${id}`,
    method: 'GET',
    nextOption: { catche: 'no-store' }
  })

  const comments = await sendRequest<IBackendRes<IModelPaginate<IComment>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/comments`,
    method: 'POST',
    queryParams: {
      current: 1,
      pageSize: 100,
      trackId: id,
      sort: '-createdAt'
    }
  })

  if(!track.data){
    notFound()
  }

  return (
    <DetailTrackPage track={track.data!} comments={comments.data?.result!} />
  )
}
