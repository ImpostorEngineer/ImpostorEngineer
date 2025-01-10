'use client';
import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';
import navLinks from '@/assets/navLinks.json';
import { useState } from 'react';

export default function MobileNavBar() {
  const { theme, toggleTheme } = useTheme();
  const navItems = navLinks;
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div>
      <div className='md:hidden flex items-center'>
        <button onClick={() => setToggleMenu(!toggleMenu)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            className='h-8 w-8 text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400'
          >
            <path
              fillRule='evenodd'
              d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>
      <nav
        className={`fixed z-40 w-full bg-gray-100 dark:bg-gray-800 overflow-hidden flex flex-col lg:hidden gap-2 origin-top duration-700 ${
          !toggleMenu ? 'h-0' : 'h-full'
        }`}
      >
        {Object.entries(navItems).map(([path, { name }]) => (
          <Link key={path} href={path} className='font-bold p-2 ml-2' onClick={() => setToggleMenu(!toggleMenu)}>
            {name}
          </Link>
        ))}

        <div className='pl-2 ml-2' onClick={() => setToggleMenu(!toggleMenu)}>
          <Link href='#' onClick={toggleTheme}>
            {theme === 'light' ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                fill='currentColor'
                className='fill-current'
                enableBackground='new 0 0 24 24'
                viewBox='0 0 24 24'
              >
                <rect fill='none' height='24' width='24'></rect>
                <path d='M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36c-0.98,1.37-2.58,2.26-4.4,2.26 c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z'></path>
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                fill='currentColor'
                className='fill-current'
                enableBackground='new 0 0 24 24'
                viewBox='0 0 24 24'
              >
                <rect fill='none' height='24' width='24'></rect>
                <path d='M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z'></path>
              </svg>
            )}
          </Link>
        </div>
      </nav>
    </div>
  );
}
