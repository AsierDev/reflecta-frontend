import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Layouts
import MainLayout from './components/layout/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import EntriesPage from './pages/EntriesPage';
import NotFoundPage from './pages/NotFoundPage';

// TODO:
// import RegisterPage from './pages/RegisterPage';
// import EntryDetailPage from './pages/EntryDetailPage';
// import CreateEntryPage from './pages/CreateEntryPage';
// import EditEntryPage from './pages/EditEntryPage';
// import ProfilePage from './pages/ProfilePage';

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/register" element={<RegisterPage />} /> */}
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/entries" element={<EntriesPage />} />
                {/* <Route path="/entries/:id" element={<EntryDetailPage />} /> */}
                {/* <Route path="/entries/new" element={<CreateEntryPage />} /> */}
                {/* <Route path="/entries/:id/edit" element={<EditEntryPage />} /> */}
                {/* <Route path="/profile" element={<ProfilePage />} /> */}
              </Route>
            </Route>
            
            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
