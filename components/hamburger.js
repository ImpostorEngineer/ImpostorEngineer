import hamburgerStyle from './hamburger.module.css';
import Link from 'next/link';

export default function Hamburger() {
  return (
    <div>
      <div className={hamburgerStyle.hamburgerMenu}>
        <Link href='#'>
          <i className='fas fa-bars'></i>
        </Link>
      </div>
      <div className={hamburgerStyle.hamburger}>
        {navbarData.map((item, key) => (
          <div key={key}>
            <Link href={item.link}>{item.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
