import ThemeRegistry from '@/components/theme-registry/theme.registry';
import NextAuthWrapper from '@/lib/next.auth.wrapper';
import ProgressBarWrapper from '@/lib/progressbar.wrapper';
import TrackContextProvider from '@/lib/track.wrapper';
import { ToastProvider } from '@/utils/toast';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <ProgressBarWrapper>
            <NextAuthWrapper>
              <ToastProvider>
                <TrackContextProvider>
                  {children}
                </TrackContextProvider>
              </ToastProvider>
            </NextAuthWrapper>
          </ProgressBarWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}
