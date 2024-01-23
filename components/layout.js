import styles from './layout.module.css';
import Navbar from './navbar';
import Footer from './footer';
import Head from 'next/head';

export const siteTitle = 'Impostor Engineer Personal Website';

export default function Layout({ children, home, post }) {
  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <Navbar />
        </header>
        <main className={styles.main}>
          <section>{children}</section>
        </main>
        <Footer />
      </div>
    </>
  );
}
