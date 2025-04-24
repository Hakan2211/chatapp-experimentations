import { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '#/components/sidebar';

import { Link } from 'react-router';
import UserDropdown from './user-dropdown';
import { LayoutGrid, Plus, FileText, Home, GraduationCap } from 'lucide-react';

import { Button } from './button';

import {
  AccountPanelContent,
  EducationPanelContent,
  HomePanelContent,
  NotesPanelContent,
  ProjectsPanelContent,
} from './sidebarUI/sidebarPanels';

enum PanelType {
  Account = 'account',
  Home = 'home',
  Projects = 'projects',
  Notes = 'notes',
  Education = 'education',
}
const iconSize = 'h-5 w-5';

// Define a type for the icon bar items
type IconBarItem = {
  type: PanelType;
  label: string;
  icon: React.ReactElement; // Type as React Element
  path?: string; // Path can be optional
};

const iconBarIcons: IconBarItem[] = [
  // Apply the type
  {
    type: PanelType.Home,
    label: 'Home',
    icon: <Home className={iconSize} />,
    path: '/dashboard',
  },
  {
    type: PanelType.Projects,
    label: 'Projects',
    icon: <LayoutGrid className={iconSize} />,
    path: '/projects',
  },
  {
    type: PanelType.Notes,
    label: 'Notes',
    icon: <FileText className={iconSize} />,
    path: '/notes',
  },
  {
    type: PanelType.Education,
    label: 'Education',
    icon: <GraduationCap className={iconSize} />,
    path: '/education',
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeItem, setActiveItem] = useState<IconBarItem | null>(
    iconBarIcons[0] ?? null
  );

  const { setOpen } = useSidebar();
  const [selectedPanel, setSelectedPanel] = useState<PanelType>(PanelType.Home);

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row border-[var(--sidebar-border-color)]"
      {...props}
    >
      <Sidebar
        collapsible="none"
        className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r border-[var(--sidebar-border-color)]"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <UserDropdown />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Acme Inc</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {iconBarIcons.map((item) => {
                  return (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton
                        tooltip={{
                          children: item.label,
                          hidden: false,
                        }}
                        onClick={() => {
                          setActiveItem(item);
                          setSelectedPanel(item.type);
                          setOpen(true);
                        }}
                        isActive={activeItem?.type === item.type}
                        className="px-2.5 md:px-2"
                      >
                        <Link to={item.path ?? '#'}>{item.icon}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>User</SidebarFooter>
      </Sidebar>

      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b border-[var(--sidebar-border-color)] p-4">
          <div className="flex w-full items-center justify-between">
            {/* Dynamic Title Based on Panel */}
            <span className="font-medium text-base capitalize">
              {selectedPanel === 'home' && 'Home'}
              {selectedPanel === 'projects' && 'Projects'}
              {selectedPanel === 'notes' && 'Notes'}
              {selectedPanel === 'education' && 'Education Hub'}
              {selectedPanel === 'account' && 'Account'}
            </span>
            {/* Optional: Add context-specific action button to header */}
            {selectedPanel === 'projects' && (
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7"
                onClick={() => console.log('New Project Header')}
              >
                {' '}
                <Plus className="h-4 w-4" />{' '}
              </Button>
            )}
            {selectedPanel === 'notes' && (
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7"
                onClick={() => console.log('New Note Header')}
              >
                <Plus className="h-4 w-4" />{' '}
              </Button>
            )}
          </div>
          {/* <SidebarInput placeholder="Type to search..." /> */}
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            {selectedPanel === 'home' && <HomePanelContent />}
            {selectedPanel === 'projects' && <ProjectsPanelContent />}
            {selectedPanel === 'notes' && <NotesPanelContent />}
            {selectedPanel === 'education' && <EducationPanelContent />}
            {selectedPanel === 'account' && <AccountPanelContent />}
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
