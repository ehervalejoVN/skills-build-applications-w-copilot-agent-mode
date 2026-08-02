import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeCollection } from '../utils/api';

function Activities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadActivities() {
      try {
        const response = await fetch(buildApiUrl('activities'));
        if (!response.ok) {
          throw new Error('Unable to fetch activities');
        }

        const payload = await response.json();
        if (isMounted) {
          setItems(normalizeCollection(payload));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load activities');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadActivities();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="h4 mb-1">Recent activities</h2>
            <p className="text-muted mb-0">Latest activity log entries from the backend.</p>
          </div>
          <span className="badge bg-primary-subtle text-primary">API</span>
        </div>

        {loading && <p className="text-muted">Loading activities…</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="list-group">
            {items.length === 0 ? (
              <div className="list-group-item text-muted">No activities found yet.</div>
            ) : (
              items.map((activity) => (
                <div className="list-group-item" key={activity._id || activity.id}>
                  <div className="d-flex justify-content-between gap-3">
                    <div>
                      <div className="fw-semibold text-capitalize">{activity.type || 'Activity'}</div>
                      <div className="text-muted small">
                        {activity.notes || 'No notes provided'}
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="fw-semibold">{activity.pointsEarned ?? 0} pts</div>
                      <div className="text-muted small">{activity.durationMinutes ?? 0} min</div>
                    </div>
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

export default Activities;
