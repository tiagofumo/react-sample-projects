var API_KEY = '73b19491b83909c7e07016f4bb4644f9:2:60667290'; // not a secret
var API_URL = 'http://api.nytimes.com/svc/books/v3/lists'
var CATEGORIES_ENDPOINT = `${API_URL}/names.json?&api-key=${API_KEY}`;

export function loadCategories() {
  return fetch(CATEGORIES_ENDPOINT);
}

export function loadBookList(categoryID) {
  return fetch(`${API_URL}/${categoryID}?response-format=json&api-key=${API_KEY}`);
}
