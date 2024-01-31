'use client'
import React, { useEffect, useState } from 'react'
import { Box, Button, CardMedia, FormControl, Grid, InputLabel, LinearProgress, LinearProgressProps, MenuItem, Select, SelectChangeEvent, TextField, Typography, styled } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useToast } from '@/utils/toast';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}
interface IProps {
    uploadTrack: { fileName: string, percent: number }
    setValue: (value: number) => void
}
interface ITrackInfo {
    title: string
    description: string
    trackUrl: string
    imgUrl: string
    category: string
}

export default function Step2(props: IProps) {
    const toast = useToast()

    const { uploadTrack, setValue } = props
    const { data: session } = useSession()

    const [imgName, setImgName] = useState<string>('')
    const [trackInfo, setTrackInfo] = useState<ITrackInfo>({
        title: '',
        description: '',
        trackUrl: '',
        imgUrl: '',
        category: ''
    })

    useEffect(() => {
        setTrackInfo((preState: ITrackInfo) => ({
            ...preState,
            'imgUrl': imgName,
            'trackUrl': uploadTrack.fileName
        }))
    }, [imgName, uploadTrack.fileName])

    const handleUploadFileImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0]
        if (file) {
            const formData = new FormData();
            formData.append('fileUpload', file);
            try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/files/upload`, formData, {
                    headers: {
                        'Authorization': `Bearer ${session?.access_token}`,
                        'target_type': 'images'
                    },
                })
                if (res.data.statusCode === 201) {
                    setImgName(res.data.data.fileName)
                    if (res.data.statusCode === 201) {
                        toast.success("Upload image success!")
                    }
                }
            } catch (error) {
                console.log('error', error)
                // @ts-ignore
                toast.error(JSON.stringify(error?.response?.data?.message))
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        setTrackInfo((preState: ITrackInfo) => ({
            ...preState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async () => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks`, trackInfo, {
                headers: {
                    'Authorization': `Bearer ${session?.access_token}`,
                },
            })
            if (res.data.statusCode === 201) {
                toast.success("Create new track success!")
                setValue(0)
            }
        } catch (error) {
            // @ts-ignore
            console.log('error', error?.response?.data)
            // @ts-ignore
            toast.error(JSON.stringify(error?.response?.data?.message))
        }
    }


    return (
        <>
            <Typography variant="body2">{uploadTrack.fileName || 'Your uploading track:'}</Typography>
            <LinearProgressWithLabel value={uploadTrack.percent} />
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={4} >
                    {imgName ?
                        <CardMedia
                            component="img"
                            sx={{ width: 200, height: 200, mb: 2 }}
                            image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${imgName}`}
                            alt="track picture"
                        />
                        :
                        <Box sx={{ width: 200, height: 200, mb: 2, background: '#ccc' }}></Box>
                    }
                    <Box sx={{ textAlign: 'center', width: '200px' }}>
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                            Upload file
                            <VisuallyHiddenInput type="file" onChange={handleUploadFileImg} />
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <FormControl fullWidth>
                        <TextField fullWidth label="Title" name='title' variant="standard" onChange={handleChange} />
                    </FormControl>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <TextField fullWidth label="Description" name='description' variant="standard" onChange={handleChange} />
                    </FormControl>
                    <FormControl fullWidth variant="standard" sx={{ mt: 2, minWidth: 120 }}>
                        <InputLabel id="category">Category</InputLabel>
                        <Select
                            labelId="category"
                            id="category"
                            onChange={handleChange}
                            label="category"
                            name='category'
                            value={trackInfo.category}
                        >
                            <MenuItem value='CHILL'>CHILL</MenuItem>
                            <MenuItem value='WORKOUT'>WORKOUT</MenuItem>
                            <MenuItem value='PARTY'>PARTY</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="outlined" sx={{ mt: 3 }} onClick={handleSubmit}>Save</Button>
                </Grid>
            </Grid>
        </>
    )
}
