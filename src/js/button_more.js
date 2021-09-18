import cardSetTemplateHBS from '../templates/set-of-cards.hbs';
import refs from './refs';
import { error } from '@pnotify/core';
import { rendering} from './renderingСardSet';
// import getEventsByAttractions from './events-api';
import { pagination } from './pagination';


refs.backdropRef.addEventListener('click', onbuttonMoreElClick);

function onbuttonMoreElClick(event) {
    const id = sessionStorage.getItem('authorID');
    let action = event.target.dataset.action;

    if (action) {
         refs.backdropRef.classList.remove('open');
         renderingCardSet(id);
    }
};

// function renderingCardSet(id, page = false) {
// getEventsByAttractions(id, page = false).then(res => {
     
//       const totalPages = res.totalPages > 45 ? 45 : res.totalPages;
//       pagination._options.totalItems = totalPages;
//       pagination._paginate(res.number);
//       return res;
//     }).then(rendering).catch(err =>
//       error({
//         text: err,
//         delay: 3000,
//       }),
//     );

// };

const API_KEY = 'GcvUr561HaBI30kU58PhKSa9RWqvwjKx';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
const breakPoint = 'events.json';

function renderingCardSet(id) {
    getEventsByAttractions(id)
    //     .then(res => {
    //   const totalPages = res.totalPages > 45 ? 45 : res.totalPages;
    //   pagination._options.totalItems = totalPages;
    //   pagination._paginate(res.number);
    //   return res;
    // }).then(rendering).catch(err =>
    //   error({
    //     text: err,
    //     delay: 3000,
    //   }),
    // );

};

function getEventsByAttractions(id){const url = `${BASE_URL}${breakPoint}?apikey=${API_KEY}&locale=*&attractionId=${id}`;
        return fetchJSON(url).then(res => getPage(res));}

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

}