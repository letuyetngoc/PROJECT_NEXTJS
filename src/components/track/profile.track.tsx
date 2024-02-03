'use client'
import React from 'react'
import { Container, Grid } from '@mui/material';
import ProfileTrackItem from '@/components/track/profileItem.track';

export default function ProfileTrack({ tracks }: { tracks: ITrackTop[] }) {

    return (
        <Container maxWidth="lg">
            <Grid container spacing={4} >
                {
                    tracks.map(track => (
                        <Grid item xs={12} md={6} key={track._id}>
                            <ProfileTrackItem track={track}/>
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    )
}
