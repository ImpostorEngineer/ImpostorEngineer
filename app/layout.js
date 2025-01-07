import '../styles/global.css';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import { ThemeProvider } from '../context/ThemeContext';

export const metadata = {
  title: 'Impostor Engineer',
  description: 'A blog about software engineering, data science, and other things.',
};

export default function Layout({ children }) {
  return (
    <html lang='en'>
      <body className='antialiased max-w-screen-lg mx-4 mt-8 lg:mx-auto'>
        <ThemeProvider>
          <Navbar />
          <main className='min-h-96'>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
