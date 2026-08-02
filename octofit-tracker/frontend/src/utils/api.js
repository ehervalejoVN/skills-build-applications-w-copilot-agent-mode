export function buildApiUrl(path, env = import.meta.env) {
  const codespaceName = env?.VITE_CODESPACE_NAME?.trim();
  const host = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
  return `${host}/api/${path.replace(/^\/+/, '')}/`;
}

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  if (Array.isArray(payload.results)) {
    return payload.results;
  }

  if (Array.isArray(payload.items)) {
    return payload.items;
  }

  if (Array.isArray(payload.data)) {
    return payload.data;
  }

  return [];
}
