'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { SidebarTrigger } from '../ui/sidebar';

export default function Navbar() {
  const handleLogout = () => {
    signOut({
      callbackUrl: '/', // Redirect ke halaman setelah logout
    });
  };
  return (
    <header className="bg-slate-200">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/assets/pattern/configPattern.svg)`,
          backgroundRepeat: 'repeat',
          backgroundSize: '8rem 8rem',
          opacity: 0.05, // Sesuaikan opacity sesuai kebutuhan
          zIndex: 0,
        }}
      />
      <div className="p-4 flex h-20 w-full shrink-0 items-center bg-white rounded-md ">
        <div className="md:hidden relative z-50">
          <SidebarTrigger />
        </div>
        <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="ml-auto flex gap-6 relative z-50">
          <Button
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-red-500 text-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </nav>
      </div>
    </header>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
