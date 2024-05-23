import axios from 'axios';

const BOOK_SEARCH_API_URL = 'https://openlibrary.org/search.json';
const AUTHOR_API_URL = 'https://openlibrary.org/authors/';

export const fetchBooks = async (query, page = 1, limit = 10) => {
  const response = await axios.get(`${BOOK_SEARCH_API_URL}`, {
    params: {
      q: query,
      page,
      limit
    }
  });
  return response.data.docs;
};

export const fetchAuthor = async (authorKey) => {
  const response = await axios.get(`${AUTHOR_API_URL}${authorKey}.json`);
  return response.data;
};
