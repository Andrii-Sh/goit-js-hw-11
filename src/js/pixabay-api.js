import axios from "axios";


export class PixabayAPI {
    #BASE_URL = 'https://pixabay.com/api/';
    #API_KEY = '34852218-682624240d6257474a10d77b2';

    page = 1;
    q = null;
    per_page = 40;

    async fetchPhotos() { 
        return await axios.get(`${this.#BASE_URL}`, {
            params: {
                q: this.q,
                page: this.page,
                per_page: this.per_page,
                key: this.#API_KEY,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: true,
            },
        });
    } 
}