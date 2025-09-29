import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_EVENTS } from './services/EventService';
import EventList from './components/EventList';
import EventFilters from './components/EventFilters';
import { IEvent, IEventFilter } from './services/EventService';

const App: React.FC = () => {
  const [filters, setFilters] = useState<IEventFilter>({});
  
  const { loading, error, data, refetch } = useQuery(GET_EVENTS, {
    variables: { 
      filter: filters,
      limit: 20,
      offset: 0
    },
    // Don't automatically fetch until filters are applied (or for initial load)
    fetchPolicy: 'cache-and-network'
  });

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    // Refetch with new filters
    refetch({
      filter: newFilters,
      limit: 20,
      offset: 0
    });
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Seattle Events</h1>
        <p>Discover events happening in Seattle</p>
      </header>

      <main className="app-main">
        <aside className="filters-panel">
          <EventFilters onFilter={handleFilterChange} />
        </aside>

        <section className="events-section">
          <EventList 
            events={data?.events || []} 
            loading={loading}
            error={error?.message}
          />
        </section>
      </main>
    </div>
  );
};

export default App;