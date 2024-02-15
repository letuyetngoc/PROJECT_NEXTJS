import AppFooter from '@/components/footer/app.footer';
import AppHeader from '@/components/header/app.header';
import { Container } from '@mui/material';
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'title layout',
  description: 'description layout',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      <Container maxWidth='lg' sx={{marginBottom:'80px', marginTop:'20px'}}>
        {children}
      </Container>
      <AppFooter />
    </>
  );
}
