import './sass/main.scss';
import './js/first_load_page-animation'
import loader from './js/loader';

// ----------------------------------Loader--------------------------------------------------------->
document.addEventListener('DOMContentLoaded', loader);
// ----------------------------------Pagination----------------------------------------------------->
import { pagination, onPaginationBarPush } from './js/pagination.js';
pagination.on('afterMove', onPaginationBarPush);

// import { getEventsByOptions, getEventsByAttractions } from './js/events-api';
// import { getEventById } from './js/events-api';

// Примеры использования ф-ии getEventsByOptions(country, keyword, page)
// Все параметры не обязательные.
// Картинки, пока не знаю какие нужны, включил все - объектом.
// Для рендеринга страницы при поиске, пагинации и загрузке стр.
// Раскоментируйте строки по очереди, в консоли вывод данных.

// getEventsByOptions().then(res => console.log(res));
// getEventsByOptions('US', '', 3).then(res => console.log({ res }));
// getEventsByOptions('US', '', 3).then(res => console.log({ res }));
// getEventsByOptions('', 'Nick').then(res => console.log(res));
// getEventsByOptions('CZ', 'au').then(res => console.log(res));

// Примеры использования ф-ии getEventById(id)
// Для рендеринга модалки.
// Раскоментируйте строки по очереди, в консоли вывод данных

// getEventById('vvG1VZpsGsnGw_').then(res => console.log(res));
// getEventById('G5v0Zpsu1edX1').then(res => console.log(res));

// Примеры использования ф-ии getEventsByAttractions(id, page)
// Для рендеринга страницы карточек конкретного исполнителя.

// getEventsByAttractions('K8vZ9171oZf,K8vZ9171o57', '1').then(res => console.log(res));

// function getEvent() {
//   fetch(
//     'https://app.ticketmaster.com/discovery/v2/events.json?apikey=GcvUr561HaBI30kU58PhKSa9RWqvwjKx',
//   ).then(data => console.log(data));
// }

// getEvent();

import './js/scroll'; 
import './js/button_more';

// var goTopBtn = document.querySelector('.back_to_top');  

// window.addEventListener('scroll', trackScroll); 
// goTopBtn.addEventListener('click', backToTop); 
