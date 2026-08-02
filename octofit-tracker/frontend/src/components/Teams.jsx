import { useEffect, useState } from 'react';

function Teams() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
  const apiEndpoint = `${apiBaseUrl}/api/teams/`;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadTeams() {
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          throw new Error('Unable to fetch teams');
        }

        const payload = await response.json();
        const resolvedItems = Array.isArray(payload)
          ? payload
          : payload?.results || payload?.items || payload?.data || [];
        if (isMounted) {
          setItems(resolvedItems);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load teams');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadTeams();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="h4 mb-1">Teams</h2>
            <p className="text-muted mb-0">Competition teams and their rosters.</p>
          </div>
          <span className="badge bg-info-subtle text-info">Roster</span>
        </div>

        {loading && <p className="text-muted">Loading teams…</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="row g-3">
            {items.length === 0 ? (
              <div className="col-12">
                <div className="alert alert-light">No teams found.</div>
              </div>
            ) : (
              items.map((team) => (
                <div className="col-md-6" key={team._id || team.id}>
                  <div className="border rounded p-3 h-100">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h3 className="h6 mb-0">{team.name || 'Team'}</h3>
                      <span className="badge" style={{ backgroundColor: team.color || '#0d6efd' }}>
                        {team.sport || 'sport'}
                      </span>
                    </div>
                    <p className="text-muted small mb-2">Coach: {team.coach || 'TBD'}</p>
                    <p className="small mb-0">Members: {Array.isArray(team.members) ? team.members.length : 0}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Teams;
