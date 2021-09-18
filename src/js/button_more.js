import cardSetTemplateHBS from '../templates/set-of-cards.hbs';
import refs from './refs';
import renderingCardSet from './renderingСardSet';
import getEventID from './open-close-modal';
import getEventsByAttractions from './events-api';
// import { getEventsByOptions, getEventsByAttractions } from '../js/events-api';
// import { pagination } from './pagination';


refs.backdropRef.addEventListener('click', onbuttonMoreElClick);

function onbuttonMoreElClick(event) {
    const authorID = sessionStorage.getItem('authorID');
    console.log(authorID);
     let action = event.target.dataset.action;
    if (action) {
         refs.backdropRef.classList.remove('open');
         fetchAndMarkUp();
    }
};


function onInput() {
  const keyword = refs.keywordInput.value;
  const country = refs.countryInput.value;
  if (keyword === '') {
    error({
      text: 'Please enter something!',
      delay: 2000,
    });
  } else {
    renderingCardSet(country, keyword);
  }
}

function rendering(arr) {
  const cardSetTemplateAction = cardSetTemplateHBS(arr.cards);
  refs.cardSetContainer.innerHTML = cardSetTemplateAction;


  // функция берет ID ивента и посылает запрос на сервер. Функция временная так как костыль))
//   getEventID();
  // 
  // 
  searchCardsLinks(); //???

}

//  function renderingCardSet(country, keyword, page = null) {
//   // console.log(pagination._currentPage);
//   getEventsByOptions(country, keyword, page)
//     .then(res => {
//       // console.log(res);
//       const totalPages = res.totalPages > 45 ? 45 : res.totalPages;
//       pagination._options.totalItems = totalPages;
//       pagination._paginate(res.number);
//       return res;
//     })
//     .then(rendering)
//     .catch(err =>
//       error({
//         text: err,
//         delay: 3000,
//       }),
//     );
// }


