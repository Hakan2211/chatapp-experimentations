import { TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip';
import { Button } from '#/components/button';
import { Tooltip } from '@radix-ui/react-tooltip';
import { ResizableHandle, ResizablePanel } from '#/components/ui/resizable';
import { ResizablePanelGroup } from '#/components/ui/resizable';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router';
import { ChevronRight, ChevronLeft, Columns2Icon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  ImperativePanelHandle,
  PanelGroupOnLayout,
} from 'react-resizable-panels';
import type { ImperativePanelGroupHandle } from 'react-resizable-panels';
import { useIsMobile } from '#/hooks/use-mobile';
import Chat from '#/components/chat';
import {
  Breadcrumb,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbLink,
  BreadcrumbItem,
  BreadcrumbList,
} from '#/components/breadcrumb';
import { cn } from '#/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs';

const DEFAULT_LAYOUT = [67, 33];
const COLLAPSED_SIZE = 0;
const MIN_PANEL_SIZE_DRAG = 5;
const COLLAPSE_THRESHOLD = 1;

export default function Projects() {
  const panelGroupRef = useRef<ImperativePanelGroupHandle>(null);
  const firstPanelRef = useRef<ImperativePanelHandle>(null);
  const secondPanelRef = useRef<ImperativePanelHandle>(null);
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const [layout, setLayout] = useState<number[]>(DEFAULT_LAYOUT);

  // Determine active tab based on route
  const getActiveTab = () => {
    const path = location.pathname.split('/').pop();
    if (path === 'editor' || path === 'summary' || path === 'notes') {
      return path;
    }
    return 'chat';
  };

  const [activeTab, setActiveTab] = useState<string>(getActiveTab());

  // Sync active tab with route changes
  useEffect(() => {
    setActiveTab(getActiveTab());
  }, [location.pathname]);

  const handleLayout: PanelGroupOnLayout = (sizes: number[]) => {
    setLayout(sizes);
  };

  const resetLayout = useCallback(() => {
    firstPanelRef.current?.expand();
    secondPanelRef.current?.expand();
    panelGroupRef.current?.setLayout(DEFAULT_LAYOUT);
  }, []);

  const isDefaultLayout =
    layout.length === 2 &&
    Math.abs(layout[0] - DEFAULT_LAYOUT[0]) < 1 &&
    Math.abs(layout[1] - DEFAULT_LAYOUT[1]) < 1;

  const isFirstPanelCollapsed = layout[0] < COLLAPSE_THRESHOLD;
  const isSecondPanelCollapsed = layout[1] < COLLAPSE_THRESHOLD;

  useEffect(() => {
    if (!isMobile) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.ctrlKey || event.metaKey) {
          let handled = false;
          switch (event.key.toLowerCase()) {
            case 'arrowleft':
              if (secondPanelRef.current && !isSecondPanelCollapsed) {
                secondPanelRef.current.collapse();
                handled = true;
              }
              break;
            case 'arrowright':
              if (firstPanelRef.current && !isFirstPanelCollapsed) {
                firstPanelRef.current.collapse();
                handled = true;
              }
              break;
            case 'r':
              resetLayout();
              handled = true;
              break;
          }
          if (handled) event.preventDefault();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [
    isMobile,
    resetLayout,
    layout,
    isFirstPanelCollapsed,
    isSecondPanelCollapsed,
  ]);

  // Handle tab change and navigate to corresponding route
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'chat') {
      navigate(''); // Navigate to base path for Chat
    } else {
      navigate(value); // Navigate to editor, summary, or notes
    }
  };

  return (
    <div className="flex flex-1 h-full w-full">
      <ResizablePanelGroup
        ref={panelGroupRef}
        direction="horizontal"
        className="relative flex-1 rounded-lg border border-gray-200/80 dark:border-gray-800/80 bg-background dark:bg-background"
        onLayout={handleLayout}
        autoSaveId="dashboard-layout"
      >
        {/* --- First Panel --- */}
        <ResizablePanel
          ref={firstPanelRef}
          order={1}
          defaultSize={isMobile ? 100 : DEFAULT_LAYOUT[0]}
          minSize={MIN_PANEL_SIZE_DRAG}
          collapsible={true}
          collapsedSize={COLLAPSED_SIZE}
          className="flex flex-col !overflow-auto"
        >
          {!isFirstPanelCollapsed && (
            <motion.div
              key="panel1-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col h-full"
            >
              <PanelHeader>
                {!isMobile && (
                  <PanelHeader.Actions>
                    <Breadcrumb>
                      <BreadcrumbList className="sm:gap-1.5">
                        <BreadcrumbItem>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            <BreadcrumbLink href="#">Playground</BreadcrumbLink>
                          </motion.div>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>Chat</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </PanelHeader.Actions>
                )}
                <PanelHeader.Title></PanelHeader.Title>
              </PanelHeader>
              <div className="flex-1 lg:p-3 flex flex-col">
                {isMobile ? (
                  <Tabs
                    value={activeTab}
                    onValueChange={handleTabChange}
                    className="h-full flex flex-col"
                  >
                    <TabsList
                      className={cn(
                        'grid grid-cols-4 w-full h-8 bg-gray-100/50 dark:bg-gray-900/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-lg p-1',
                        'mb-2'
                      )}
                    >
                      <TabsTrigger
                        value="chat"
                        className={cn(
                          'h-6 text-xs font-medium tracking-wide',
                          'data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/10 data-[state=active]:to-purple-500/10',
                          'data-[state=active]:text-foreground data-[state=active]:shadow-sm data-[state=active]:ring-1 data-[state=active]:ring-blue-500/20',
                          'text-gray-900 dark:text-gray-200 hover:bg-white/30 dark:hover:bg-gray-700/30 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:scale-105',
                          'transition-all duration-200 ease-out'
                        )}
                      >
                        Chat
                      </TabsTrigger>
                      <TabsTrigger
                        value="editor"
                        className={cn(
                          'h-6 text-xs font-medium tracking-wide',
                          'data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/10 data-[state=active]:to-purple-500/10',
                          'data-[state=active]:text-foreground data-[state=active]:shadow-sm data-[state=active]:ring-1 data-[state=active]:ring-blue-500/20',
                          'text-gray-900 dark:text-gray-200 hover:bg-white/30 dark:hover:bg-gray-700/30 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:scale-105',
                          'transition-all duration-200 ease-out'
                        )}
                      >
                        Editor
                      </TabsTrigger>
                      <TabsTrigger
                        value="summary"
                        className={cn(
                          'h-6 text-xs font-medium tracking-wide',
                          'data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/10 data-[state=active]:to-purple-500/10',
                          'data-[state=active]:text-foreground data-[state=active]:shadow-sm data-[state=active]:ring-1 data-[state=active]:ring-blue-500/20',
                          'text-gray-900 dark:text-gray-200 hover:bg-white/30 dark:hover:bg-gray-700/30 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:scale-105',
                          'transition-all duration-200 ease-out'
                        )}
                      >
                        Summary
                      </TabsTrigger>
                      <TabsTrigger
                        value="notes"
                        className={cn(
                          'h-6 text-xs font-medium tracking-wide',
                          'data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/10 data-[state=active]:to-purple-500/10',
                          'data-[state=active]:text-foreground data-[state=active]:shadow-sm data-[state=active]:ring-1 data-[state=active]:ring-blue-500/20',
                          'text-gray-900 dark:text-gray-200 hover:bg-white/30 dark:hover:bg-gray-700/30 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:scale-105',
                          'transition-all duration-200 ease-out'
                        )}
                      >
                        Notes
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="chat" className="flex-1 m-0">
                      <Chat />
                    </TabsContent>
                    <TabsContent value="editor" className="flex-1 m-0">
                      <Outlet />
                    </TabsContent>
                    <TabsContent value="summary" className="flex-1 m-0">
                      <Outlet />
                    </TabsContent>
                    <TabsContent value="notes" className="flex-1 m-0">
                      <Outlet />
                    </TabsContent>
                  </Tabs>
                ) : (
                  <Chat />
                )}
              </div>
            </motion.div>
          )}
        </ResizablePanel>

        {/* --- Handle Section --- */}
        {!isMobile && (
          <>
            {isFirstPanelCollapsed ? (
              <ResizableHandle className="indicator-handle group left">
                <ChevronRight className="indicator-icon" />
              </ResizableHandle>
            ) : isSecondPanelCollapsed ? (
              <ResizableHandle className="indicator-handle group right">
                <ChevronLeft className="indicator-icon" />
              </ResizableHandle>
            ) : (
              <ResizableHandle
                onDoubleClick={resetLayout}
                className="main-handle group"
              />
            )}
          </>
        )}

        {/* --- Second Panel --- */}
        {!isMobile && (
          <ResizablePanel
            ref={secondPanelRef}
            order={2}
            defaultSize={DEFAULT_LAYOUT[1]}
            minSize={MIN_PANEL_SIZE_DRAG}
            collapsible={true}
            collapsedSize={COLLAPSED_SIZE}
            className="flex flex-col !overflow-auto"
          >
            {!isSecondPanelCollapsed && (
              <motion.div
                key="panel2-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col h-full"
              >
                <PanelHeader>
                  <PanelHeader.Actions>
                    <nav
                      className={cn(
                        'inline-flex h-10 gap-2 w-fit items-center justify-center rounded-xl p-1',
                        'bg-gray-100/50 dark:bg-gray-900/70',
                        'backdrop-blur-sm shadow-sm',
                        'border border-white/30 dark:border-gray-700/30'
                      )}
                    >
                      <NavLink
                        to="editor"
                        className={({ isActive }) =>
                          cn(
                            'inline-flex h-8 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5',
                            'text-sm font-medium tracking-wide whitespace-nowrap',
                            'transition-all duration-200 ease-out',
                            isActive
                              ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-foreground shadow-sm ring-1 ring-blue-500/20'
                              : 'text-gray-900 dark:text-gray-200 hover:bg-white/30 dark:hover:bg-gray-700/30 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:scale-105',
                            'focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
                            'disabled:pointer-events-none disabled:opacity-50'
                          )
                        }
                      >
                        Editor
                      </NavLink>
                      <NavLink
                        to="summary"
                        className={({ isActive }) =>
                          cn(
                            'inline-flex h-8 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5',
                            'text-sm font-medium tracking-wide whitespace-nowrap',
                            'transition-all duration-200 ease-out',
                            isActive
                              ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-foreground shadow-sm ring-1 ring-blue-500/20'
                              : 'text-gray-900 dark:text-gray-200 hover:bg-white/30 dark:hover:bg-gray-700/30 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:scale-105',
                            'focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
                            'disabled:pointer-events-none disabled:opacity-50'
                          )
                        }
                      >
                        Summary
                      </NavLink>
                      <NavLink
                        to="notes"
                        className={({ isActive }) =>
                          cn(
                            'inline-flex h-8 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5',
                            'text-sm font-medium tracking-wide whitespace-nowrap',
                            'transition-all duration-200 ease-out',
                            isActive
                              ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-foreground shadow-sm ring-1 ring-blue-500/20'
                              : 'text-gray-900 dark:text-gray-200 hover:bg-white/30 dark:hover:bg-gray-700/30 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:scale-105',
                            'focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
                            'disabled:pointer-events-none disabled:opacity-50'
                          )
                        }
                      >
                        Notes
                      </NavLink>
                    </nav>
                  </PanelHeader.Actions>
                  <PanelHeader.Actions>
                    {!isDefaultLayout && (
                      <HeaderButton
                        tooltip="Reset Layout (Ctrl+R)"
                        onClick={resetLayout}
                        aria-label="Reset column layout"
                      >
                        <Columns2Icon className="h-4 w-4" />
                      </HeaderButton>
                    )}
                  </PanelHeader.Actions>
                </PanelHeader>
                <div className="flex-1 p-4 lg:p-5">
                  <Outlet />
                </div>
              </motion.div>
            )}
          </ResizablePanel>
        )}
      </ResizablePanelGroup>
    </div>
  );
}

