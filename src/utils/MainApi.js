import { MAIN_API_BASE_URL } from './config';

const buildErrorMessage = async (response) => {
  let message = `Erro ${response.status}`;
  try {
    const data = await response.json();
    if (data?.message) {
      message = data.message;
    }
  } catch (err) {
    // ignore parse errors, use default message
  }
  return message;
};

const request = async (path, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const response = await fetch(`${MAIN_API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(await buildErrorMessage(response));
  }

  return response.json();
};

export const signup = ({ name, email, password }) =>
  request('/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });

export const signin = ({ email, password }) =>
  request('/signin', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const getUserInfo = (token) =>
  request('/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
