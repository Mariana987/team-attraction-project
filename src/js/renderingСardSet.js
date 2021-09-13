import cardSetTemplateHBS from '../templates/set-of-cards.hbs';

const cardSetContainer = document.querySelector('.set-of-cards');

console.log(cardSetContainer);
function renderingCardSet(arr) {
  const cardSetTemplateAction = cardSetTemplateHBS(arr);
  cardSetContainer.insertAdjacentHTML("beforebegin", cardSetTemplateAction);
};

export default { renderingCardSet };