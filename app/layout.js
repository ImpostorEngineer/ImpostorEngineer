import '../styles/global.css';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import { ThemeProvider } from '../context/ThemeContext';

export default function Layout({ children }) {
  return (
    <html lang='en'>
      <head>
        <title>Impostor Engineer</title>
        <meta name='description' content='A blog about software engineering, data science, and other things.' />
      </head>
      <body className='antialiased max-w-screen-lg mx-4 mt-8 lg:mx-auto' data-theme='light'>
        <ThemeProvider>
          <Navbar />
          <main className='min-h-96'>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
