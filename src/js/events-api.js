const API_KEY = 'GcvUr561HaBI30kU58PhKSa9RWqvwjKx';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
const breakPoint = 'events.json';

/**
 * Возвращает Promise с объектом страницы с карточками событий , согласно фильтру
 *  по ключевым словам, коду страны ISO alpha-2 и номеру страницы.
 * с ресурса "ticketmaster.com".
 *
 * @param {string} country Код страны.
 * @param {string} keyword Ключевое слово или часть для фильтрации по названию.
 * @param {string} page Номер страницы для вывода.
 * @return {object} Promise объект для отрисовки страницы
 */
function getEventsByOptions(country = false, keyword = false, page = false) {
  keyword = keyword ? `&keyword=${keyword}` : '';
  page = page ? `&page=${page}` : '';
  country = country ? `&countryCode=${country}` : '';

  const url = `${BASE_URL}${breakPoint}?apikey=${API_KEY}&locale=*` + keyword + country + page;

  return fetchJSON(url).then(res => getPage(res));
}

function fetchJSON(url) {
  return fetch(url).then(res => res.json());
}

function getPage(obj) {
  const arrCards = obj?._embedded?.events?.map(item => {
    return {
      id: item?.id,
      name: item?.name,
      date: item?.dates?.start?.localDate,
      promoter: item?.promoter?.name,
      images: item?.images,
    };
  });
  return {
    number: obj?.page?.number,
    size: obj?.page?.size,
    totalElements: obj?.page?.totalElements,
    totalPages: obj?.page?.totalPages,
    cards: arrCards,
  };
}

export { getEventsByOptions };
