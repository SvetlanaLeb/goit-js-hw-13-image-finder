import photoCard from './templates/photo-card.hbs';
import './common.css';
import ImagesApiService from './js/apiService';
import LoadMoreBtn from './js/load-more-btn';
import * as basicLightbox from 'basiclightbox'

const refs = {
    searchForm: document.querySelector('.search-form'),
    imgContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
  input: document.querySelector('input'),
    img: document.querySelector("img")
};

const imagesApiService = new ImagesApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);
refs.input.addEventListener('input', onInputChange);

refs.imgContainer.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
});
refs.imgContainer.addEventListener("click", onImgClick);


const instance = basicLightbox.create(
  `
   <div class="modal">
        <p>
            Your first lightbox with just a few lines of code.
            Yes, it's really that simple.
        </p>
    </div>
`
);

function onImgClick(e){
  console.log(e.target);
  instance.show();
  console.log(instance)
}

function onSearch(evt) {
  evt.preventDefault();
  imagesApiService.searchQuery = evt.currentTarget.elements.query.value;

    imagesApiService.resetPage();
    clearImqContainer();
    fetchImages();
    loadMoreBtn.show();
  
  if (imagesApiService.searchQuery === '') {
    clearImqContainer();
  };
  
};
function onInputChange(e) {
  if (e.target.value === '') {
    clearImqContainer();
  }
};

function fetchImages() {
  loadMoreBtn.disable();

  imagesApiService.fetchImages().then(data => {
    loadMoreBtn.enable();
   
   data.hits.forEach(img => {
     appendImgMarkup(img);
   
   }); 
    
  });
};

function appendImgMarkup(articles) {
  refs.imgContainer.insertAdjacentHTML('beforeend', photoCard(articles));
}

function clearImqContainer() {
  refs.imgContainer.innerHTML = '';
}