// PanelHeader and HeaderButton components
interface PanelHeaderProps extends React.PropsWithChildren<{}> {
  className?: string;
}

interface TitleProps extends React.PropsWithChildren<{}> {
  className?: string;
}

interface ActionsProps extends React.PropsWithChildren<{}> {
  className?: string;
}

const Title: React.FC<TitleProps> = ({ children, className }) => {
  return (
    <span
      className={cn(
        'font-medium text-sm text-gray-700 dark:text-gray-300 truncate',
        className
      )}
    >
      {children}
    </span>
  );
};

const Actions: React.FC<ActionsProps> = ({ children, className }) => {
  return (
    <div className={cn('flex items-center space-x-1 min-h-[28px]', className)}>
      {children}
    </div>
  );
};

const PanelHeaderRoot: React.FC<PanelHeaderProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between',
        'px-4 py-2 border-b border-gray-200/60 dark:border-gray-800/60',
        'sticky top-0 bg-background/80 dark:bg-background/90 backdrop-blur-sm z-10',
        className
      )}
    >
      {children}
    </div>
  );
};

type PanelHeaderComponent = React.FC<PanelHeaderProps> & {
  Title: React.FC<TitleProps>;
  Actions: React.FC<ActionsProps>;
};

const PanelHeader = PanelHeaderRoot as PanelHeaderComponent;
PanelHeader.Title = Title;
PanelHeader.Actions = Actions;

interface HeaderButtonProps extends React.ComponentProps<typeof Button> {
  tooltip: string;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({
  tooltip,
  children,
  ...props
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-gray-500 dark:text-gray-400 hover:bg-gray-200/80 dark:hover:bg-gray-800/80 disabled:opacity-40"
        {...props}
      >
        {children}
      </Button>
    </TooltipTrigger>
    <TooltipContent side="bottom" className="text-xs px-2 py-1">
      <p>{tooltip}</p>
    </TooltipContent>
  </Tooltip>
);

export { PanelHeader };
