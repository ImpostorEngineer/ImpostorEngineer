import Head from 'next/head';
import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import Link from 'next/link';

export default function Contact() {
  return (
    <Layout>
      <Head>
        <title>Contact</title>
      </Head>
      <h2 className={utilStyles.headingLg}>Contact Information:</h2>
      <div className={utilStyles.contact}>
        <div className={`${utilStyles.row} ${utilStyles.icon}`}>
          <i className='fab fa-kaggle'></i>
        </div>
        <div className={utilStyles.rowname}>
          <a href='https://www.kaggle.com/impostorengineer' target='_blank'>
            Impostor Engineer
          </a>
        </div>
        <div className={`${utilStyles.row} ${utilStyles.icon}`}>
          <i className='fa-brands fa-twitter'></i>
        </div>
        <div className={utilStyles.rowname}>
          <a href='https://twitter.com/ImpostorEnginer' target='_blank'>
            @ImpostorEnginer
          </a>
        </div>
        <div className={`${utilStyles.row} ${utilStyles.icon}`}>
          <i className='fa-brands fa-github'></i>
        </div>
        <div className={utilStyles.rowname}>
          <a href='https://github.com/ImpostorEngineer' target='_blank'>
            Impostor Engineer
          </a>
        </div>
      </div>
    </Layout>
  );
}
