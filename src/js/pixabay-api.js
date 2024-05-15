import axios from 'axios';
export async function fetchImage(searchValue, page) {
  const API_KEY = '43757343-ba5778b701f459784bea5ede7';
  axios.defaults.baseURL = 'https://pixabay.com/api/';
  const paramsString = `?key=${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=15`;

  const { data } = await axios.get(paramsString);
  return data;
}
