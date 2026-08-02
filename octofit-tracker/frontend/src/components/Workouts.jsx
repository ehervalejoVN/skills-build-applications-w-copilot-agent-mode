import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeCollection } from '../utils/api';

function Workouts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadWorkouts() {
      try {
        const response = await fetch(buildApiUrl('workouts'));
        if (!response.ok) {
          throw new Error('Unable to fetch workouts');
        }

        const payload = await response.json();
        if (isMounted) {
          setItems(normalizeCollection(payload));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load workouts');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadWorkouts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="h4 mb-1">Workouts</h2>
            <p className="text-muted mb-0">Personalized workout suggestions.</p>
          </div>
          <span className="badge bg-warning-subtle text-warning">Recommended</span>
        </div>

        {loading && <p className="text-muted">Loading workouts…</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="row g-3">
            {items.length === 0 ? (
              <div className="col-12">
                <div className="alert alert-light">No workout suggestions available.</div>
              </div>
            ) : (
              items.map((workout) => (
                <div className="col-md-6" key={workout._id || workout.id}>
                  <div className="border rounded p-3 h-100">
                    <h3 className="h6 mb-1">{workout.title || 'Workout'}</h3>
                    <p className="text-muted small mb-2">{workout.focus || 'General fitness'}</p>
                    <p className="small mb-2">{workout.description || 'No description provided.'}</p>
                    <div className="d-flex justify-content-between text-muted small">
                      <span>{workout.durationMinutes ?? 0} min</span>
                      <span>{workout.difficulty || 'easy'}</span>
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

export default Workouts;
