const API_BASE_URL = "http://127.0.0.1:8000";

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("study_game_token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const text = await response.text();

  let result = null;

  if (text) {
    try {
      result = JSON.parse(text);
    } catch {
      result = { message: text };
    }
  }

  if (!response.ok) {
    throw new Error(
      result?.detail ||
        result?.message ||
        `Request failed with status ${response.status}`
    );
  }

  return result;
}

export default apiRequest;