import { createClient } from '@/lib/supabase/client';

type Primitive = string | number | boolean;
type QueryParams = Record<string, Primitive | null | undefined>;

const supabase = createClient();

export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

export class RateLimitError extends ApiError {
  retryAfter: string | null;

  constructor(message: string, status: number, body: unknown, retryAfter: string | null) {
    super(message, status, body);
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
  }
}

function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL?.trim() ?? '';
}

function buildUrl(path: string, params?: QueryParams): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${getBaseUrl()}${normalizedPath}`;

  if (!params || Object.keys(params).length === 0) {
    return url;
  }

  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value == null) {
      continue;
    }
    searchParams.set(key, String(value));
  }

  const query = searchParams.toString();
  return query ? `${url}?${query}` : url;
}

async function parseResponseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    return response.json();
  }

  const text = await response.text();
  return text || null;
}

async function handleUnauthorized(): Promise<void> {
  await supabase.auth.signOut();
  if (typeof window !== 'undefined') {
    window.location.assign('/login');
  }
}

async function createError(response: Response): Promise<ApiError> {
  const body = await parseResponseBody(response);
  const message =
    typeof body === 'object' &&
    body !== null &&
    'error' in body &&
    typeof (body as { error?: unknown }).error === 'string'
      ? (body as { error: string }).error
      : `API request failed with status ${response.status}`;

  if (response.status === 429) {
    return new RateLimitError(message, response.status, body, response.headers.get('retry-after'));
  }

  return new ApiError(message, response.status, body);
}

export async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const headers = new Headers(init.headers);
  if (!headers.has('Content-Type') && init.body != null) {
    headers.set('Content-Type', 'application/json');
  }
  if (session?.access_token) {
    headers.set('Authorization', `Bearer ${session.access_token}`);
  }

  const response = await fetch(buildUrl(path), {
    ...init,
    headers,
    credentials: 'include',
  });

  if (response.status === 401) {
    await handleUnauthorized();
    throw await createError(response);
  }

  if (!response.ok) {
    throw await createError(response);
  }

  return response;
}

export async function apiGet<T>(path: string, params?: QueryParams): Promise<T> {
  const response = await apiFetch(buildUrl(path, params), { method: 'GET' });
  return response.json() as Promise<T>;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const response = await apiFetch(path, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  return response.json() as Promise<T>;
}

export async function apiPut<T>(path: string, body: unknown): Promise<T> {
  const response = await apiFetch(path, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
  return response.json() as Promise<T>;
}

export async function apiDelete(path: string): Promise<void> {
  await apiFetch(path, { method: 'DELETE' });
}
