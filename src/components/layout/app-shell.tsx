'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, History, Pill, Search, Menu } from 'lucide-react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const navItems = [
    { href: '/', label: 'Identify', icon: Home },
    { href: '/history', label: 'History', icon: History },
  ];

  const renderNav = () => (
    <>
      <div className="flex items-center gap-2 p-4">
        <Pill className="h-8 w-8 text-primary" />
        <h1 className="font-headline text-xl font-bold">PillSnap</h1>
      </div>
      <div className="relative p-4">
        <Search className="absolute left-7 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search medicine..." className="pl-8" />
      </div>
      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href} className="w-full">
              <SidebarMenuButton isActive={pathname === item.href}>
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </>
  );

  if (isMobile) {
    return (
      <div>
        <header className="flex h-16 items-center justify-between border-b bg-background px-4">
          <Link href="/" className="flex items-center gap-2">
            <Pill className="h-8 w-8 text-primary" />
            <span className="font-headline text-xl font-bold">PillSnap</span>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0">
              <nav className="flex flex-col">{renderNav()}</nav>
            </SheetContent>
          </Sheet>
        </header>
        <main>{children}</main>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>{renderNav()}</SidebarContent>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
