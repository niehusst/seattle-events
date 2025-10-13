import { FC, useState } from 'react';

interface IEventFilter {
  category?: string;
  location?: string;
  searchQuery?: string;
  dateRange?: {
    after?: string;
    before?: string;
  };
}

interface EventFiltersProps {
  onFilter: (filters: IEventFilter) => void;
}

const EventFilters: FC<EventFiltersProps> = ({ onFilter }) => {
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilter = () => {
    const filters = {
      category: category || undefined,
      location: location || undefined,
      searchQuery: searchQuery || undefined,
      dateRange:
        startDate || endDate
          ? {
              after: startDate || undefined,
              before: endDate || undefined,
            }
          : undefined,
    };

    onFilter(filters);
  };

  const handleReset = () => {
    setCategory('');
    setLocation('');
    setStartDate('');
    setEndDate('');
    setSearchQuery('');

    onFilter({});
  };

  return (
    <div className="event-filters">
      <h3>Filter Events</h3>

      <div className="filter-group">
        <label htmlFor="search">Search:</label>
        <input
          id="search"
          type="text"
          placeholder="Search by title or description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="category">Category:</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="concert">Concert</option>
          <option value="festival">Festival</option>
          <option value="workshop">Workshop</option>
          <option value="theatre">Theatre</option>
          <option value="visual-arts">Visual Arts</option>
          <option value="lectures">Lectures</option>
          <option value="museums">Museums</option>
          <option value="film">Film</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="location">Location:</label>
        <input
          id="location"
          type="text"
          placeholder="City, neighborhood, or venue"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="startDate">Start Date:</label>
        <input
          id="startDate"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="endDate">End Date:</label>
        <input
          id="endDate"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div className="filter-actions">
        <button onClick={handleFilter} className="btn btn-primary">
          Apply Filters
        </button>
        <button onClick={handleReset} className="btn btn-secondary">
          Reset
        </button>
      </div>
    </div>
  );
};

export default EventFilters;
