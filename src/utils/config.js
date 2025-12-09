const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || 'abe294b05b6d4d989e84c0a287b54d09';
const NEWS_API_BASE_URL = 'https://nomoreparties.co/news/v2';
const NEWS_API_PAGE_SIZE = 100;

const MAIN_API_BASE_URL = import.meta.env.VITE_MAIN_API_BASE_URL || 'https://api.nomoreparties.co';
const MAIN_API_TOKEN = import.meta.env.VITE_MAIN_API_TOKEN || '';

export {
  NEWS_API_KEY,
  NEWS_API_BASE_URL,
  NEWS_API_PAGE_SIZE,
  MAIN_API_BASE_URL,
  MAIN_API_TOKEN,
};
