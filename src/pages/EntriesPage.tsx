import { useState } from 'react';
import { Link } from 'react-router-dom';

// Example data to display in the interface
const MOCK_ENTRIES = [
  {
    id: '1',
    title: 'My first entry',
    content: 'This is the content of my first diary entry...',
    createdAt: '2023-05-15T10:30:00Z',
    tags: [
      { id: '1', name: 'Personal', color: '#3B82F6' }
    ]
  },
  {
    id: '2',
    title: 'Reflections on the project',
    content: 'Today I was working on the new project and wanted to reflect on...',
    createdAt: '2023-05-14T15:45:00Z',
    tags: [
      { id: '2', name: 'Work', color: '#10B981' },
      { id: '3', name: 'Ideas', color: '#8B5CF6' }
    ]
  },
  {
    id: '3',
    title: 'Goals for next month',
    content: 'These are my goals for next month...',
    createdAt: '2023-05-13T09:15:00Z',
    tags: [
      { id: '2', name: 'Work', color: '#10B981' }
    ]
  }
];

const EntriesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // Filter entries based on criteria
  const filteredEntries = MOCK_ENTRIES.filter(entry => {
    // Filter by search term
    const matchesSearch = searchTerm === '' || 
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by tag
    const matchesTag = selectedTag === null || 
      entry.tags.some(tag => tag.id === selectedTag);
    
    return matchesSearch && matchesTag;
  });

  // Sort entries
  const sortedEntries = [...filteredEntries].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Entries</h1>
        <Link to="/entries/new" className="btn btn-primary">
          New Entry
        </Link>
      </div>

      {/* Filters and search */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
              </svg>
            </div>
            <input
              type="text"
              className="input pl-10 w-full"
              placeholder="Search entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <select
            className="input"
            value={selectedTag || ''}
            onChange={(e) => setSelectedTag(e.target.value || null)}
          >
            <option value="">All tags</option>
            <option value="1">Personal</option>
            <option value="2">Work</option>
            <option value="3">Ideas</option>
          </select>
          
          <button
            className="btn btn-secondary flex items-center"
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
          >
            <span className="mr-1">Sort</span>
            {sortOrder === 'desc' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Entry list */}
      {sortedEntries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No entries found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedEntries.map((entry) => (
            <div key={entry.id} className="card hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold mb-2">
                  <Link to={`/entries/${entry.id}`} className="hover:text-blue-600">
                    {entry.title}
                  </Link>
                </h2>
                <span className="text-sm text-gray-500">{formatDate(entry.createdAt)}</span>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-2">{entry.content}</p>
              
              <div className="flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-end mt-4 space-x-2">
                <Link
                  to={`/entries/${entry.id}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Read more
                </Link>
                <span className="text-gray-300">|</span>
                <Link
                  to={`/entries/${entry.id}/edit`}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EntriesPage; 