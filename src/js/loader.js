import countries from '../statics/countries.json';
import refs from './refs';

export default () => {
  const arrCodeCountry = Object.keys(countries);
  const arrOptionEl = arrCodeCountry.map(CodeCountry => {
    const countryEl = document.createElement('option');
    countryEl.value = CodeCountry;
    countryEl.textContent = countries[CodeCountry];
    return countryEl;
  });

  refs.countryInput.append(...arrOptionEl);
};
