'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, History, Pill, Search, Menu, Loader2 } from 'lucide-react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

function NavContent() {
    const pathname = usePathname();
    const navItems = [
      { href: '/', label: 'Identify', icon: Home, tooltip: 'Identify' },
      { href: '/history', label: 'History', icon: History, tooltip: 'History' },
    ];
    return (
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
                            <SidebarMenuButton isActive={pathname === item.href} tooltip={item.tooltip}>
                                <item.icon />
                                <span>{item.label}</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </>
    );
}


function AppShellMobile({ children }: { children: React.ReactNode }) {
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
                        <SheetHeader className="p-4">
                            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                        </SheetHeader>
                        <nav className="flex flex-col">
                            <NavContent />
                        </nav>
                    </SheetContent>
                </Sheet>
            </header>
            <main>{children}</main>
        </div>
    );
}

function AppShellDesktop({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Sidebar>
                <SidebarHeader />
                <SidebarContent>
                    <NavContent />
                </SidebarContent>
            </Sidebar>
            <SidebarInset>{children}</SidebarInset>
        </div>
    );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  if (isMobile === undefined) {
      return (
        <div className="flex h-screen items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )
  }

  const Shell = isMobile ? AppShellMobile : AppShellDesktop;

  return (
    <SidebarProvider>
        <Shell>{children}</Shell>
    </SidebarProvider>
  );
}
