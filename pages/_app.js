import '../styles/global.css';
import Script from 'next/script';
import 'inter-ui/inter.css';
import '@fontsource/source-code-pro';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel='apple-touch-icon' sizes='180x180' href='/images/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/images/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/images/favicon-16x16.png' />
        <link rel='shortcut icon' href='/images/favicon.ico' />
        <link rel='mask-icon' href='/images/safari-pinned-tab.svg' color='#5bbad5' />
        <link rel='manifest' href='/images/site.webmanifest' />
        <meta name='msapplication-config' content='/images/browserconfig.xml' />
        <meta name='theme-color' media='(prefers-color-scheme: light)' content='#fff' />
        <meta name='theme-color' media='(prefers-color-scheme: dark)' content='#000' />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
        <meta name='description' content='I am not an engineer, just a hobbyist.' />
        <meta itemProp='name' content='Impostor Engineer Personal Website' />
        <meta itemProp='description' content='I am not an engineer, just a hobbyist.' />
        <meta itemProp='image' content='https://impostorengineer.vercel.app/images/wide-card.png' />
        <meta property='og:url' content='https://impostorengineer.vercel.app' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Impostor Engineer Personal Website' />
        <meta property='og:description' content='I am not an engineer, just a hobbyist.' />
        <meta property='og:image' content='https://impostorengineer.vercel.app/images/wide-card.png' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='Impostor Engineer Personal Website' />
        <meta name='twitter:description' content='I am not an engineer, just a hobbyist.' />
        <meta name='twitter:image' content='https://impostorengineer.vercel.app/images/wide-card.png' />
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
      </Head>
      <Component {...pageProps} />
    </>
  );
}
