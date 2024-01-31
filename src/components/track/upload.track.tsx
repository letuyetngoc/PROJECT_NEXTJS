'use client'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import Step1 from './step/step1';
import Step2 from './step/step2';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}


function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
interface IUploadTrack {
    fileName: string;
    percent: number;
}
export default function UploadTrack() {
    const [uploadTrack, setUploadTrack] = useState<IUploadTrack>({ fileName: '', percent: 0 })

    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Container maxWidth="md" sx={{ border: '1px solid #ccc', marginTop: '30px' }}>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="TRACKS" {...a11yProps(0)} />
                        <Tab label="BASIC INFORMATION" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <Step1 setUploadTrack={setUploadTrack} setValue={setValue} />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <Step2 uploadTrack={uploadTrack} />
                </CustomTabPanel>
            </Box>
        </Container>
    );
}

