// src/components/LoginPage.jsx
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useAuth } from '../Context/AuthContext';
import styled from '@emotion/styled';

const LoginContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
`;

const Watermark = styled(Typography)`
  position: fixed;
  bottom: 10px;
  float:left;
  opacity: 0.1;
  z-index: 1;
`;

const DeveloperCard = styled(Box)`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
`;

const LoginPage = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login(username, password);
  };

  return (
    <LoginContainer maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Login to Dashboard
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ margin: '10px 0' }}
      />
      <TextField
        type="password"
        label="Password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: '10px 0' }}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin} style={{ margin: '10px 0' }}>
        Login
      </Button>
      <DeveloperCard>
        <Typography variant="h6">Mohan S R Prasad Kandru</Typography>
        <Typography variant="body2">Software Engineer</Typography>
        <Typography variant="body2">
          <a href="https://www.linkedin.com/in/mohan-s-r-p-kandru-99b03516b/" target="_blank" rel="noopener noreferrer">
            My LinkedIn Profile
          </a>
        </Typography>
      </DeveloperCard>
      <Watermark variant="h1">Nua-Assignment-Project</Watermark>
    </LoginContainer>
  );
};

export default LoginPage;
