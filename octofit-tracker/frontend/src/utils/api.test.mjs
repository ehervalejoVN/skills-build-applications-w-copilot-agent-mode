import test from 'node:test';
import assert from 'node:assert/strict';
import { buildApiUrl, normalizeCollection } from './api.js';

test('buildApiUrl uses a codespace-safe host when VITE_CODESPACE_NAME is set', () => {
  const url = buildApiUrl('activities', { VITE_CODESPACE_NAME: 'demo-space' });
  assert.equal(url, 'https://demo-space-8000.app.github.dev/api/activities/');
});

test('buildApiUrl falls back to localhost when VITE_CODESPACE_NAME is missing', () => {
  const url = buildApiUrl('teams', {});
  assert.equal(url, 'http://localhost:8000/api/teams/');
});

test('normalizeCollection handles arrays and paginated payloads', () => {
  assert.deepEqual(normalizeCollection([{ id: 1 }]), [{ id: 1 }]);
  assert.deepEqual(normalizeCollection({ results: [{ id: 2 }] }), [{ id: 2 }]);
  assert.deepEqual(normalizeCollection({ items: [{ id: 3 }] }), [{ id: 3 }]);
  assert.deepEqual(normalizeCollection({ data: [{ id: 4 }] }), [{ id: 4 }]);
  assert.deepEqual(normalizeCollection({}), []);
});
