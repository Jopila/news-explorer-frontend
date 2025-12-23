import { MAIN_API_BASE_URL } from './config';

let authToken = '';

export const setAuthToken = (token) => {
  authToken = token || '';
};

const request = async (path, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const response = await fetch(`${MAIN_API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let message = `Erro ${response.status}`;
    try {
      const data = await response.json();
      if (data?.message) {
        message = data.message;
      }
    } catch (err) {
      // ignore parse errors, use default message
    }
    throw new Error(message);
  }

  return response.json();
};

export const getSavedArticles = () => request('/articles');

export const saveArticle = (article) =>
  request('/articles', {
    method: 'POST',
    body: JSON.stringify({
      keyword: article.keyword || '',
      title: article.title,
      text: article.description,
      date: article.rawDate || article.publishedAt || '',
      source: article.source,
      link: article.url,
      image: article.image || '',
    }),
  });

export const deleteArticle = (id) =>
  request(`/articles/${id}`, {
    method: 'DELETE',
  });
