'use client';

import * as React from 'react';
import { House, Origami, BriefcaseBusiness, ChartPie } from 'lucide-react';
import { NavMain } from '@/components/sidebar/nav-main';
import { NavUser } from '@/components/sidebar/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: House,
    },
    {
      title: 'Applications',
      url: '#',
      icon: BriefcaseBusiness,
      isActive: true,
      items: [
        {
          title: 'Manage job applications',
          url: '#',
        },
        {
          title: 'Add new application',
          url: '#',
        },
        {
          title: 'Followups',
          url: '#',
        },
      ],
    },
    {
      title: 'Analytics',
      url: '#',
      icon: ChartPie,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="pointer-events-none">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sky-600 text-sidebar-primary-foreground">
                <Origami className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Heron</span>
                <span className="truncate text-xs text-gray-500">
                  Job Application Tracker
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
