import Head from 'next/head';

export default function Meta() {
  <Head>
    <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
    <link rel='apple-touch-icon' sizes='180x180' href='/images/apple-touch-icon.png' />
    <link rel='icon' type='image/png' sizes='32x32' href='/images/favicon-32x32.png' />
    <link rel='icon' type='image/png' sizes='16x16' href='/images/favicon-16x16.png' />
    <link rel='manifest' href='/images/site.webmanifest' />
    {/* <link
      rel='stylesheet'
      href='https://pro.fontawesome.com/releases/v5.10.0/css/all.css'
      integrity='sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p'
      crossOrigin='anonymous'
    /> */}
    <script src='https://kit.fontawesome.com/ab5e2af120.js' crossorigin='anonymous'></script>
    <meta name='description' content='Management faculty, share news and data on this site.' />
    <meta itemProp='name' content='Impostor Engineer Personal Website' />
    <meta itemProp='description' content='Management faculty, share news and data on this site.' />
    <meta itemProp='image' content='https://impostorengineer.vercel.app/images/wide-card.png' />
    <meta property='og:url' content='https://impostorengineer.vercel.app' />
    <meta property='og:type' content='website' />
    <meta property='og:title' content='Impostor Engineer Personal Website' />
    <meta property='og:description' content='Management faculty, share news and data on this site.' />
    <meta property='og:image' content='https://impostorengineer.vercel.app/images/wide-card.png' />
    <meta name='twitter:card' content='summary_large_image' />
    <meta name='twitter:title' content='Impostor Engineer Personal Website' />
    <meta name='twitter:description' content='Management faculty, share news and data on this site.' />
    <meta name='twitter:image' content='https://impostorengineer.vercel.app/images/wide-card.png' />
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_TRACKING_ID}`} />
    <script
      dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || []; 
          function gtag(){dataLayer.push(arguments);} 
          gtag('js', new Date());
          gtag('config', '${process.env.GOOGLE_TRACKING_ID}', {page_path: window.location.pathname,});`,
      }}
    />
  </Head>;
}
