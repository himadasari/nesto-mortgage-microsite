const BASE_URL = 'https://nesto-fe-exam.vercel.app/api';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-Nesto-Candidat': 'Hima Dasari',
};
export async function request<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${BASE_URL}${url}`, {
    headers,
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}
