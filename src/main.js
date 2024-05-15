import { fetchImage } from './js/pixabay-api';
import { renderMarkup } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  formEL: document.querySelector('#form'),
  inputEL: document.querySelector('#image-input'),
  galleryEL: document.querySelector('#gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let searchValue = '';
let page = 1;

let gallery = new SimpleLightbox('#gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function onFormSubmit(event) {
  event.preventDefault();
  refs.loadMoreBtn.classList.remove('is-visible');
  page = 1;
  refs.galleryEL.innerHTML = '<span class="loader"></span>';
  searchValue = refs.inputEL.value.trim();
  if (searchValue === '') {
    return iziToast.show({
      title: '⨻',
      titleSize: '20px',
      message: 'Introduction field please enter the value to search',
      color: 'white',
      backgroundColor: 'red',
      position: 'topRight',
    });
  }

  fetchImage(searchValue, page).then(data => {
    if (data.totalHits === 0) {
      return iziToast.show({
        title: '⨻',
        titleSize: '20px',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        color: 'white',
        backgroundColor: 'red',
        position: 'topRight',
      });
    }
    refs.galleryEL.innerHTML = '';
    gallery.refresh();
    renderMarkup(data.hits, refs.galleryEL);
    if (data.totalHits > 15) {
      refs.loadMoreBtn.classList.add('is-visible');
    }
  });

  refs.formEL.reset();
}
function onLoadMoreBtnClick(event) {
  page += 1;
  fetchImage(searchValue, page).then(data => {
    renderMarkup(data.hits, refs.galleryEL);
    const galleryEl = document.querySelector('.gallery');
    gallery.refresh();
    const galleryHeight = galleryEl.getBoundingClientRect().height;
    window.scrollBy({
      top: galleryHeight * 2,
      behavior: 'smooth',
    });

    if (Math.ceil(data.totalHits / 15) === page) {
      refs.loadMoreBtn.classList.remove('is-visible');
      iziToast.show({
        title: '⨻',
        titleSize: '20px',
        message: "We're sorry, but you've reached the end of search results.",
        color: 'white',
        backgroundColor: 'navy-blue',
        position: 'topRight',
      });
    }
  });
}
refs.formEL.addEventListener('submit', onFormSubmit);

refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
