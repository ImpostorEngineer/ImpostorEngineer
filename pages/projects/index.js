import Head from 'next/head';
import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import Link from 'next/link';

export default function Projects() {
  return (
    <Layout>
      <Head>
        <title>Projects</title>
      </Head>
      <h3 className={utilStyles.headingLg}>Some of my Projects:</h3>
      <div className={utilStyles.postBody}>
        <ul className='has-text-weight-medium'>
          <li>
            <Link href='projects/secfilings'>SEC Filings</Link>
          </li>
          <li>
            <Link href='projects/laborstats'>U.S. Economy Charts</Link>
          </li>
          <li>
            <a href='https://impostor-twitch-overlays.vercel.app/' target='_blank'>
              Impostor Stream Overlays
            </a>
          </li>
          <li>
            <a href='https://impostor-calculator.vercel.app/' target='_blank'>
              Mortgage Payoff Calculator
            </a>
          </li>
          <li>
            <a href='https://runewords.vercel.app/' target='_blank'>
              Diablo 2 Runewords
            </a>
          </li>
          <li>
            <a href='https://aoestats.vercel.app/' target='_blank'>
              Age of Empires II: Definitive Edition Player Statistics
            </a>
          </li>
          <li>
            <a href='https://github.com/ImpostorEngineer/APODTwitterBot' target='_blank'>
              A Twitter Bot that posts a random APOD picture every 4 hours.
            </a>
          </li>
        </ul>
      </div>
    </Layout>
  );
}
