import { Box, Chip, Container, Typography } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { sendRequest } from '@/utils/api';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'

export default function trackLikes({ track }: { track: ITrackTop }) {
    const [trackLikes, settrackLikes] = useState<ITrackLike[] | null>(null)
    const { data: session } = useSession()
    const router = useRouter()

    const fetchData = async () => {
        const res = await sendRequest<IBackendRes<IModelPaginate<ITrackLike>>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/likes`,
            method: 'GET',
            queryParams: {
                current: 1,
                pageSize: 100
            },
            headers: {
                'Authorization': 'Bearer ' + session?.access_token,
            }
        })
        if (res.data?.result) {
            settrackLikes(res.data?.result)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleClick = async () => {
        const res = await sendRequest<IBackendRes<IModelPaginate<ITrackLike>>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/likes`,
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + session?.access_token,
            },
            body: { 'track': track._id, 'quantity': trackLikes?.some(t => t._id === track?._id) ? -1 : 1 }
        })
        if(res.statusCode === 201) {
            fetchData()
        }
        router.refresh()
    }

    return (
        <Container sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Chip
                label="Like"
                onClick={handleClick}
                variant="outlined"
                icon={<FavoriteIcon />}
                size="medium"
                color={trackLikes?.some(t => t._id === track?._id) ? 'error' : 'default'}
            />
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2, color: '#616161' }}>
                    <PlayArrowIcon />
                    <Typography variant="body1">{track.countPlay}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#616161' }}>
                    <FavoriteIcon />
                    <Typography variant='body1'>{track.countLike}</Typography>
                </Box>
            </Box>
        </Container>
    )
}
