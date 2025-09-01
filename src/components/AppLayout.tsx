'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  ListTodo,
  BookOpen,
  Archive,
  Leaf,
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '#', label: 'Shopping List', icon: ListTodo },
  { href: '#', label: 'Recipes', icon: BookOpen },
  { href: '#', label: 'Pantry', icon: Archive },
];

const pageTitles: { [key: string]: string } = {
  '/': 'Dashboard',
  // Add other page titles here as they are created
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar>
        <SidebarHeader className="p-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-2xl font-bold font-headline"
          >
            <Leaf className="h-7 w-7 text-primary" />
            <span className="group-data-[collapsible=icon]:hidden">ListWise</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <Link href={item.href} passHref legacyBehavior>
                  <SidebarMenuButton
                    as="a"
                    isActive={pathname === item.href}
                    tooltip={item.label}
                    className={
                      item.href === '#' ? 'cursor-not-allowed opacity-50' : ''
                    }
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6 md:justify-start">
          <SidebarTrigger className="md:hidden" />
          <h1 className="hidden text-xl font-semibold md:block">
            {pageTitles[pathname] || 'ListWise'}
          </h1>
        </header>
        <main className="p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
