import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Reflecta, {user?.name || 'User'}
          </h1>
          <p className="text-lg text-gray-600">
            Your personal space to reflect, organize, and document your thoughts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="card hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Entries</h2>
            <p className="text-gray-600 mb-4">
              Continue where you left off or review your latest reflections.
            </p>
            <Link to="/entries" className="btn btn-primary inline-block">
              View entries
            </Link>
          </div>

          <div className="card hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-4">New Entry</h2>
            <p className="text-gray-600 mb-4">
              Capture your thoughts, ideas, or experiences of the day.
            </p>
            <Link to="/entries/new" className="btn btn-primary inline-block">
              Create entry
            </Link>
          </div>
        </div>

        <div className="card hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-4">Journal Tips</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Write regularly, even if it's just a few minutes a day</li>
            <li>Use tags to organize your entries by topics or projects</li>
            <li>Reflect on your achievements and learnings</li>
            <li>Set goals and review your progress periodically</li>
            <li>Export your important entries to keep them in other formats</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 