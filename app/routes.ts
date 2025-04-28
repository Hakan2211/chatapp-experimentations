import {
  type RouteConfig,
  index,
  route,
  layout,
} from '@react-router/dev/routes';

export default [
  index('./routes/home.tsx'),
  layout('./routes/dashboard/layout.tsx', [
    route('dashboard', './routes/dashboard/index.tsx'),
    route('projects', './routes/dashboard/projects.tsx', [
      //index('./routes/dashboard/projects.editor.tsx'),
      route('editor', './routes/dashboard/projects.editor.tsx'),
      route('summary', './routes/dashboard/projects.summary.tsx'),
      route('notes', './routes/dashboard/projects.notes.tsx'),
    ]),
    route('projects/:projectId', './routes/dashboard/project-details.tsx'),
    route('notes', './routes/dashboard/notes.tsx'),
    route('education', './routes/dashboard/education.tsx'),
  ]),
] satisfies RouteConfig;
