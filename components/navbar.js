import React, { useEffect, useState } from 'react';
import navbarStyle from './navbar.module.css';
import Link from 'next/link';
import ChangeTheme from './changeTheme';
import { navbarData } from './navbarData';
import TwitchStatus from './twitchComponent';
import { useLive } from '../lib/useLive';

export default function Navbar() {
  const [active, setActive] = useState(false);

  const isLive = useLive();

  return (
    <>
      <div className={navbarStyle.hamburgerMenu}>
        <Link href='#'>
          <span onClick={() => setActive(!active)}>
            <i aria-hidden className='fas fa-bars'></i>
          </span>
        </Link>
      </div>
      <div className={`${navbarStyle.navbar} ${active ? navbarStyle.showNavBar : ''}`}>
        {navbarData.map((item, key) => (
          <div key={key}>
            <Link href={item.link}>{item.name}</Link>
          </div>
        ))}

        <div className={navbarStyle.themeSwitch}>
          {isLive.amILive && <TwitchStatus />}
          <ChangeTheme />
        </div>
      </div>
    </>
  );
}
