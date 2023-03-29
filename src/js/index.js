import '../css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { PixabayAPI } from './pixabay-api';
import createGalleryCards from '../templates/gallery-card.hbs';


// const searchQueryEl = document.querySelector('input[name="searchQuery"]');
const searchFormEl = document.querySelector('form.search-form');

searchFormEl.addEventListener('submit', handlesearchFormElSubmit);

const pixabayAPI = new PixabayAPI();

function handlesearchFormElSubmit(event) {
    event.preventDefault();

    const searchQuery = event.currentTarget.elements['searchQuery'].value;
    console.log(searchQuery);

    pixabayAPI.q = searchQuery;
    pixabayAPI.page = 1;

    fetchPhotos();

}


// console.log(searchQueryEl);
// console.log(searchFormEl);
// console.log(searchQueryEl.value);



function fetchPhotos() {
    pixabayAPI
    .fetchPhotos()
    .then(({ data }) => { 
        console.log(data);
    });
}
    

