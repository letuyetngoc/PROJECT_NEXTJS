import React, { useEffect, useState } from 'react'
import { Box, Button, CardMedia, FormControl, Grid, InputLabel, LinearProgress, LinearProgressProps, MenuItem, Select, TextField, Typography, styled } from '@mui/material';
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

export default function Step2() {
    const [progress, setProgress] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);

    
    return (
        <>
            <Typography component="p">Your uploading track:</Typography>
            <LinearProgressWithLabel value={progress} />
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={4} >
                    <CardMedia
                        component="img"
                        sx={{ width: 200, height: 200, mb: 2 }}
                        image="https://picsum.photos/200/300"
                        alt="track picture"
                    />
                    <Box sx={{ textAlign: 'center', width: '200px' }}>
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                            Upload file
                            <VisuallyHiddenInput type="file" />
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <FormControl fullWidth>
                        <TextField fullWidth label="Title" variant="standard" />
                    </FormControl>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <TextField fullWidth label="Description" variant="standard" />
                    </FormControl>
                    <FormControl fullWidth variant="standard" sx={{ mt: 2, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            // onChange={handleChange}
                            label="Age"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="outlined" sx={{ mt: 3 }}>Save</Button>
                </Grid>
            </Grid>
        </>
    )
}
