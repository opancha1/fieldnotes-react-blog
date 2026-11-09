import { useEffect, useState } from 'react';
import { fetchJson } from '../services/api.js';

export default function useApi(path) {
  const [result, setResult] = useState({ path: null, data: null, loading: false, error: null });
  useEffect(() => {
    if (!path) return;
    const controller = new AbortController();
    setResult({ path, data: null, loading: true, error: null });
    fetchJson(path, { signal: controller.signal })
      .then((data) => {
        if (!controller.signal.aborted) setResult({ path, data, loading: false, error: null });
      })
      .catch((error) => {
        if (!controller.signal.aborted) setResult({ path, data: null, loading: false, error });
      });
    return () => controller.abort();
  }, [path]);
  if (result.path !== path) return { data: null, loading: Boolean(path), error: null };
  return result;
}
