import './styles/global.css';
import Footer from './components/footer';
import Navbar from './components/navbar';
import { ThemeProvider } from './context/ThemeContext';

export const metadata = {
  title: 'Impostor Engineer',
  description: 'Impostor Engineer is a blog about data science, machine learning, and artificial intelligence.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`container mx-auto px-4 py-4`}>
        <ThemeProvider>
          <Navbar />
          <div className='container'>{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
