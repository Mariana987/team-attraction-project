import cardSetTemplateHBS from '../templates/set-of-cards.hbs';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { getEventsByOptions, getEventsByAttractions } from '../js/events-api';
import refs from './refs';
import { getEventID } from './open-close-modal';


window.addEventListener('keydown', onKeyboardClick);
refs.countryInput.addEventListener('input', onCountrySelect);

function onKeyboardClick(e) {
  if (e.code === 'Enter') onInput();
}

function onCountrySelect() {
  refs.keywordInput.value = '';
  const keyword = refs.keywordInput.value;
  const country = refs.countryInput.value;
  renderingCardSet(country, keyword); //Добавится page
}

function onInput() {
  const keyword = refs.keywordInput.value;
  const country = refs.countryInput.value;
  if (keyword === '') {
    error({
      text: 'Please enter something!',
      delay: 2000,
    });
  } else {
    console.log(country, keyword);
    renderingCardSet(country, keyword);
  }
}

function rendering(arr) {
  const cardSetTemplateAction = cardSetTemplateHBS(arr.cards);
  refs.cardSetContainer.innerHTML = cardSetTemplateAction;

  // функция берет ID ивента и посылает запрос на сервер. Функция временная так как костыль))
  getEventID();
  // 
}

export default function renderingCardSet(country, keyword, page = null) {
  getEventsByOptions(country, keyword, page)
    .then(rendering)
    .catch(err =>
      error({
        text: err,
        delay: 3000,
      }),
    );
}
