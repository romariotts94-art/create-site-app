const PHOTO_SET = [
  'assets/hero-architectural.png',
  'assets/interior-collection.png',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85&sat=-12',
  'https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'
];
const DISTRICTS=['Хамовники','Пресненский','Патриаршие пруды','Раменки','Замоскворечье','Таганский','Сокольники','Аэропорт','Крылатское','Даниловский','Фили-Давыдково','Мещанский'];
const NAMES=['Светлая резиденция','Пентхаус с панорамой','Квартира у парка','Городской дом','Резиденция на высоте','Лофт с террасой','Семейная квартира','Апартаменты с видом','Квартира в новом доме','Классика в центре','Тихий адрес','Квартира с кабинетом'];
const OBJECTS=Array.from({length:36},(_,i)=>{const district=DISTRICTS[i%DISTRICTS.length];const rooms=[1,2,2,3,3,4][i%6];const area=48+(i%8)*11+(rooms-1)*8;const price=14500000+(i%12)*3900000+(rooms-1)*6400000;return{id:i+1,title:`${NAMES[i%NAMES.length]} «${district}»`,district,price,area,rooms,floor:`${4+i%16}/${12+i%14}`,address:`${['ул. Усачёва','Пресненская набережная','ул. Донская','Ленинский проспект','Большой Патриарший пер.'][i%5]}, ${8+i%37}`,metro:['Спортивная','Деловой центр','Шаболовская','Ленинский проспект','Маяковская'][i%5],verified:i%4!==3,terrace:i%3===0,parking:i%2===0,newBuild:i%5===0,image:PHOTO_SET[i%PHOTO_SET.length],updated:`${1+i%12} ч. назад`}});
const COLLECTIONS=[
  {slug:'panoramnye-okna',title:'Панорамные окна',kicker:'01 / ВИДОВЫЕ КВАРТИРЫ',description:'Пространства, где город становится частью интерьера. Большие окна, высокие этажи и свет в течение всего дня.',image:PHOTO_SET[0],filter:o=>o.area>80},
  {slug:'terrasy-i-sady',title:'Террасы и сады',kicker:'02 / ОТКРЫТЫЙ ВОЗДУХ',description:'Личные террасы, зелёные дворы и редкое ощущение собственного сада в центре Москвы.',image:PHOTO_SET[5],filter:o=>o.terrace},
  {slug:'novaya-arhitektura',title:'Новая архитектура',kicker:'03 / НОВОСТРОЙКИ',description:'Дома нового поколения от архитекторов, которые думают не только о фасаде, но и о сценариях жизни.',image:PHOTO_SET[8],filter:o=>o.newBuild},
  {slug:'semejnye-kvartiry',title:'Семейные квартиры',kicker:'04 / ПРОСТРАНСТВО ДЛЯ СВОИХ',description:'Три и четыре комнаты, продуманные планировки, школы и парки рядом.',image:PHOTO_SET[3],filter:o=>o.rooms>=3}
];
const ARTICLES=[
  {slug:'kak-chitat-arhitekturu-doma',category:'ГИД ПОКУПАТЕЛЯ',minutes:8,title:'Как читать архитектуру дома: 7 признаков, которые влияют на качество жизни',image:PHOTO_SET[2],body:'Хороший дом начинается не с эффектного фасада. Важны свет, движение воздуха, сценарии входа, тишина и то, как архитектура работает каждый день.'},
  {slug:'moskva-2026-rayony',category:'АНАЛИТИКА',minutes:5,title:'Москва 2026: районы, за которыми стоит следить',image:PHOTO_SET[6],body:'Собрали карту районов с сильной инфраструктурой, зрелой городской средой и запасом для дальнейшего развития.'},
  {slug:'ipoteka-bez-illyuziy',category:'ФИНАНСЫ',minutes:6,title:'Ипотека без иллюзий: считаем бюджет на берегу',image:PHOTO_SET[10],body:'Как читать ставку, первоначальный взнос, полную стоимость кредита и дополнительные расходы до подачи заявки.'}
];
