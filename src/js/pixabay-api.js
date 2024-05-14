export function fetchImage(searchValue) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '43757343-ba5778b701f459784bea5ede7';
  const params = `?key=${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true`;

  return fetch(`${BASE_URL}${params}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
