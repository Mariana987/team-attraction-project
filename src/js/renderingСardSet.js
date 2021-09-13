import cardSetTemplateHBS from '../templates/set-of-cards.hbs';

import { getEventsByOptions } from '../js/events-api';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

const cardSetContainer = document.querySelector('.set-of-cards');
let page = 0;

console.log(cardSetContainer);

export default { renderingCardSet };

const refs = {
  input: document.querySelector('.input'),
  form: document.querySelector('.search-form'),
  body: document.querySelector('body'),
};

function onInput(event) {
  event.preventDefault();
  const keyword = refs.input.value;
  if (keyword === '') {
    error({
      text: 'Please enter something!',
      delay: 2000,
    });
  } else {
    getEventsByOptions(page, keyword)
      .then(renderingCardSet)
      .then(page++)
      .catch(error);
  }
  setTimeout(() => scroll(), 1000);
}

function renderingCardSet(arr) {
  const cardSetTemplateAction = cardSetTemplateHBS(arr.cards);
  cardSetContainer.insertAdjacentHTML('beforebegin', cardSetTemplateAction);
}
refs.form.addEventListener('submit', onInput);

