import cardSetTemplateHBS from '../templates/set-of-cards.hbs';
// import { getEventsByOptions, getEventsByAttractions } from '../js/events-api';
import { pagination } from './pagination';

// информация из events-api

// const API_KEY = 'GcvUr561HaBI30kU58PhKSa9RWqvwjKx';
// const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
// const breakPoint = 'events.json';

// function getEventsByAttractions(id, page = false) {
//   if (!id) return;
//   page = page ? `&page=${page}` : '';
//   const url = `${BASE_URL}${breakPoint}?apikey=${API_KEY}&locale=*&attraction=LP`;
//   return fetchJSON(url).then(res => getPage(res));
// }

const attractions = 'LP'

function getEventsByAttractions() {
  
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=GcvUr561HaBI30kU58PhKSa9RWqvwjKx&locale=*&keyword=${attractions}`;
  return fetchJSON(url).then(res => getPage(res));
}

function fetchJSON(url) {
  return fetch(url).then(res => res.json());
}

function getPage(data) {
//   if (obj.page.totalPages === 0) {
//     throw 'Nothing found from these search criteria';
//   }
//   const arrCards = obj?._embedded?.events?.map(item => {
//     return {
//       id: item?.id,
//       name: item?.name,
//       date: item?.dates?.start?.localDate,
//       promoter: item?.promoter?.name,
//       venues: item?._embedded?.venues[0]?.name,
//       images: item?.images,
//     };
//   });
//   return {
//     number: obj?.page?.number,
//     size: obj?.page?.size,
//     totalElements: obj?.page?.totalElements,
//     totalPages: obj?.page?.totalPages,
//     cards: arrCards,
//   };
    return data._embedded;
}


// информация из events-api

function fetchAndMarkUp() {
   return getEventsByAttractions().then(appendArtiklesMarkup);

};

function appendArtiklesMarkup(hits) {
    cardSetContainerEl.insertAdjacentHTML('beforeend', cardSetTemplateHBS(hits));
};



const backdropModalEl = document.querySelector('[data-modal-backdrop]');
const buttonMoreEl = document.querySelector('.modal__btn-more');
const cardSetContainerEl = document.querySelector('#js-set-of-cards');
buttonMoreEl.addEventListener('click', onbuttonMoreElClick);

function onbuttonMoreElClick(evt) {
    backdropModalEl.classList.remove('open');
    fetchAndMarkUp();
    // rendering(arrCards);
};

// function rendering(arr) {
//   const cardSetTemplateAction = cardSetTemplateHBS(arr.cards);
//   refs.cardSetContainer.innerHTML = cardSetTemplateAction;
//   searchCardsLinks(); //???
// }