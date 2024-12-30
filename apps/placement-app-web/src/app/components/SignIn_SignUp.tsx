import React, { useState } from 'react';
import {
  Grid,
  Avatar,
  TextField,
  Button,
  Typography,
  Autocomplete,
  Box,
  Stack,
} from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { useNavigate } from 'react-router-dom';

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  filter: 'blur(50%)',
  width: 300,
  bgcolor: 'rgba(25, 118, 210, 0.1)',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  border: '1px solid black',
};

const SignInForm: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(true);

  const roles = ['Student', 'Company', 'College'];

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: string | null
  ) => {
    setRole(newValue);

    if (newValue) {
      if (isSignUp) {
        navigate(`/${newValue}-sign-up`);
      } else {
        handleAutoSignIn(newValue);
      }
    }
  };

  const handleAutoSignIn = (selectedRole: string) => {
    console.log(`User logged in as ${selectedRole}`);
    if (selectedRole === 'Student') {
      navigate('/student-dashboard');
    } else if (selectedRole === 'Company') {
      navigate('/company-dashboard');
    } else if (selectedRole === 'College') {
      navigate('/college-dashboard');
    }
  };

  const handleSignUpClick = () => {
    setIsSignUp(true);
    setRole(null);
  };

  const handleCancelClick = () => {
    setRole(null);
    setIsSignUp(false);
    setEmail('');
    setPassword('');
    setOpen(true);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        background: 'linear-gradient(45deg, #1976d2 30%, #00796b 90%)',
        overflow: 'hidden',

        '&::before': {
          content: '"NextStep"',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '300px',
          fontWeight: 'bold',
          color: 'rgba(0, 0, 0, 0.1)',
          zIndex: 1,
        },
      }}
    >
      {open && (
        <Box sx={{ ...boxStyle, zIndex: 2 }}>
          <Stack
            spacing={3}
            alignItems="center"
            sx={{ position: 'relative', zIndex: 2 }}
          >
            <Avatar sx={{ width: 60, height: 60 }}>
              {isSignUp ? (
                <HandshakeIcon sx={{ color: 'coral', width: 56, height: 56 }} />
              ) : (
                <KeyIcon sx={{ color: 'coral', width: 56, height: 56 }} />
              )}
            </Avatar>

            <Typography variant="h5" sx={{ fontFamily: 'Italic' }}>
              {isSignUp ? 'Sign Up' : ' Login'}
            </Typography>

            {!isSignUp && (
              <Stack spacing={2} width="100%">
                <TextField
                  label="Email"
                  value={email}
                  fullWidth
                  variant="outlined"
                  onClick={() => {
                    setEmail(email);
                    console.log('email clicked');
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    '& .MuiInputBase-input': {
                      backgroundColor: 'transparent',
                      color: 'whitesmoke',
                      fontSize: '1rem',
                    },
                    '&:hover ': {
                      transform: 'scale(1.1)',
                      transition: 'transform 0.3s ease',
                      border: '1px blueviolet',
                    },
                  }}
                />
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  fullWidth
                  variant="outlined"
                  onClick={() => {
                    setPassword(password);
                    console.log('password clicked');
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    '& .MuiInputBase-input': {
                      backgroundColor: 'transparent',
                      color: 'whitesmoke',
                    },
                    '&:hover ': {
                      transform: 'scale(1.1)',
                      transition: 'transform 0.3s ease',
                    },
                  }}
                />
              </Stack>
            )}

            <Autocomplete
              value={role}
              size="medium"
              onChange={handleChange}
              options={roles}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={isSignUp ? 'Sign Up Role' : 'Role'}
                  variant="outlined"
                  sx={{
                    '& .MuiInputBase-input': {
                      backgroundColor: 'transparent',
                      color: 'whitesmoke',
                    },
                    '&:hover ': {
                      transform: 'scale(1.1)',
                      transition: 'transform 0.3s ease',
                    },
                  }}
                />
              )}
              isOptionEqualToValue={(option, value) => option === value}
              sx={{ width: '100%' }}
            />

            <Stack direction="row" spacing={2} width="100%">
              <Button
                variant="contained"
                fullWidth
                sx={{
                  fontFamily: 'Italic',
                  backgroundColor: 'coral',
                  textTransform: 'capitalize',
                  color: 'black',
                  fontSize: '1rem',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    border: '3px blueviolet',
                  },
                }}
                size="medium"
                onClick={handleCancelClick}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  fontFamily: 'Italic',

                  textTransform: 'capitalize',
                  backgroundColor: 'coral',
                  color: 'black',
                  fontSize: '1rem',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    border: '1px blueviolet',
                  },
                }}
                size="medium"
                onClick={handleSignUpClick}
              >
                Sign Up
              </Button>
            </Stack>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default SignInForm;
