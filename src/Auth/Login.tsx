import React, { useState } from 'react';
import SVG from '../assets/SVG/Computer login-amico.svg';
import ClickSpark from '../Components/UI/ClickSpark';
import {
    TextField,
    Button,
    Box,
    Typography,
    Divider,
    IconButton,
    InputAdornment,
    CircularProgress,
    Alert
} from '@mui/material';
import {
    Google as GoogleIcon,
    Visibility,
    VisibilityOff,
    PeopleAlt
} from '@mui/icons-material';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [error, setError] = useState('');

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate login process
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            // Handle successful login here
            console.log('Login successful:', { email, password });
        } catch (err) {
            setError('Invalid email or password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        setIsGoogleLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            // Handle Google login here
            console.log('Google login successful');
        } catch (err) {
            setError('Google sign-in failed. Please try again.');
        } finally {
            setIsGoogleLoading(false);
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            {/* Global overflow prevention */}
            <style>
                {`
                    html, body {
                        overflow: hidden !important;
                        margin: 0;
                        padding: 0;
                        width: 100vw;
                        height: 100vh;
                    }
                    #root {
                        overflow: hidden !important;
                        width: 100vw;
                        height: 100vh;
                    }
                `}
            </style>
            <ClickSpark
                sparkColor="#2563eb"
                sparkSize={18}
                sparkRadius={30}
                sparkCount={8}
                duration={500}
                easing="ease-out"
                extraScale={1}
            >
                <Box
                    sx={{
                        height: '100vh',
                        width: '100vw',
                        backgroundColor: '#f9fafb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 0,
                        margin: 0,
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        overflow: 'hidden',
                        backgroundImage: `
                            linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px'
                    }}
                >
                    {/* Left Side - Login Form */}
                    <Box
                        sx={{
                            maxWidth: 600,
                            width: '100%',
                            padding: { xs: 4, md: 8 },
                            ml: { xs: 2, md: 8, lg: 12 },
                            mr: { xs: 2, md: 4 },
                            minWidth: 0,
                            flexShrink: 0
                        }}
                    >
                        {/* Logo and Title */}
                        <Box sx={{ textAlign: 'left', mb: 6 }}>
                            <Box
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 60,
                                    height: 60,
                                    borderRadius: 2,
                                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                    mb: 3,
                                    boxShadow: '0 8px 32px rgba(37, 99, 235, 0.3)'
                                }}
                            >
                                <PeopleAlt sx={{ color: 'white', fontSize: 28 }} />
                            </Box>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 700,
                                    color: '#1f2937',
                                    mb: 1,
                                    fontFamily: 'Inter, sans-serif'
                                }}
                            >
                                EmpSync
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: '#6b7280',
                                    fontFamily: 'Inter, sans-serif'
                                }}
                            >
                                Employee Management System
                            </Typography>
                        </Box>

                        {/* Error Alert */}
                        {error && (
                            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                                {error}
                            </Alert>
                        )}

                        <Box component="form" onSubmit={handleEmailLogin}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isLoading || isGoogleLoading}
                                sx={{
                                    mb: 3,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 1,
                                        fontFamily: 'Inter, sans-serif',
                                        '&:hover fieldset': {
                                            borderColor: '#2563eb',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#2563eb',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        fontFamily: 'Inter, sans-serif',
                                        '&.Mui-focused': {
                                            color: '#2563eb',
                                        },
                                    },
                                }}
                            />

                            <TextField
                                fullWidth
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading || isGoogleLoading}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleTogglePasswordVisibility}
                                                edge="end"
                                                disabled={isLoading || isGoogleLoading}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 1,
                                        fontFamily: 'Inter, sans-serif',
                                        '&:hover fieldset': {
                                            borderColor: '#2563eb',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#2563eb',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        fontFamily: 'Inter, sans-serif',
                                        '&.Mui-focused': {
                                            color: '#2563eb',
                                        },
                                    },
                                }}
                            />

                            {/* Forgot Password Link */}
                            <Box sx={{ textAlign: 'right', mb: 3 }}>
                                <Button
                                    variant="text"
                                    size="small"
                                    sx={{
                                        color: '#2563eb',
                                        textTransform: 'none',
                                        fontFamily: 'Inter, sans-serif',
                                        fontSize: '0.875rem',
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                            textDecoration: 'underline'
                                        }
                                    }}
                                >
                                    Forgot Password?
                                </Button>
                            </Box>

                            {/* Sign In Button */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={isLoading || isGoogleLoading || !email || !password}
                                sx={{
                                    py: 1.5,
                                    borderRadius: 1,
                                    textTransform: 'none',
                                    fontFamily: 'Inter, sans-serif',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    backgroundColor: '#2563eb',
                                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                                    '&:hover': {
                                        backgroundColor: '#000',
                                        boxShadow: '0 6px 16px rgba(37, 99, 235, 0.4)',
                                    },
                                    '&:disabled': {
                                        backgroundColor: '#e5e7eb',
                                        color: '#9ca3af',
                                        boxShadow: 'none',
                                    },
                                    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                                }}
                            >
                                {isLoading ? (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <CircularProgress size={20} sx={{ color: 'white' }} />
                                        Signing In...
                                    </Box>
                                ) : (
                                    'Sign In'
                                )}
                            </Button>
                        </Box>

                        {/* Divider */}
                        <Box sx={{ display: 'flex', alignItems: 'center', my: 4 }}>
                            <Divider sx={{ flex: 1 }} />
                            <Typography
                                variant="body2"
                                sx={{
                                    px: 2,
                                    color: '#9ca3af',
                                    fontFamily: 'Inter, sans-serif'
                                }}
                            >
                                OR
                            </Typography>
                            <Divider sx={{ flex: 1 }} />
                        </Box>

                        {/* Google Sign In Button */}
                        <Button
                            fullWidth
                            variant="outlined"
                            size="large"
                            onClick={handleGoogleLogin}
                            disabled={isGoogleLoading || isLoading}
                            startIcon={
                                isGoogleLoading ? (
                                    <CircularProgress size={20} />
                                ) : (
                                    <GoogleIcon />
                                )
                            }
                            sx={{
                                py: 1.5,
                                borderRadius: 1,
                                borderColor: '#e5e7eb',
                                color: '#374151',
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 500,
                                textTransform: 'none',
                                fontSize: '0.95rem',
                                '&:hover': {
                                    borderColor: '#2563eb',
                                    backgroundColor: '#eff6ff',
                                    color: '#2563eb'
                                },
                                transition: 'border-color 0.3s ease, background-color 0.3s ease',
                            }}
                        >
                            {isGoogleLoading ? 'Signing in with Google...' : 'Sign in with Google'}
                        </Button>

                        {/* Footer */}
                        <Box sx={{ textAlign: 'center', mt: 4 }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#9ca3af',
                                    fontFamily: 'Inter, sans-serif'
                                }}
                            >
                                Don't have an account?{' '}
                                <Button
                                    variant="text"
                                    size="small"
                                    sx={{
                                        color: '#2563eb',
                                        textTransform: 'none',
                                        fontFamily: 'Inter, sans-serif',
                                        fontSize: '0.875rem',
                                        p: 0,
                                        minWidth: 'auto',
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                            textDecoration: 'underline'
                                        }
                                    }}
                                >
                                    Contact Admin
                                </Button>
                            </Typography>
                        </Box>
                    </Box>

                    {/* Right Side - SVG Illustration */}
                    <Box
                        sx={{
                            flex: 1,
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 4,
                            mr: { md: 4, lg: 8 },
                            minWidth: 0,
                            overflow: 'hidden'
                        }}
                    >
                        <Box
                            component="img"
                            src={SVG}
                            alt="Login Illustration"
                            sx={{
                                maxWidth: '100%',
                                maxHeight: '70vh',
                                width: 'auto',
                                height: 'auto',
                                objectFit: 'contain'
                            }}
                        />
                    </Box>
                </Box>
            </ClickSpark>
        </>
    );
};

export default Login;