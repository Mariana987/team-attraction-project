import countries from '../statics/countries.json';
import refs from './refs';
import renderingCardSet from './renderingСardSet';

export default () => {
  const arrCodeCountry = Object.keys(countries);
  const arrOptionEl = arrCodeCountry.map(CodeCountry => {
    const countryEl = document.createElement('option');
    countryEl.value = CodeCountry;
    countryEl.textContent = countries[CodeCountry];
    return countryEl;
  });

  refs.countryInput.append(...arrOptionEl);

  // localStorage.removeItem('keyword');
  // localStorage.removeItem('country');
  // localStorage.removeItem('page');

  // const keyword = localStorage.getItem('keyword')?? '';
  // const country = localStorage.getItem('country')?? '';
  // const page = localStorage.getItem('page')?? '';

  // renderingCardSet(country, keyword, page);
  renderingCardSet();
};
