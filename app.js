const state = { sites: [], query: "", category: "" };
const catalogEl = document.querySelector("#catalog");
const emptyEl = document.querySelector("#empty");
const countEl = document.querySelector("#site-count");
const searchEl = document.querySelector("#search");
const categoryEl = document.querySelector("#category");
const localFile = window.location.protocol === "file:";
const bundleRoot = localFile ? "../dist/" : "./";
const fallbackCatalog = [{
  id: "atelier-real-estate",
  slug: "atelier-real-estate",
  title: "Atelier — недвижимость с точностью",
  status: "published",
  category: "Недвижимость",
  price: 1000000,
  previewUrl: "sites/atelier-real-estate/public/index.html",
  previewImage: "sites/atelier-real-estate/public/assets/hero-architectural.jpg",
  description: "Многостраничная премиальная платформа недвижимости с каталогом, подборками, статьями, видео и картой.",
  tagline: "Премиальный сайт недвижимости, который помогает продавать доверие и объекты",
  technologies: ["HTML5", "CSS3", "Vanilla JavaScript", "Responsive UI"],
  suitableFor: ["Агентства недвижимости", "Девелоперы", "Премиальные ЖК"],
  included: ["Многостраничный сайт", "Каталог объектов", "Видео и галереи", "Ипотечный калькулятор"]
}];

function pathFromCatalog(url) {
  if (!url) return "";
  if (url.startsWith("/marketplace/")) return `${bundleRoot}${url.slice("/marketplace/".length)}`;
  if (url.startsWith("/")) return `${bundleRoot}${url.slice(1)}`;
  return `${bundleRoot}${url.replace(/^\.\//, "")}`;
}

function rubles(value) {
  return new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(value);
}

function filteredSites() {
  const query = state.query.trim().toLowerCase();
  return state.sites.filter((site) => {
    const text = [site.title, site.category, site.description, ...(site.features || [])].join(" ").toLowerCase();
    return (!query || text.includes(query)) && (!state.category || site.category === state.category);
  });
}

function render() {
  const sites = filteredSites();
  countEl.textContent = state.sites.length;
  emptyEl.hidden = sites.length > 0;
  catalogEl.innerHTML = sites.map((site, index) => `
    <article class="site-card" data-preview="${site.id}" tabindex="0" role="${site.previewUrl ? "link" : "article"}" aria-label="${site.previewUrl ? `Открыть сайт: ${site.title}` : site.title}">
      <div class="site-art"><img class="site-art-image" src="${pathFromCatalog(site.previewImage || site.previewUrl)}" alt=""><span class="site-number">${String(index + 1).padStart(2, "0")} / ${String(state.sites.length).padStart(2, "0")}</span><span class="site-status">${site.status === "published" ? "Готов к запуску" : "На доработке"}</span><h2>${site.title}</h2></div>
      <div class="site-body">
        <div class="site-meta"><span>${site.category}</span><span>Лицензия включена</span></div>
        <p class="tagline">${site.tagline || site.description || "Готовый сайт с исходниками и демо-версией."}</p>
        <p class="description">${site.description || "Готовый сайт с исходниками и демо-версией."}</p>
        <div class="label-group"><span class="label-title">Технологии</span><div class="feature-list">${(site.technologies || []).slice(0, 4).map((feature) => `<span class="feature">${feature}</span>`).join("")}</div></div>
        <div class="label-group"><span class="label-title">Подходит для</span><div class="feature-list">${(site.suitableFor || []).slice(0, 3).map((feature) => `<span class="feature feature-soft">${feature}</span>`).join("")}</div></div>
        <div class="included">✓ ${(site.included || []).slice(0, 3).join(" · ")}</div>
        <div class="site-footer"><span class="price">${rubles(site.price)}</span><span class="button">${site.previewUrl ? "Открыть сайт ↗" : "В разработке"}</span></div>
      </div>
    </article>`).join("");
}

function openPreview(site) {
  if (!site.previewUrl) return;
  const url = pathFromCatalog(site.previewUrl);
  window.location.assign(url);
}

async function init() {
  try {
    const response = await fetch(`${bundleRoot}catalog/sites.json?v=assets-14`);
    if (!response.ok) throw new Error(`Catalog request failed: ${response.status}`);
    state.sites = await response.json();
    [...new Set(state.sites.map((site) => site.category).filter(Boolean))].sort().forEach((category) => {
      categoryEl.insertAdjacentHTML("beforeend", `<option value="${category}">${category}</option>`);
    });
    render();
  } catch (error) {
    state.sites = window.BUYSITE_CATALOG || fallbackCatalog;
    render();
    console.error(error);
  }
}

searchEl.addEventListener("input", (event) => { state.query = event.target.value; render(); });
categoryEl.addEventListener("change", (event) => { state.category = event.target.value; render(); });
function openFromCard(card) {
  const site = state.sites.find((item) => item.id === card.dataset.preview);
  if (site) openPreview(site);
}

catalogEl.addEventListener("click", (event) => {
  const card = event.target.closest(".site-card");
  if (card) openFromCard(card);
});
catalogEl.addEventListener("keydown", (event) => {
  const card = event.target.closest(".site-card");
  if (!card || !["Enter", " "].includes(event.key)) return;
  event.preventDefault();
  openFromCard(card);
});
init();
