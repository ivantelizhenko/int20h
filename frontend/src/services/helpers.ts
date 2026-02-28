import { AUTH_TOKEN, REFRESH_TOKEN, STATUS_CODES } from 'utils/constants';

export const handleUnauthorizedError = (
  statusCode: number,
  requestUrl?: string,
) => {
  if (statusCode === STATUS_CODES.UNAUTHORIZED) {
    const isLoginRequest = requestUrl && requestUrl.includes('/sign-in');

    if (isLoginRequest) {
      return;
    }

    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    window.location.reload();
  }
};

export const handleErrorResponse = async (
  response: Response,
): Promise<never> => {
  const contentType = response.headers.get('content-type');
  const status = response.status;
  const url = response.url;

  let message =
    'Server temporarily unavailable.' +
    (response.statusText ? ` Error: ${response.statusText}.` : '');

  try {
    if (contentType && contentType.includes('application/json')) {
      const payload = await response.json();

      if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
        message = payload.message || payload.error || payload.detail || message;
      }
    } else if (contentType && contentType.includes('text/plain')) {
      message = await response.text();
    }
  } catch (parseError) {
    console.error('Failed to parse error response body:', parseError);
    message = `Failed to parse error (Status: ${status})`;
  }

  handleUnauthorizedError(status, url);

  throw new Error(message);
};

export const getHeaders = () => ({
  // Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
  'Content-Type': 'application/json',
});

export const handleJsonResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    return handleErrorResponse(response);
  }

  return response.json();
};

export const handleResponseStatus = async (
  response: Response,
): Promise<boolean> => {
  if (!response.ok) {
    return handleErrorResponse(response);
  }

  return response.ok;
};
