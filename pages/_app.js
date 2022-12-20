import '../styles/global.css';
import Script from 'next/script';
import '@fontsource/inter/variable-full.css';
import '@fontsource/source-code-pro';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script strategy='afterInteractive' src='https://www.googletagmanager.com/gtag/js?id=G-XJ11TCK7ZM' />
      <Script
        id='google-analytics'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || []; 
          function gtag(){dataLayer.push(arguments);} 
          gtag('js', new Date());
          gtag('config', 'G-XJ11TCK7ZM', {page_path: window.location.pathname,});`,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
