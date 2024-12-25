import React from "react";
import { Container, TextField, Button, Box, Grid } from "@mui/material";
import "../css/LoginForm.scss"; // Import your SCSS file

const LoginForm = () => {
    return (
        <div className="container" >
            <Box className="box">
                <TextField
                    id="outlined-email-input"
                    label="Email"
                    type="email"
                    className="text-field"
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    className="text-field"
                />
                <div className="button-container">
                    <Button variant="contained" className="button">
                        Login
                    </Button>
                    <Button variant="contained" className="button">
                        Cancel
                    </Button>
                </div>
            </Box>
        </div>
    );
};

export default LoginForm;
