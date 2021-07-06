const API_KEY = '22384127-56cbd68b25450c364ed3164a8';
const BASE_URL = 'https://pixabay.com/api/';


export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
      const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;


    return fetch(url)
      .then(response => response.json())
      .then(( data ) => {
        this.incrementPage();
        return data;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
