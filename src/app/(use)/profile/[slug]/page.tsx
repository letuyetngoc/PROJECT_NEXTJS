import React from 'react'
import { sendRequest } from '@/utils/api'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Container, Grid } from '@mui/material';

export default async function ProfilePage({ params }: { params: { slug: string } }) {
  const tracks = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/users?current=1&pageSize=10`,
    method: 'POST',
    body: { id: params.slug },
  })
  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} >
        {
          tracks.data?.result.map(track => (
            <Grid item xs={12} md={6} key={track._id}>
              <ProfileTrackItem imgUrl={track.imgUrl} />
            </Grid>
          ))
        }
      </Grid>
    </Container>
  )
}

const ProfileTrackItem = ({ imgUrl }: { imgUrl: string }) => {
  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Live From Space
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Mac Miller
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {true ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            {true ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151, height: 151 }}
        image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${imgUrl}`}
        alt="track image"
      />
    </Card>
  )
}

