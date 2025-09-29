import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import EventDetail from './components/EventDetail';
import EventsReverseChronological from './pages/EventsReverseChronological';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/event/:id',
        element: <EventDetail />,
      },
      {
        path: '/events-reverse-chronological',
        element: <EventsReverseChronological />,
      },
    ],
  },
]);