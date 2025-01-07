import Link from 'next/link';
export const metadata = {
  title: 'Projects',
  description: 'Impostor Engineer is a blog about data science, machine learning, and artificial intelligence.',
};

export default function Projects() {
  return (
    <section>
      <h3 className=''>Some of my Projects:</h3>
      <div className=''>
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
    </section>
  );
}
