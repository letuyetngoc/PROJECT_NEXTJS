'use client'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert, Divider, IconButton, InputAdornment, Paper, Snackbar } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { signIn } from 'next-auth/react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation'
import { error } from 'console';

interface IUserInfo {
    email: string
    password: string,
}
export default function AuthSignIn() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [openNotify, setOpenNotify] = useState<boolean>(false);
    const [messageInfo, setMessageInfo] = useState<string>('');

    const [userInfo, setUserInfo] = useState<IUserInfo>({ email: '', password: '' })
    const [isUserError, setIsUserError] = useState<{ email: boolean, password: boolean }>({ email: false, password: false })
    const [userError, setUserError] = useState<IUserInfo>({ email: '', password: '' })

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setIsUserError({ email: false, password: false })
        setUserError({ email: '', password: '' })

        if (!userInfo.email) {
            setIsUserError(isUserError => ({ ...isUserError, email: true }));
            setUserError(userError => ({ ...userError, email: 'Email is not empty!' }));
            return;
        }

        if (!userInfo.password) {
            setIsUserError(isUserError => ({ ...isUserError, password: true }));
            setUserError(userError => ({ ...userError, password: 'Password is not empty!' }));
            return;
        }

        const res = await signIn("credentials", {
            username: userInfo.email,
            password: userInfo.password,
            redirect: false
        })
        if (res?.error !== null) {
            setOpenNotify(true)
            setMessageInfo(res?.error || '')
        } else {
            router.push('/')
        }
    }
    return (
        <Container component="main" maxWidth="xs" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CssBaseline />
            <Paper elevation={3} sx={{ p: 3 }}>
                <IconButton onClick={() => router.push('/')}>
                    <ArrowBackIcon />
                </IconButton>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#ccc' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={(e) => handleSubmit(e)} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            error={isUserError.email}
                            helperText={userError.email}
                            onChange={(e) => handleOnChange(e)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            autoComplete="current-password"
                            type={showPassword ? 'text' : 'password'}
                            error={isUserError.password}
                            helperText={userError.password}
                            onChange={(e) => handleOnChange(e)}

                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(show => !show)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>,
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
                <Divider>
                    Or using
                </Divider>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'cente', marginTop: '10px' }}>
                    <Avatar sx={{ m: 1, bgcolor: 'orange' }}>
                        <IconButton sx={{ color: '#fff' }} size="small" onClick={() => signIn("github")}><GitHubIcon /></IconButton>
                    </Avatar>
                    <Avatar sx={{ m: 1, bgcolor: 'orange' }}>
                        <IconButton sx={{ color: '#fff' }} size="small"><GoogleIcon /></IconButton>
                    </Avatar>
                </Box>
            </Paper>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={6000}
                open={openNotify}
                onClose={() => setOpenNotify(false)}
                message={'Error'}

            >
                <Alert
                    onClose={()=>setOpenNotify(false)}
                    severity="error"
                    sx={{ width: '100%' }}
                >
                    {messageInfo}
                </Alert>
            </Snackbar>
        </Container>
    );
}