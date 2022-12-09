import utilStyles from '../styles/utils.module.css';

export default function Footer() {
  return (
    <div className={utilStyles.footer}>
      <div>
        <a
          className={utilStyles.googleScholar}
          href='https://www.kaggle.com/impostorengineer'
          alt='Kaggle'
          target='_blank'
        >
          <i aria-hidden className='fab fa-kaggle'></i>
        </a>
      </div>
      <div>
        <a className={utilStyles.email} href='https://www.youtube.com/@impostorengineer' alt='YouTube' target='_blank'>
          <i aria-hidden className='fa-solid fa-video'></i>
        </a>
      </div>
      <div>
        <a className={utilStyles.twitter} href='https://twitter.com/ImpostorEnginer' alt='twitter' target='_blank'>
          <i aria-hidden className='fab fa-twitter'></i>
        </a>
      </div>
      <div>
        <a className={utilStyles.github} href='https://github.com/ImpostorEngineer' alt='github' target='_blank'>
          <i aria-hidden className='fab fa-github'></i>
        </a>
      </div>
      <div className={utilStyles.lightText}>Copyright &copy; Impostor Engineer 2022</div>
    </div>
  );
}
