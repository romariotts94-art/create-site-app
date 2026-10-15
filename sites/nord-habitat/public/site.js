const apartments=window.NH_APARTMENTS||[
  {id:1,title:'Двухкомнатная с видом на реку',project:'Северный берег',area:64,rooms:2,price:19800000,metro:'Фили',tag:'Панорамный вид'},
  {id:2,title:'Семейная квартира с террасой',project:'Лесной код',area:92,rooms:3,price:28900000,metro:'Раменки',tag:'Терраса'},
  {id:3,title:'Пентхаус на верхнем этаже',project:'Высота 17',area:126,rooms:4,price:46800000,metro:'Кутузовская',tag:'Вид на город'},
  {id:4,title:'Светлая евро-трёшка',project:'Северный берег',area:78,rooms:3,price:24100000,metro:'Фили',tag:'Готовая отделка'}
];

const gallerySlides=[
  {src:'assets/nord-habitat-hero.jpg',kicker:'01 / АРХИТЕКТУРА',title:'Северный берег',desc:'Панорамный взгляд на квартал, который собирает город и природу в одном маршруте.'},
  {src:'assets/nord-interior.jpg',kicker:'02 / ИНТЕРЬЕР',title:'Свет внутри',desc:'Тихая палитра, естественный свет и детали, которые работают на ежедневный комфорт.'},
  {src:'assets/nord-courtyard.jpg',kicker:'03 / ДВОР',title:'Двор как продолжение дома',desc:'Зелёный маршрут для прогулки, встреч и паузы между делами.'},
  {src:'assets/nord-rooftop.jpg',kicker:'04 / ВЫСОТА',title:'Город сверху',desc:'Открытые террасы и горизонт, который меняется вместе с временем дня.'},
  {src:'assets/nord-lobby.jpg',kicker:'05 / ЛОББИ',title:'Первое впечатление',desc:'Лобби с гостиничным уровнем сервиса и понятным маршрутом до квартиры.'},
  {src:'assets/interior-collection.jpg',kicker:'06 / ПЛАНИРОВКА',title:'Сценарии под вас',desc:'Пространства, которые легко настроить под работу, семью и личный ритм.'},
  {src:'assets/hero-architectural.jpg',kicker:'07 / ГОРОД',title:'Москва в масштабе жизни',desc:'Связь с центром, парками, школами и привычными местами — без лишних пересадок.'},
  {src:'assets/nord-exterior.jpg',kicker:'08 / ФАСАД',title:'Материалы с характером',desc:'Архитектура, рассчитанная на долгую дистанцию и ежедневное удовольствие.'},
  {src:'assets/nord-apartment.jpg',kicker:'09 / КВАРТИРА',title:'Место для своего',desc:'Реальные бытовые сценарии становятся частью выбора ещё до просмотра.'},
  {src:'assets/nord-terrace.jpg',kicker:'10 / ТЕРРАСА',title:'Свой воздух',desc:'Личный открытый метр для завтрака, книг и длинных летних вечеров.'}
];

const toast=(message)=>{const el=document.querySelector('#toast');if(!el)return;el.textContent=message;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2200)};
const money=(value)=>new Intl.NumberFormat('ru-RU').format(value)+' ₽';

function renderCatalog(){
  const list=document.querySelector('#catalogList');
  if(!list)return;
  const query=(document.querySelector('#locationInput')?.value||'').toLowerCase();
  const rooms=document.querySelector('#roomsFilter')?.value||'';
  const budget=Number(document.querySelector('#budgetFilter')?.value||0);
  const filtered=apartments.filter((item)=>{
    const haystack=`${item.title} ${item.project} ${item.metro}`.toLowerCase();
    return(!query||haystack.includes(query))&&(!rooms||String(item.rooms)===rooms)&&(!budget||item.price<=budget)
  });
  list.innerHTML=filtered.map((item)=>`<article class="project-card"><div class="project-image image-${item.id%3+1}"></div><div class="project-card-body"><span>${item.project} · ${item.metro}</span><h3>${item.title}</h3><p>${item.area} м² · ${item.rooms} комнаты · ${item.tag}</p><strong>${money(item.price)}</strong><a href="property.html?id=${item.id}">Открыть квартиру ↗</a></div></article>`).join('')||'<p>По этому запросу квартир не найдено.</p>';
}

function updateFinance(){
  const price=Number(document.querySelector('#priceRange')?.value||22000000);
  const down=Number(document.querySelector('#downRange')?.value||30);
  const rate=.18/12,n=20*12,loan=price*(1-down/100);
  const payment=loan*rate*Math.pow(1+rate,n)/(Math.pow(1+rate,n)-1);
  document.querySelector('#priceOut')?.replaceChildren(money(price));
  document.querySelector('#downOut')?.replaceChildren(down+'%');
  document.querySelector('#paymentOut')?.replaceChildren('≈ '+money(Math.round(payment/1000)*1000)+' / месяц');
}

