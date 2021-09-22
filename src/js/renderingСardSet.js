import cardSetTemplateHBS from '../templates/set-of-cards.hbs';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { getEventsByOptions, getEventsByAttractions } from '../js/events-api';
import refs from './refs';
import { getEventID } from './open-close-modal';
import { pagination } from './pagination';

window.addEventListener('keydown', onKeyboardClick);
refs.countryInput.addEventListener('input', onCountrySelect);
refs.backdropRef.addEventListener('click', onbuttonMoreClick);

function onbuttonMoreClick(event) {
  const keyword = localStorage.getItem('author');
  const country = refs.countryInput.value;

  let action = event.target.dataset.action;

  if (action) {
    refs.backdropRef.classList.remove('open');

    clearArtiklesContainer();
    renderingCardSet(country, keyword);
    refs.countryInput.value = '';
    refs.keywordInput.value = keyword;
  }
}

function clearArtiklesContainer() {
  refs.cardSetContainer.innerHTML = '';
}

function onKeyboardClick(e) {
  if (e.code === 'Enter') onInput();
}

function onCountrySelect() {
  refs.keywordInput.value = '';
  const keyword = refs.keywordInput.value;
  const country = refs.countryInput.value;
  localStorage.setItem('keyword', keyword);
  localStorage.setItem('country', country);
  renderingCardSet(country, keyword);
}

function onInput() {
  const keyword = refs.keywordInput.value;
  const country = refs.countryInput.value;
  localStorage.setItem('keyword', keyword);
  localStorage.setItem('country', country);
  if (keyword === '') {
    error({
      text: 'Please enter something!',
      delay: 2000,
    });
  } else {
    renderingCardSet(country, keyword);
  }
}

function errAction(err) {
  localStorage.removeItem('keyword');
  localStorage.removeItem('country');
  localStorage.removeItem('page');
  error({
    text: err,
    delay: 3000,
  });
}

function rendering(arr) {
  const cardSetTemplateAction = cardSetTemplateHBS(arr.cards);
  refs.cardSetContainer.innerHTML = cardSetTemplateAction;
}

export default function renderingCardSet(country, keyword, page = 1) {
  page = page === '' ? 1 : page;
  getEventsByOptions(country, keyword, page)
    .then(res => {
      const totalPages = res.totalPages > 49 ? 49 : res.totalPages;
      const pages = totalPages < 49 && totalPages > 1 ? totalPages - 1 : totalPages;
      pagination._options.totalItems = pages;
      localStorage.setItem('page', page);
      pagination._paginate(res.number);
      return res;
    })
    .then(rendering)
    .catch(err => errAction(err));
}

refs.inputSearch.addEventListener('click', onInput);
