import { useEffect, useState } from 'react';

function Users() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
  const apiEndpoint = `${apiBaseUrl}/api/users/`;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadUsers() {
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          throw new Error('Unable to fetch users');
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
          setError(err.message || 'Failed to load users');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="h4 mb-1">Users</h2>
            <p className="text-muted mb-0">Athletes and account profiles.</p>
          </div>
          <span className="badge bg-secondary-subtle text-secondary">Profiles</span>
        </div>

        {loading && <p className="text-muted">Loading users…</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="row g-3">
            {items.length === 0 ? (
              <div className="col-12">
                <div className="alert alert-light">No users found.</div>
              </div>
            ) : (
              items.map((user) => (
                <div className="col-md-6" key={user._id || user.id}>
                  <div className="border rounded p-3 h-100">
                    <div className="d-flex justify-content-between align-items-start gap-2">
                      <div>
                        <h3 className="h6 mb-1">{user.fullName || user.username || 'User'}</h3>
                        <p className="text-muted small mb-0">@{user.username || 'unknown'}</p>
                      </div>
                      <span className="badge bg-dark">{user.level || 'beginner'}</span>
                    </div>
                    <p className="small mt-3 mb-1">Role: {user.role || 'member'}</p>
                    <p className="small mb-0">Points: {user.points ?? 0}</p>
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

export default Users;
