import refs from './refs';
import { getEventById } from './events-api';
import modalContentTemplateHBS from '../templates/modalContent.hbs';

refs.cardSetContainer.addEventListener('click', onModalOpen);
let eventID = '';

function onModalOpen(evt) {
  evt.preventDefault();
  refs.backdropRef.classList.add('open');
  getEventById(eventID).then(res => renderingModal(res));
  window.addEventListener('keydown', onModalclose);
  refs.backdropRef.addEventListener('click', onModalclose);
}

function onModalclose(evt) {
  if (
    evt.target.classList.contains('backdrop') ||
    evt.target.classList.contains('modal__btn-close') ||
    evt.code === 'Escape'
  ) {
    console.log(evt.target.classList.contains('modal__btn-close'));
    window.removeEventListener('keydown', onModalclose);
    refs.backdropRef.classList.remove('open');
  }
}

function getEventID() {
  const getAllIvents = document.querySelectorAll('.set-of-cards__item');
  getAllIvents.forEach(el => el.addEventListener('click', start));
  function start(e) {
    eventID = e.currentTarget.getAttribute('data-id');
  }
}

function renderingModal(arr) {
  const modalContentTemplateAction = modalContentTemplateHBS(arr);
  refs.modalWindow.innerHTML = modalContentTemplateAction;
  console.log(arr);
}

export { getEventID };
