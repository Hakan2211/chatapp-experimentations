import * as React from 'react';

import { TeamSwitcher } from '#/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '#/components/sidebar';
import {
  RiChat1Line,
  RiBardLine,
  RiMickeyLine,
  RiMicLine,
  RiCheckDoubleLine,
  RiBracesLine,
  RiPlanetLine,
  RiSeedlingLine,
  RiSettings3Line,
} from '@remixicon/react';
import { Link } from 'react-router';
import UserDropdown from './user-dropdown';
import { TooltipTrigger } from './tooltip';
import { TooltipContent } from './tooltip';
import { Tooltip } from './tooltip';
import {
  ArchiveX,
  Command,
  Inbox,
  LayoutGrid,
  Send,
  Trash2,
} from 'lucide-react';
import { FileText } from 'lucide-react';
import { GraduationCap } from 'lucide-react';
import { Home } from 'lucide-react';
import { cn } from '#/lib/utils';
// This is sample data.
const data2 = {
  teams: [
    {
      name: 'ArkDigital',
      logo: 'https://res.cloudinary.com/dlzlfasou/image/upload/v1741345635/logo-01_upxvqe.png',
    },
    {
      name: 'Acme Corp.',
      logo: 'https://res.cloudinary.com/dlzlfasou/image/upload/v1741345635/logo-01_upxvqe.png',
    },
    {
      name: 'Evil Corp.',
      logo: 'https://res.cloudinary.com/dlzlfasou/image/upload/v1741345635/logo-01_upxvqe.png',
    },
  ],
  navMain: [
    {
      title: 'Playground',
      url: '#',
      items: [
        {
          title: 'Projects',
          url: '/projects',
          icon: RiChat1Line,
          isActive: true,
        },
        {
          title: 'Notes',
          url: '/notes',
          icon: RiBardLine,
        },
        {
          title: 'Home',
          url: '/dashboard',
          icon: RiMickeyLine,
        },
        {
          title: 'Audio',
          url: '#',
          icon: RiMicLine,
        },
        {
          title: 'Metrics',
          url: '#',
          icon: RiCheckDoubleLine,
        },
        {
          title: 'Documentation',
          url: '#',
          icon: RiBracesLine,
        },
      ],
    },
    {
      title: 'More',
      url: '#',
      items: [
        {
          title: 'Community',
          url: '#',
          icon: RiPlanetLine,
        },
        {
          title: 'Help Centre',
          url: '#',
          icon: RiSeedlingLine,
        },
        {
          title: 'Settings',
          url: '#',
          icon: RiSettings3Line,
        },
      ],
    },
  ],
};

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

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Inbox',
      url: '#',
      icon: Inbox,
      isActive: true,
    },
    {
      title: 'Drafts',
      url: '#',
      icon: FileText,
      isActive: false,
    },
    {
      title: 'Sent',
      url: '#',
      icon: Send,
      isActive: false,
    },
    {
      title: 'Junk',
      url: '#',
      icon: ArchiveX,
      isActive: false,
    },
    {
      title: 'Trash',
      url: '#',
      icon: Trash2,
      isActive: false,
    },
  ],
  mails: [
    {
      name: 'William Smith',
      email: 'williamsmith@example.com',
      subject: 'Meeting Tomorrow',
      date: '09:34 AM',
      teaser:
        'Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.',
    },
    {
      name: 'Alice Smith',
      email: 'alicesmith@example.com',
      subject: 'Re: Project Update',
      date: 'Yesterday',
      teaser:
        "Thanks for the update. The progress looks great so far.\nLet's schedule a call to discuss the next steps.",
    },
    {
      name: 'Bob Johnson',
      email: 'bobjohnson@example.com',
      subject: 'Weekend Plans',
      date: '2 days ago',
      teaser:
        "Hey everyone! I'm thinking of organizing a team outing this weekend.\nWould you be interested in a hiking trip or a beach day?",
    },
    {
      name: 'Emily Davis',
      email: 'emilydavis@example.com',
      subject: 'Re: Question about Budget',
      date: '2 days ago',
      teaser:
        "I've reviewed the budget numbers you sent over.\nCan we set up a quick call to discuss some potential adjustments?",
    },
    {
      name: 'Michael Wilson',
      email: 'michaelwilson@example.com',
      subject: 'Important Announcement',
      date: '1 week ago',
      teaser:
        "Please join us for an all-hands meeting this Friday at 3 PM.\nWe have some exciting news to share about the company's future.",
    },
    {
      name: 'Sarah Brown',
      email: 'sarahbrown@example.com',
      subject: 'Re: Feedback on Proposal',
      date: '1 week ago',
      teaser:
        "Thank you for sending over the proposal. I've reviewed it and have some thoughts.\nCould we schedule a meeting to discuss my feedback in detail?",
    },
    {
      name: 'David Lee',
      email: 'davidlee@example.com',
      subject: 'New Project Idea',
      date: '1 week ago',
      teaser:
        "I've been brainstorming and came up with an interesting project concept.\nDo you have time this week to discuss its potential impact and feasibility?",
    },
    {
      name: 'Olivia Wilson',
      email: 'oliviawilson@example.com',
      subject: 'Vacation Plans',
      date: '1 week ago',
      teaser:
        "Just a heads up that I'll be taking a two-week vacation next month.\nI'll make sure all my projects are up to date before I leave.",
    },
    {
      name: 'James Martin',
      email: 'jamesmartin@example.com',
      subject: 'Re: Conference Registration',
      date: '1 week ago',
      teaser:
        "I've completed the registration for the upcoming tech conference.\nLet me know if you need any additional information from my end.",
    },
    {
      name: 'Sophia White',
      email: 'sophiawhite@example.com',
      subject: 'Team Dinner',
      date: '1 week ago',
      teaser:
        "To celebrate our recent project success, I'd like to organize a team dinner.\nAre you available next Friday evening? Please let me know your preferences.",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeItem, setActiveItem] = React.useState<IconBarItem | null>(
    iconBarIcons[0] ?? null
  );
  const [mails, setMails] = React.useState(data.mails);
  const { setOpen } = useSidebar();

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
                          const mail = data.mails.sort(
                            () => Math.random() - 0.5
                          );
                          setMails(
                            mail.slice(
                              0,
                              Math.max(5, Math.floor(Math.random() * 10) + 1)
                            )
                          );
                          setOpen(true);
                        }}
                        isActive={activeItem?.label === item.label}
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
            {/* <Label className="flex items-center gap-2 text-sm"> */}
            <span>More Information for the menu</span>
            {/* <Switch className="shadow-none" /> */}
            {/* </Label> */}
          </div>
          {/* <SidebarInput placeholder="Type to search..." /> */}
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            {/* <SidebarGroupContent>
              {mails.map((mail) => (
                <a
                  href="#"
                  key={mail.email}
                  className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <div className="flex w-full items-center gap-2">
                    <span>{mail.name}</span>{' '}
                    <span className="ml-auto text-xs">{mail.date}</span>
                  </div>
                  <span className="font-medium">{mail.subject}</span>
                  <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
                    {mail.teaser}
                  </span>
                </a>
              ))}
            </SidebarGroupContent> */}
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
