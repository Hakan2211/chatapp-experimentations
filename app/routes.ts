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
    route('projects', './routes/dashboard/projects.tsx'),
    route('notes', './routes/dashboard/notes.tsx'),
  ]),
] satisfies RouteConfig;
