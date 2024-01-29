import MainContent from '@/components/main/main.slider';
import { sendRequest } from '@/utils/api';
import { Container } from '@mui/material';
import { getServerSession } from 'next-auth';
import * as React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function HomePage() {

  const session = await getServerSession(authOptions)

  const chill = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/top`,
    method: 'POST',
    body: { 'category': 'CHILL', 'limit': 10 },
  })

  const workouts = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/top`,
    method: 'POST',
    body: { 'category': 'WORKOUT', 'limit': 10 },
  })

  const party = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/top`,
    method: 'POST',
    body: { 'category': 'PARTY', 'limit': 10 },
  })

  return (
    <Container maxWidth="xl" sx={{marginBottom:'200px'}}>
      <MainContent data={chill?.data ?? []} title='CHILL' />
      <MainContent data={workouts?.data ?? []} title='WORKOUT' />
      <MainContent data={party?.data ?? []} title='PARTY' />
    </Container>
  );
}
