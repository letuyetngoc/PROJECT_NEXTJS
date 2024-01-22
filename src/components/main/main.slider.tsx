'use client'
import React from 'react'
import Slider, { Settings } from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Button, Container, Divider } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

function SampleNextArrow(props: any) {
    const { onClick } = props;
    return (
        <Button size="small"
            sx={{
                position: 'absolute',
                top: '50%',
                minWidth: '30px !important',
                height: '30px !important',
                transform: 'translateY(-50%)',
                right: '15px',
                background: '#ffffff',
                padding: 0
            }}
            onClick={onClick}
            variant="contained"
            color='inherit'
        >
            <ChevronRightIcon />
        </Button >
    );
}

function SamplePrevArrow(props: any) {
    const { onClick } = props;
    return (
        <Button size="small"
            sx={{
                position: 'absolute',
                top: '50%',
                minWidth: '30px !important',
                height: '30px !important',
                transform: 'translateY(-50%)',
                left: '-15px',
                background: '#ffffff',
                padding: 0,
                zIndex: 2
            }}
            onClick={onClick}
            variant="contained"
            color='inherit'
        >
            <ChevronLeftIcon />
        </Button >
    );
}

interface IMainContent {
    data: ITrackTop[],
    title: string
}
export default function MainContent(props: IMainContent) {
    const settings: Settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <Container>
            <h2>{props.title}</h2>
            <Slider {...settings}>
                {props.data.map((track) => {
                    return (
                        <div key={track._id}>
                            <TrackItem track={track} />
                        </div>
                    )
                })}
            </Slider>
            <Divider sx={{ mt: 2 }} />
        </Container >
    )
}

// -------- trachItem --------
interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
interface ITrackItem {
    track: ITrackTop
}
function TrackItem(props: ITrackItem) {
    return (
        <Card sx={{ maxWidth: 200, cursor:'pointer' }}>
            <CardMedia
                component="img"
                height="150"
                image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${props.track.imgUrl}`}
                alt="track image"
            />
            <CardContent>
                <Typography variant="h6" color="text.secondary"
                    sx={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'
                    }}
                >
                    {props.track.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.track.description}
                </Typography>
            </CardContent>
        </Card>
    );
}
// -------- trachItem --------