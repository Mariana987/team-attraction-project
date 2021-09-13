import './sass/main.scss';

import { getEventsByOptions } from './js/events-api';

// Примеры использования ф-ии getEventsByOptions(country, keyword, page)
// Все параметры не обязательные.
// Картинки, пока не знаю какие нужны, включил все - объектом.
// Для рендеринга страницы при поиске, пагинации и загрузке стр.
// Раскоментируйте строки по очереди, в консоли вывод данных.

// getEventsByOptions().then(res => console.log(res));
// getEventsByOptions('US', '', 3).then(res => console.log({ res }));
// getEventsByOptions('', 'Nick').then(res => console.log(res));
// getEventsByOptions('CZ', 'au').then(res => console.log(res));

import './js/renderingСardSet';