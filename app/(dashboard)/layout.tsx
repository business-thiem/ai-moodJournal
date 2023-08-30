import SideNav from '@/components/SideNav';
import { UserButton } from '@clerk/nextjs';

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen relative ">
      <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-black/10">
        <div className="border-solid border-b border-black/10">
          Mood Journal
        </div>
        <ul className="grid grid-cols-1 gap-1">
          <SideNav />
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
