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
};

function onFormSubmit(event) {
  event.preventDefault();
  refs.galleryEL.innerHTML = '<span class="loader"></span>';
  const searchValue = refs.inputEL.value.trim();
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
          '"Sorry, there are no images matching your search query. Please try again!"',
        color: 'white',
        backgroundColor: 'red',
        position: 'topRight',
      });
    }
    refs.galleryEL.innerHTML = '';
    renderMarkup(data.hits, refs.galleryEL);
    let gallery = new SimpleLightbox('#gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
    gallery.refresh();
  });
  refs.formEL.reset();
}

refs.formEL.addEventListener('submit', onFormSubmit);
