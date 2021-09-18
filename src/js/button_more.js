import cardSetTemplateHBS from '../templates/set-of-cards.hbs';
import refs from './refs';
import { error } from '@pnotify/core';
// import { rendering} from './renderingСardSet';
// import {fetchJSON, getPage } from './events-api';
import { pagination } from './pagination';

const API_KEY = 'GcvUr561HaBI30kU58PhKSa9RWqvwjKx';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
const breakPoint = 'events.json';

refs.backdropRef.addEventListener('click', onbuttonMoreElClick);

function onbuttonMoreElClick(event) {
    //  e.preventDefault();
    
    const keyword = sessionStorage.getItem('author');
    let action = event.target.dataset.action;

    if (action) {
        refs.backdropRef.classList.remove('open');
        clearArtiklesContainer();
         renderingCardSet(keyword);
    }
};

function renderingCardSet(keyword) {
  getEventsByOptions(keyword).then(res => {
      const totalPages = res.totalPages > 50? 50 : res.totalPages;
      pagination._options.totalItems = totalPages - 1;
      pagination._paginate(res.number);
      return res;
    }).then(rendering).catch(err =>
      error({
        text: err,
        delay: 3000,
      }),
    );
}

function getEventsByOptions(keyword) {
//   keyword = keyword ? `&keyword=${keyword}` : '';
  const url = `${BASE_URL}${breakPoint}?apikey=${API_KEY}&locale=*&keyword=${keyword}`;

  return fetchJSON(url)
  .then(res => {
    console.log(res)
    return res
  })
  .then(res => getPage(res));
}

function fetchJSON(url) {
  return fetch(url).then(res => res.json());
}

function getPage(obj) {
  if (obj.page.totalPages === 0) {
    throw 'Nothing found from these search criteria';
  }
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

function clearArtiklesContainer() {
    refs.cardSetContainer.innerHTML = '';
};

 function rendering(arr) {
  const cardSetTemplateAction = cardSetTemplateHBS(arr.cards);
  refs.cardSetContainer.innerHTML = cardSetTemplateAction;


  // функция берет ID ивента и посылает запрос на сервер. Функция временная так как костыль))
    getEventID();
  // 
  // 
  //  searchCardsLinks(); //???

}