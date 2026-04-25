import type { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react";
import Script from 'next/script'; // 1. Import Script
import dynamic from 'next/dynamic'; // 2. Import dynamic

// 3. Terapkan Dynamic Import pada komponen Layout
const AppShell = dynamic(() => import('@/components/layouts/Appshell'), {
  ssr: true, // Tetap true karena AppShell biasanya berisi struktur navigasi
});

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps },
  }: AppProps) {
  return (
    <SessionProvider session={session}>
      {/* 4. Implementasi Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`} 
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX'); 
        `}
      </Script>

        <AppShell>
          <Component {...pageProps} />
        </AppShell>
      </SessionProvider>
  );
}