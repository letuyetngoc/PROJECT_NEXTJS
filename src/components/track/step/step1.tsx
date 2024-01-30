'use client'
import React, { useCallback } from 'react'
import { Box, Button, styled } from '@mui/material'
import Dropzone, { useDropzone } from 'react-dropzone'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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
export default function Step1() {

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        

    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    // const files = acceptedFiles.map(file => {
    //     return <li key={file.name}>
    //         {file.name} - {file.size} bytes
    //     </li>
    // });

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
            <Box>
                <h4>Files</h4>
                {/* <ul>{files}</ul> */}
            </Box>
        </>
    )
}
