import '../styles/global.css';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import { ThemeProvider } from '../context/ThemeContext';

export default function Layout({ children }) {
  return (
    <html lang='en'>
      <head>
        <title>Impostor Engineer</title>
        <meta
          name='description'
          content='A blog about software engineering, data science, and other things. I am not an engineer, just a hobbyist.'
        />
        <link rel='apple-touch-icon' sizes='180x180' href='/images/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/images/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/images/favicon-16x16.png' />
        <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
        <link rel='shortcut icon' href='/images/favicon.ico' />
        <link rel='mask-icon' href='/images/safari-pinned-tab.svg' color='#5bbad5' />
        <link rel='manifest' href='/images/site.webmanifest' />
        <meta name='msapplication-config' content='/images/browserconfig.xml' />
        <meta name='msapplication-TileColor' content='#da532c' />
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
      </head>
      <body className='antialiased max-w-screen-lg mx-4 mt-8 lg:mx-auto light' data-theme='light'>
        <ThemeProvider>
          <Navbar />
          <main className='min-h-96'>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
