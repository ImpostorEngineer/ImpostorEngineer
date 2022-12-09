import Head from 'next/head';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function ForOFour() {
  return (
    <Layout>
      <Head>
        <title>Page Not Found</title>
      </Head>
      <div className={utilStyles.forOFour}>
        <div className={utilStyles.forOFourHeading}>OOPS!</div>
        <div className={utilStyles.forOFourText}>404 - The page can't be found</div>
      </div>
    </Layout>
  );
}
