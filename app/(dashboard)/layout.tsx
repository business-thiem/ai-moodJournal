import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/journal', label: 'Journal' },
];

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen relative ">
      <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-black/10">
        <div className="border-solid border-b border-black/10">
          Mood Journal
        </div>
        <ul className="grid grid-cols-1 gap-1">
          {links.map((link) => (
            <li
              key={link.href}
              className="text-center px-2 py-6 text-xl border-solid border-b border-black/10 hover: hover:bg-indigo-500 duration-500"
            >
              <Link href={link.href} className="">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      <div className="ml-[200px] h-full">
        <header className="h-[60px] border-b border-black/10">
          <div className="h-full w-full px-6 flex items-center justify-end">
            <UserButton />
          </div>
        </header>
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
