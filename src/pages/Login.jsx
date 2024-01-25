import React from 'react'
import { useState } from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import ErrorIcon from '@mui/icons-material/Error'
import axios from 'axios';

import '../App.css'
import { useNavigate } from 'react-router-dom'
import { Fragment } from 'react'
import { useAuth } from '../hooks/AuthContext'
import useCustomModal from '../hooks/useCustomModal'

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {'Copyright © '}
            <Link color="inherit" href="#">
                BiNNO
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

export default function Login() {
    const { handleOpen, handleClose, CustomModal } = useCustomModal()
    const navigate = useNavigate()
    const { login } = useAuth()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const accessKey = data.get('access-key')
        const password = data.get('password')
        const requestData = {
            accessKey: accessKey,
            password: password,
        }

<<<<<<< HEAD

        try {
            const response = await axios.post('/api/login', requestData);
            const data = response.data;  // Axios automatically parses the JSON response
            console.log(data.token);
    
            if (data.token) {
                localStorage.setItem('access', data.token);
                login(); // Set authenticated to true
                navigate('/dashboard');
            } else {
                handleOpen();
=======
        const fetchData = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BACKEND_DOMAIN}/login`,
                    {
                        method: 'POST',
                        body: JSON.stringify({ ...requestData }),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )
                const data = await res.json()
                console.log(data.token)

                if (data.token) {
                    localStorage.setItem('access', data.token)
                    login() // Set authenticated to true
                    navigate('/dashboard')
                } else {
                    handleOpen()
                }
            } catch (err) {
                console.err
>>>>>>> ee16de47fb4d0c0fd0b6bc34f6500f523e0c2502
            }
        } catch (err) {
            console.error(err);
        }
<<<<<<< HEAD
        
    };
=======
        fetchData()
    }
>>>>>>> ee16de47fb4d0c0fd0b6bc34f6500f523e0c2502

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {open && (
                <CustomModal
                    open={open}
                    handleClose={handleClose}
                    content={
                        <Fragment>
                            <ErrorIcon />
                            <h1 className="heading-1">I'm from Login</h1>
                            <p>This is a paragraph from Login</p>
                        </Fragment>
                    }
                    additions={
                        <button className="btn-blue">Button from test</button>
                    }
                />
            )}
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <img src="../../public/img/binno-logo.png" alt="" />
                <Typography className="sm:text-sm" component="h1" variant="h5">
                    System Administrator Login
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="access-key"
                        label="Access Key"
                        name="access-key"
                        autoComplete="off"
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
                        sx={{ mt: 1, mb: 2 }}
                    />
                    <Button
                        className="bg-red-500"
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1, mb: 2, p: 1.5 }}
                        style={{
                            backgroundColor: '#ff7a00',
                        }}
                    >
                        Sign-In
                    </Button>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    )
}
