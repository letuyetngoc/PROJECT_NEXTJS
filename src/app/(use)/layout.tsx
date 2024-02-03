import AppFooter from '@/components/footer/app.footer';
import AppHeader from '@/components/header/app.header';
import { Container } from '@mui/material';

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
