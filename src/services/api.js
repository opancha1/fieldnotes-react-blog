export const API_BASE = 'https://jsonplaceholder.typicode.com';

export async function fetchJson(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, options);
  if (!response.ok) {
    const error = new Error('The request could not be completed.');
    error.status = response.status;
    throw error;
  }
  return response.json();
}
