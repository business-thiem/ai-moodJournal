'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export const SideNav = () => {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/journal', label: 'Journal' },
    { href: '/history', label: 'History' },
  ];

  const [isActive, setActive] = useState('/journal');

  return (
    <>
      {links.map((link) => (
        <li
          key={link.href}
          className={`text-center px-2 py-6 text-xl border-solid border-b border-black/10  hover: hover:bg-indigo-500 duration-500 ${
            isActive === link.href ? 'bg-blue-900/20' : ''
          } `}
        >
          <Link
            href={link.href}
            onClick={() => setActive(link.href)}
            className={``}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </>
  );
};

export default SideNav;
