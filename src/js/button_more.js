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

function getEventsByAttractions() {
  
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=GcvUr561HaBI30kU58PhKSa9RWqvwjKx&locale=*&keyword=lp`;
  return fetchJSON(url).then(res => getPage(res));
}


function fetchJSON(url) {
  return fetch(url).then(res => res.json());
}

function getPage(obj) {

  const arrCards = obj?._embedded?.events?.map(item => {
    return {
      id: item?.id,
      name: item?.name,
      date: item?.dates?.start?.localDate,
      promoter: item?.promoter?.name,
      venues: item?._embedded?.venues[0]?.name,
      images: item?.images,
    };
  });
  return {
    number: obj?.page?.number,
    size: obj?.page?.size,
    totalElements: obj?.page?.totalElements,
    totalPages: obj?.page?.totalPages,
    cards: arrCards,
  };
}


// информация из events-api

const backdropModalEl = document.querySelector('[data-modal-backdrop]');
const buttonMoreEl = document.querySelector('.modal__btn-more');
buttonMoreEl.addEventListener('click', onbuttonMoreElClick);

function onbuttonMoreElClick(evt) {
    backdropModalEl.classList.remove('open');
    getEventsByAttractions();
    rendering(arrCards);
};

function rendering(arr) {
  const cardSetTemplateAction = cardSetTemplateHBS(arr.cards);
  refs.cardSetContainer.innerHTML = cardSetTemplateAction;
  searchCardsLinks(); //???
}