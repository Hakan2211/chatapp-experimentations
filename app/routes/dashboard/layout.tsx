import { AppSidebar } from '#/components/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '#/components/sidebar';

import { SettingsPanelProvider } from '#/components/settings-panel';

import { Outlet } from 'react-router';

// Import the mock data and types
import {
  mockProjectFiles,
  type MockProjectFilesData,
  type ProjectFileTreeItem, // If needed explicitly
} from '#/mockData/mockData'; // Adjust path if necessary
import { mockNotes, type Note } from '#/components/sidebarUI/sidebarPanels'; // Assuming notes mock is here or import separately

export type SidebarData = {
  projects: MockProjectFilesData; // <-- Use the nested data type
  notes: Note[]; // <-- Keep using Note[]
};

export async function loader() {
  // --- Return mock data directly ---
  // const [projectsResponse, notesResponse] = await Promise.all([
  //   fetch('http://localhost:3001/projects'),
  //   fetch('http://localhost:3001/notes'),
  // ]);
  // if (!projectsResponse.ok || !notesResponse.ok)
  //   throw new Error('Failed to load sidebar data');
  // const projects = await projectsResponse.json();
  // const notes = await notesResponse.json();

  // Use imported mock data
  const projects = mockProjectFiles;
  const notes = mockNotes; // Assuming mockNotes exists and is imported

  return { projects, notes };
  // --- End mock data ---
}

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
          <div className="flex h-[calc(100svh-4rem)] bg-background md:rounded-lg md:group-peer-data-[state=collapsed]/sidebar-inset:rounded-s-none transition-all ease-in-out duration-300">
            <Outlet />
          </div>
        </SettingsPanelProvider>
      </SidebarInset>
    </SidebarProvider>
  );
}
