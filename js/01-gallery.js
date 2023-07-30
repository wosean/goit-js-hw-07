// import { galleryItems } from './gallery-items.js';
// // Change code below this line

// console.log(galleryItems);


// const gallery = document.querySelector('.gallery')
// const items = []

// galleryItems.forEach(element => {

// 	const galleryItem = document.createElement('div')
//     galleryItem.className = 'gallery__item'
    
// 	const galleryLink = document.createElement('a')
// 	galleryLink.className = 'gallery__link'
//     galleryLink.href = element.original
    
// 	const galleryImage = document.createElement('img')
//     galleryImage.className = 'gallery__image'
//     galleryImage.src = element.preview;
//     galleryImage.setAttribute('data-source', element.original)
//     galleryImage.alt = element.description;

// 	galleryItem.append(galleryLink)
// 	galleryLink.append(galleryImage)
// 	items.push(galleryItem)
// })

// gallery.append(...items)

// gallery.addEventListener('click', e => {
//     e.preventDefault();
//     if (e.target.nodeName !== 'IMG') {
// 		return
// 	}

//     const selectedImage = e.target.getAttribute('data-source')

//     const instance = basicLightbox.create(`
//     <img src="${selectedImage}" width="800" height="600">
// `)

//     instance.show()
    
//     gallery.addEventListener('keydown', e => {
// 		if (e.key === 'Escape') {
// 			instance.close()
// 		}
// 	})
// })

// v.2

import { galleryItems } from './gallery-items.js';

const galleryContainer = document.querySelector('.gallery');
const itemsMarkup = createGalleryItemsMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', itemsMarkup);
galleryContainer.addEventListener('click', onImgClick);

function createGalleryItemsMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join('');
}
const instance = basicLightbox.create(
  `
<img width="1280" height="auto" src="">`,
  {
    onShow: (instance) => {
      window.addEventListener('keydown', onEscKeyPress);
    },
    onClose: (instance) => {
      window.removeEventListener('keydown', onEscKeyPress);
    },
  }
);

function onImgClick(e) {
  e.preventDefault();
  const datasetSource = e.target.dataset.source;
  if (!datasetSource) return;
  instance.element().querySelector('img').src = datasetSource;
  instance.show();
}

function onEscKeyPress(e) {
  if (e.code !== 'Escape') return;
  instance.close();
}