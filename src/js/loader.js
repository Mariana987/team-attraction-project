import countries from '../statics/countries.json';
import refs from './refs';
import renderingCardSet from './renderingСardSet';

export default () => {
  const keyword = localStorage.getItem('keyword');
  const country = localStorage.getItem('country');
  const page = localStorage.getItem('page');

  const arrCodeCountry = Object.keys(countries);
  const arrOptionEl = arrCodeCountry.map(CodeCountry => {
    const countryEl = document.createElement('option');
    if (CodeCountry === country) {
      countryEl.selected = true;
    }
    countryEl.value = CodeCountry;
    countryEl.textContent = countries[CodeCountry];
    return countryEl;
  });

  refs.countryInput.append(...arrOptionEl);

  refs.keywordInput.value = keyword;
  renderingCardSet(country, keyword, page);
};