function initSlider(){
  const image=document.querySelector('#slideImage');
  if(!image)return;
  const current=document.querySelector('#slideCurrent');
  const kicker=document.querySelector('#slideKicker');
  const title=document.querySelector('#slideTitle');
  const description=document.querySelector('#slideDescription');
  const dots=document.querySelector('#slideDots');
  const thumbs=document.querySelector('#slideThumbs');
  const pause=document.querySelector('#slidePause');
  let index=0;
  let paused=false;

  dots.innerHTML=gallerySlides.map((_,i)=>`<button type="button" aria-label="Кадр ${i+1}" data-slide-index="${i}"></button>`).join('');
  thumbs.innerHTML=gallerySlides.map((slide,i)=>`<button type="button" class="slider-thumb" aria-label="Открыть кадр ${i+1}" data-slide-index="${i}"><img src="${slide.src}" alt=""></button>`).join('');

  const paint=(next,animate=true)=>{
    index=(next+gallerySlides.length)%gallerySlides.length;
    const slide=gallerySlides[index];
    image.classList.toggle('is-changing',animate);
    image.src=slide.src;
    image.alt=slide.title;
    current.textContent=String(index+1).padStart(2,'0');
    kicker.textContent=slide.kicker;
    title.textContent=slide.title;
    description.textContent=slide.desc;
    dots.querySelectorAll('button').forEach((button,i)=>button.classList.toggle('active',i===index));
    thumbs.querySelectorAll('.slider-thumb').forEach((button,i)=>button.classList.toggle('active',i===index));
    const activeThumb=thumbs.querySelector('.active');
    if(activeThumb){
      const targetLeft=Math.max(0,activeThumb.offsetLeft-(thumbs.clientWidth-activeThumb.offsetWidth)/2);
      thumbs.scrollTo({left:targetLeft,behavior:'smooth'});
    }
    if(animate)setTimeout(()=>image.classList.remove('is-changing'),460);
  };

  document.querySelector('#slidePrev')?.addEventListener('click',()=>paint(index-1));
  document.querySelector('#slideNext')?.addEventListener('click',()=>paint(index+1));
  dots.addEventListener('click',(event)=>{const button=event.target.closest('[data-slide-index]');if(button)paint(Number(button.dataset.slideIndex))});
  thumbs.addEventListener('click',(event)=>{const button=event.target.closest('[data-slide-index]');if(button)paint(Number(button.dataset.slideIndex))});
  pause?.addEventListener('click',()=>{paused=!paused;pause.textContent=paused?'Продолжить показ':'Пауза анимации';});
  setInterval(()=>{if(!paused)paint(index+1)},5000);
  paint(0,false);
}

function initMotion(){
  const elements=document.querySelectorAll('.section,.project-card,.journal-card,.service-grid article,.finance-card');
  elements.forEach((element)=>element.dataset.reveal='');
  if(!('IntersectionObserver' in window)){elements.forEach((element)=>element.classList.add('is-visible'));return;}
  const observer=new IntersectionObserver((entries)=>entries.forEach((entry)=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.12});
  elements.forEach((element)=>observer.observe(element));
}

function initDistricts(){
  document.querySelectorAll('.district-list button').forEach((button)=>button.addEventListener('click',()=>{
    document.querySelectorAll('.district-list button').forEach((item)=>item.classList.remove('active'));
    button.classList.add('active');
    toast(`Район выбран: ${button.querySelector('b')?.textContent||'готово'}`);
  }));
}

function init(){
  document.querySelectorAll('#priceRange,#downRange').forEach((el)=>el.addEventListener('input',updateFinance));
  updateFinance();
  initSlider();
  initMotion();
  initDistricts();
  document.querySelector('#aiSubmit')?.addEventListener('click',()=>{const value=document.querySelector('#aiInput').value.trim();toast(value?`Подбираем варианты по запросу «${value}»`:'Опишите желаемую квартиру — и мы начнём подбор')});
  document.querySelector('#findButton')?.addEventListener('click',()=>{
    if(document.querySelector('#catalogList'))renderCatalog();
    else{const params=new URLSearchParams({location:document.querySelector('#locationInput').value,rooms:document.querySelector('#roomsFilter').value,budget:document.querySelector('#budgetFilter').value});location.href='catalog.html?'+params}
  });
  document.querySelectorAll('#locationInput,#roomsFilter,#budgetFilter').forEach((el)=>el.addEventListener('input',renderCatalog));
  document.querySelector('[data-action="favorites"]')?.addEventListener('click',()=>toast('Избранное пока пусто — добавьте квартиру в каталоге'));
  renderCatalog();
}

init();
