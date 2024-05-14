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
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let userData = '';

function onFormSubmit(event) {
  event.preventDefault();
  refs.loadMoreBtn.classList.remove('is-visible');
  let page = 1;
  refs.galleryEL.innerHTML = '<span class="loader"></span>';
  const searchValue = refs.inputEL.value.trim();
  userData = searchValue;
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

  fetchImage(searchValue).then(data => {
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
    renderMarkup(data.hits, refs.galleryEL);
    if (data.totalHits > 15) {
      refs.loadMoreBtn.classList.add('is-visible');
    }
    let gallery = new SimpleLightbox('#gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
    refs.loadMoreBtn.addEventListener('click', () => {
      page += 1;
      renderMarkup(data.hits, refs.galleryEL);
    });
    gallery.refresh();
  });

  refs.formEL.reset();
}

refs.formEL.addEventListener('submit', onFormSubmit);
