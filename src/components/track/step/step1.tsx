'use client'
import React, { useCallback } from 'react'
import { Box, Button, styled } from '@mui/material'
import { FileWithPath, useDropzone } from 'react-dropzone'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useSession } from 'next-auth/react';
import axios, { AxiosProgressEvent } from 'axios';

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
interface IProps {
    setValue: (value: number) => void;
    setUploadTrack: (value: { fileName: string, percent: number }) => void;
}
export default function Step1(props: IProps) {
    const { setUploadTrack, setValue } = props
    const { data: session } = useSession()

    const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
        if (acceptedFiles && acceptedFiles[0]) {
            setValue(1)
            const audio = acceptedFiles[0]
            const formData = new FormData();
            formData.append('fileUpload', audio);

            const options = {
                onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                    const { loaded, total } = progressEvent;

                    let percent = Math.floor((loaded * 100) / total!);

                    if (percent < 100) {
                        setUploadTrack({
                            fileName: audio.name,
                            percent,
                        });;
                    }
                }
            };
            try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/files/upload`, formData, {
                    headers: {
                        'Authorization': `Bearer ${session?.access_token}`,
                        'target_type': 'tracks'
                    },
                    ...options
                })
                if (res.data.statusCode === 201) {
                    setUploadTrack({
                        fileName: res.data.data.fileName,
                        percent: 100
                    });
                }
            } catch (error) {
                setUploadTrack({
                    fileName: '',
                    percent: 0,
                });
                console.log('error', error)
            }
        }

    }, [session])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'audio/mp3': ['.mp3', '.wav', '.flac', '.aac', '.ogg', '.wma', '.aiff', '.m4a', '.opus', '.midi', '.mid', '.3gp'],
        }
    })

    return (
        <>
            <Box {...getRootProps()} sx={{ border: '2px dashed #ccc', background: '#f5f5f5', p: 3, textAlign: 'center' }}>
                <Box sx={{ mt: 2 }}>
                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload file
                        <VisuallyHiddenInput type="file" {...getInputProps()} />
                    </Button>
                </Box>
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag and drop some files here, or click to select files</p>
                }
            </Box>
        </>
    )
}
