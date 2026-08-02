import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const navItems = [
  { to: '/', label: 'Overview', exact: true },
  { to: '/activities', label: 'Activities' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Users' },
  { to: '/workouts', label: 'Workouts' },
];

function Home() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const apiHost = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api';

  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="p-4 mb-3 bg-light rounded-3 border">
          <div className="d-flex flex-column flex-md-row justify-content-between gap-3 align-items-md-center">
            <div>
              <h1 className="display-6 fw-bold mb-2">OctoFit Tracker</h1>
              <p className="text-muted mb-0">
                A React 19 presentation tier for the multi-tier fitness app, connected to the backend API.
              </p>
            </div>
            <div className="text-muted small">
              Environment note: define VITE_CODESPACE_NAME in .env.local for Codespaces deployments.
              <br />
              Active API base: <span className="fw-semibold">{apiHost}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <Leaderboard />
      </div>
      <div className="col-lg-6">
        <Activities />
      </div>
    </div>
  );
}

function App() {
  return (
    <main className="container py-4 py-md-5">
      <nav className="navbar navbar-expand-lg navbar-light bg-white border rounded-pill px-3 mb-4 shadow-sm">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold">OctoFit</span>
          <div className="navbar-nav flex-row flex-wrap gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                className={({ isActive }) => `nav-link rounded-pill px-3 ${isActive ? 'bg-primary text-white' : 'text-dark'}`}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </main>
  );
}

export default App;
