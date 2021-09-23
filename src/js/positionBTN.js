import refs from './refs';
import renderingCardSet from './renderingСardSet';

refs.geoBTN.addEventListener('click', getGeoPosition);

function getGeoPosition() {
  let ip = ''; // Current IP
  let XMLHttp = new XMLHttpRequest();

  XMLHttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let json = JSON.parse(this.responseText);
      // Country code output, field "country_code"
      // console.log(json);
      localStorage.setItem('country', json.country_code);
      refs.countryInput.value = json.country_code;
      renderingCardSet(json.country_code, '');
    }
  };
  XMLHttp.open('GET', 'https://ipwhois.app/json/' + ip, true);
  XMLHttp.send();
}
