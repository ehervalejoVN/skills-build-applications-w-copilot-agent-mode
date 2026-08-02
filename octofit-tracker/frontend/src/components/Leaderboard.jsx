import { useEffect, useState } from 'react';

function Leaderboard() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
  const apiEndpoint = `${apiBaseUrl}/api/leaderboard/`;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadLeaderboard() {
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          throw new Error('Unable to fetch leaderboard');
        }

        const payload = await response.json();
        const resolvedItems = Array.isArray(payload)
          ? payload
          : payload?.results || payload?.items || payload?.data || [];
        if (isMounted) {
          setItems(resolvedItems.sort((a, b) => (b.points ?? 0) - (a.points ?? 0)));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load leaderboard');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadLeaderboard();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="h4 mb-1">Leaderboard</h2>
            <p className="text-muted mb-0">Top performers by points.</p>
          </div>
          <span className="badge bg-success-subtle text-success">Live</span>
        </div>

        {loading && <p className="text-muted">Loading leaderboard…</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="list-group">
            {items.length === 0 ? (
              <div className="list-group-item text-muted">No leaderboard entries yet.</div>
            ) : (
              items.map((user, index) => (
                <div className="list-group-item d-flex justify-content-between align-items-center" key={user._id || user.id}>
                  <div>
                    <div className="fw-semibold">#{index + 1} {user.fullName || user.username || 'User'}</div>
                    <div className="text-muted small">{user.level || 'beginner'}</div>
                  </div>
                  <div className="text-end">
                    <div className="fw-semibold">{user.points ?? 0} pts</div>
                    <div className="text-muted small">{user.role || 'member'}</div>
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

export default Leaderboard;
