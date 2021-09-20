import refs from './refs';
import { getEventById } from './events-api';
import modalContentTemplateHBS from '../templates/modalContent.hbs';
import { onTimer } from './timer/takeTimeAndInstallationTimer';

refs.cardSetContainer.addEventListener('click', onModalOpen);

let eventID = '';

// ------------Функц. клик на li, получаем id в консоль----------------------------
refs.cardSetContainer.addEventListener('click', onMoOp);
function onMoOp(e) {
  if (e.target.nodeName !== 'LI') return;
  console.log('hhh', e.target.dataset.id);
}
// --------------------------------------------------------------------------------

function onModalOpen(evt) {
  evt.preventDefault();
  refs.backdropRef.classList.add('open');
  refs.backdropRef.scrollTop = 0; //always open modal in top position
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
    localStorage.removeItem('author');
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
  console.log(arr.who);
  localStorage.setItem('author', JSON.stringify(arr.who));

  onTimer(arr);
}

export { getEventID };
