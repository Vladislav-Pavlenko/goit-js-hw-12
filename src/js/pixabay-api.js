import axios from 'axios';
export async function fetchImage(searchValue, page = 1) {
  const API_KEY = '43757343-ba5778b701f459784bea5ede7';
  axios.defaults.baseURL = 'https://pixabay.com/api/';
  const paramsString = `?key=${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=15`;

  const response = await axios.get(paramsString);
  if (response.status !== 200) {
    throw new Error(response.status);
  }
  return response.data;
}