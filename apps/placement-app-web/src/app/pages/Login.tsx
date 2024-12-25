import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Autocomplete } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const paperstyle = {
  padding: 10,
  width: 300,
  margin: "0 auto",
};

const logo = "your-logo-url"; // Replace with your logo URL

const SignInForm: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);
  const [email, setEmail] = useState(''); // Email state
  const [password, setPassword] = useState(''); // Password state
  const [isSignUp, setIsSignUp] = useState(false); // Track whether user is signing up

  // Role options
  const roles = ['student', 'company', 'college'];

  // Handle role selection change
  const handleChange = (event: unknown, newValue: string | null) => {
    setRole(newValue);

    if (newValue) {
      if (isSignUp) {
        // Redirect to sign-up page based on role
        navigate(`/${newValue}-sign-up`);
      } else {
        // Redirect to dashboard based on role
        handleAutoSignIn(newValue);
      }
    }
  };

  // Auto Sign-in functionality
  const handleAutoSignIn = (selectedRole: string) => {
    console.log(`User logged in as ${selectedRole}`);
    if (selectedRole === 'student') {
      navigate('/student-dashboard'); // Redirect to student dashboard
    } else if (selectedRole === 'company') {
      navigate('/company-dashboard'); // Redirect to company dashboard
    } else if (selectedRole === 'college') {
      navigate('/college-dashboard'); // Redirect to college dashboard
    }
  };

  // Handle Sign Up button click and toggle to Sign-Up mode
  const handleSignUpClick = () => {
    setIsSignUp(true);
    setRole(null); // Reset role selection for a fresh start
  };

  // Handle Cancel button click
  const handleCancelClick = () => {
    setEmail(''); // Reset email field
    setPassword(''); // Reset password field
    setRole(null); // Reset role selection
    setIsSignUp(false); // Reset sign-up mode
  };

  return (
    <div className="animated-background">
      <Grid container justifyContent="center" alignItems="center" style={{ marginTop: '10rem', height: 'max-content' }}>
        <Paper elevation={10} sx={{ ...paperstyle, textAlign: 'center' }} className="paper-container">
          <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ marginBottom: 2 }}>
            <Avatar src={logo} sx={{ marginBottom: 1 }} />
            <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
          </Grid>

          {!isSignUp && (
            <Grid container direction="column" spacing={3} sx={{ marginBottom: 4 }}>
              <Grid item>
                <TextField
                  label="Email"
                  fullWidth
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
          )}

          <Grid container direction="row" spacing={2} sx={{ marginBottom: 3 }}>
            <Grid item xs={6}>
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
                  />
                )}
                isOptionEqualToValue={(option, value) => option === value}
                sx={{ width: '100%' }}
              />
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="center" spacing={2}>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                fullWidth
                size="medium"
                onClick={handleCancelClick}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                fullWidth
                size="medium"
                onClick={handleSignUpClick}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};

export default SignInForm;
