'use client'
import React, { useReducer, useState } from 'react'
import { Avatar, Box, CardMedia, Container, Grid, TextField, Typography } from '@mui/material'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import { sendRequest } from '@/utils/api'
import { useSession } from 'next-auth/react'
import WaveSurfer from 'wavesurfer.js'
import { useRouter } from "next/navigation";

interface ICommentTrack {
  comments: IComment[];
  track: ITrackTop;
  wavesurfer: WaveSurfer
}
dayjs.extend(relativeTime)

export default function CommentTrack(props: ICommentTrack) {
  const { comments, track, wavesurfer } = props
  const route = useRouter()

  const [newComment, setNewComment] = useState<string>('')
  const { data: session } = useSession()


  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secondsRemainder = Math.round(seconds) % 60
    const paddedSeconds = `0${secondsRemainder}`.slice(-2)
    return `${minutes}:${paddedSeconds}`
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      const res = await sendRequest<IBackendRes<INewComment>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/comments`,
        method: 'POST',
        headers: { 'Authorization': `Bearer ${session?.access_token}` },
        body: {
          moment: Math.floor(wavesurfer?.getCurrentTime()),
          track: track._id,
          content: newComment
        },
      })
      if (res.data) {
        route.refresh()
        setNewComment('')
      }
    }
  }

  const handleJumTrack = (moment:number) => {
    if(wavesurfer) {
      const duration = wavesurfer.getDuration()
      wavesurfer.seekTo(moment/duration)
    }
  }

  return (
    <Container sx={{ mt: 4 }}>
      <TextField label="Comments" variant="standard" fullWidth
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Grid container mt={3}>
        <Grid item xs={3}>
          <CardMedia
            component="img"
            sx={{ width: 150, height: 150, borderRadius: '50%' }}
            image="https://picsum.photos/id/1/200/300"
            alt="image track"
          />
          <Typography variant='body2'>letuyetngocksh@gmail.com</Typography>
        </Grid>
        <Grid item xs={9}>
          {
            comments.map((comment) => {
              return (
                <Box mb={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "flex-start" }}>
                  <Box sx={{ display: 'flex' }}>
                    <Avatar>{comment.user.name.slice(0, 2).toUpperCase()}</Avatar>
                    <Box ml={2}>
                      <Typography variant='caption'>{comment.user.name} at {' '}
                        <span style={{ cursor: 'pointer' }} onClick={()=>{handleJumTrack(comment.moment)}}>{formatTime(comment.moment)}</span>
                      </Typography>
                      <Typography variant='body2'>{comment.content}</Typography>
                    </Box>
                  </Box>
                  <Typography variant='caption'>{dayjs(comment.createdAt).fromNow()}</Typography>
                </Box>
        )
            })
          }
      </Grid>
    </Grid>
    </Container >
  )
}