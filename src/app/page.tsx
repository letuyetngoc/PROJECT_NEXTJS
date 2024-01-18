import MainContent from '@/components/main/main.slider';
import { Container } from '@mui/material';
import * as React from 'react';

export default function HomePage() {

  return (
    <Container maxWidth="xl">
      <MainContent />
      <MainContent />
      <MainContent />
      </Container>
  );
}
