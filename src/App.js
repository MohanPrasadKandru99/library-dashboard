// src/App.js
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useAuth } from './Context/AuthContext';
import LoginPage from './Components/LoginPage';
import BookTable from './Components/BookTable';
import styled from '@emotion/styled';

const AppContainer = styled(Box)`
  overflow: hidden;
  position: relative;
`;

const App = () => {
  const { isLoggedIn } = useAuth();

  return (
    <AppContainer>
      <Container>
        <Typography variant="h4" gutterBottom>
          Open Library Book Dashboard
        </Typography>
        {isLoggedIn ? <BookTable /> : <LoginPage />}
      </Container>
    </AppContainer>
  );
};

export default App;
