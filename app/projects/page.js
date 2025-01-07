import Link from 'next/link';
export const metadata = {
  title: 'Projects',
  description: 'Impostor Engineer is a blog about data science, machine learning, and artificial intelligence.',
};

export default function Projects() {
  return (
    <section>
      <h2>Some of my Projects:</h2>
      <ul>
        <li>
          <Link href='projects/secfilings'>SEC Filings</Link>
        </li>
        <li>
          <Link href='projects/economy'>U.S. Economy Charts</Link>
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
      </ul>
    </section>
  );
}
