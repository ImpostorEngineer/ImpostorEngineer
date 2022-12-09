import Image from 'next/image';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const Hero = () => {
  return (
    <>
      <div className={utilStyles.hero}>
        <div className={utilStyles.profileImg}>
          <Image
            priority
            src='/images/ImpostorEngineer.png'
            className={utilStyles.borderCircle}
            height={178}
            width={178}
            alt='Impostor Engineer'
          />
        </div>
        <h1 className={utilStyles.headingXl}>Impostor Engineer, Ph.D.</h1>
      </div>
      <section>
        <p className={utilStyles.headingMd}>
          Hello, I’m <strong>Impostor Engineer</strong>.
        </p>
        <p>I’m not an engineer, I just pretend sometimes.</p>
        <p>On this page I will share some notes, code, and my projects.</p>
      </section>
    </>
  );
};
export default Hero;
