import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookies from 'universal-cookie/es6'
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import alreadyLoggedIn from '../../Util/Token';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="#">
                Mihir Waykole
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignIn() {
    const cookies = new Cookies();
    const history = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        let data = new FormData(event.currentTarget);
        if (data.get('password') !== data.get('confirmPassword')) {
            alert('Passwords do not match');
            return;
        }
        data = {
            username: data.get('username'),
            email: data.get('email'),
            password: data.get('password'),
        }
        let req = await axios.post('/api/auth/register', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let json = await req.data;
        if (json.success !== undefined) {
            cookies.set('token', json.token);
            history('/');
            console.log(cookies.get('token'));
        }
    };
    useEffect(() => {
        alreadyLoggedIn(() => {
            history('/');
        },cookies);
    })

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="xs" sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 'auto'
            }}>
                <Paper elevation="8" sx={{
                    borderRadius: 3,
                    background: '#F5F5F5',
                    padding: 3,
                }}>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="password2"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
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
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Paper>
            </Container>
        </ThemeProvider>
    );
}