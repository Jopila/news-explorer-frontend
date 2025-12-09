import { NEWS_API_BASE_URL, NEWS_API_KEY, NEWS_API_PAGE_SIZE } from './config';

const LOCALE = 'pt-BR';

const formatDate = (isoDate) => {
  if (!isoDate) return '';
  try {
    return new Date(isoDate).toLocaleDateString(LOCALE, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return isoDate;
  }
};

const buildDateParams = () => {
  const today = new Date();
  const fromDate = new Date();
  fromDate.setDate(today.getDate() - 7);
  const to = today.toISOString().split('T')[0];
  const from = fromDate.toISOString().split('T')[0];
  return { from, to };
};

export const fetchNews = async (query) => {
  const { from, to } = buildDateParams();

  const params = new URLSearchParams({
    q: query,
    apiKey: NEWS_API_KEY,
    from,
    to,
    pageSize: NEWS_API_PAGE_SIZE.toString(),
    sortBy: 'publishedAt',
    language: 'pt',
  });

  const response = await fetch(`${NEWS_API_BASE_URL}/everything?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Erro na News API: ${response.status}`);
  }

  const data = await response.json();

  if (!data?.articles || !Array.isArray(data.articles)) {
    throw new Error('Resposta inesperada da News API');
  }

  const buildId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  };

  return data.articles.map((article) => ({
    id: article.url || buildId(),
    keyword: query,
    title: article.title || 'Título indisponível',
    description: article.description || 'Descrição indisponível.',
    source: article.source?.name || 'Fonte desconhecida',
    publishedAt: formatDate(article.publishedAt),
    rawDate: article.publishedAt,
    image: article.urlToImage || '',
    url: article.url,
  }));
};
