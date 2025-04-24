import { AppSidebar } from '#/components/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '#/components/sidebar';
import { SettingsPanelProvider } from '#/components/settings-panel';
import { Outlet } from 'react-router';

export default function DashboardLayout() {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '350px',
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset className="bg-sidebar group/sidebar-inset">
        <header className="sticky top-0 flex shrink-0 bg-sidebar p-3">
          <SidebarTrigger className="-ml-1 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" />
        </header>
        <SettingsPanelProvider>
          <div className="flex h-[calc(100svh-4rem)] bg-[hsl(240_5%_92.16%)] md:rounded-3xl md:group-peer-data-[state=collapsed]/sidebar-inset:rounded-s-none transition-all ease-in-out duration-300">
            <Outlet />
          </div>
        </SettingsPanelProvider>
      </SidebarInset>
    </SidebarProvider>
  );
}
