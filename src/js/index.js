import '../css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { PixabayAPI } from './pixabay-api';
import createGalleryCards from '../templates/gallery-card.hbs';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const searchFormEl = document.querySelector('form.search-form');
const galleryListEl = document.querySelector('div.gallery');
const loadMoreBtnEl = document.querySelector('button.load-more');

searchFormEl.addEventListener('submit', handlesearchFormElSubmit);
loadMoreBtnEl.addEventListener('click', handleLoadMoreBtnClick);

const pixabayAPI = new PixabayAPI();

const lightbox = new SimpleLightbox('.gallery a');

loadMoreBtnEl.classList.add("hidden");

function handlesearchFormElSubmit(event) {
    event.preventDefault();
    loadMoreBtnEl.classList.add("hidden");

    const searchQuery = event.currentTarget.elements['searchQuery'].value;
    console.log(searchQuery);

    pixabayAPI.q = searchQuery;
    pixabayAPI.page = 1;

    fetchPhotos();
}

function fetchPhotos() {
    pixabayAPI
    .fetchPhotos()
    .then(({ data }) => { 
        if (data.totalHits === 0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return;
        }
     
        galleryListEl.innerHTML = createGalleryCards(data.hits);

        lightbox.refresh();

        Notify.success(`Hooray! We found ${data.totalHits} images.`);      
        
        if (data.totalHits > pixabayAPI.per_page) {
            loadMoreBtnEl.classList.remove("hidden");
        }
    });
}

function fetchMorePhotos() {
    pixabayAPI
    .fetchPhotos()
    .then(({ data }) => { 
            
        galleryListEl.insertAdjacentHTML('beforeend', createGalleryCards(data.hits));
        lightbox.refresh();  
        
        if (pixabayAPI.page >= data.totalHits / pixabayAPI.per_page) {
            loadMoreBtnEl.classList.add("hidden");
            Notify.failure("We're sorry, but you've reached the end of search results.");
        }
    });
}
    
function handleLoadMoreBtnClick() {
    pixabayAPI.page += 1;

    fetchMorePhotos();
   
}



