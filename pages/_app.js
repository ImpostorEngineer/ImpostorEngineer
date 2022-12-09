import '../styles/global.css';
import Script from 'next/script';
import '@fontsource/inter/variable-full.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script strategy='afterInteractive' src='https://www.googletagmanager.com/gtag/js?id=G-JP5LKKYL7V' />
      <Script
        id='google-analytics'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || []; 
          function gtag(){dataLayer.push(arguments);} 
          gtag('js', new Date());
          gtag('config', 'G-JP5LKKYL7V', {page_path: window.location.pathname,});`,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
