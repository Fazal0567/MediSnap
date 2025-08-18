
'use client';

import * as React from 'react';
import Link from 'next/link';
import { Pill } from 'lucide-react';

function Header() {
    return (
        <header className="flex h-16 items-center border-b bg-background px-4 md:px-6 shrink-0">
            <Link href="/" className="flex items-center gap-2">
                <Pill className="h-8 w-8 text-primary" />
                <span className="font-headline text-xl font-bold">PillSnap</span>
            </Link>
        </header>
    );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-4 md:p-8">
            {children}
        </div>
      </main>
    </div>
  );
}
