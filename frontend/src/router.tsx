import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import EventDetail from './components/EventDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/event/:id',
    element: <EventDetail />,
  },
]);
