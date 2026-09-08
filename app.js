
const CAMPAIGN="managua-de-noche-v6";
const ENDPOINT="";
const DATA=window.MDN_DATA;

const favorites=new Set(JSON.parse(localStorage.getItem("mdn:favorites")||"[]"));

function track(event,extra={}){
  const payload={timestamp:new Date().toISOString(),campaign:CAMPAIGN,event,...extra};
  console.log("[MDN]",payload);
  if(!ENDPOINT)return;
  fetch(ENDPOINT,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(payload)}).catch(()=>{});
}
function protectedAction(action){
  track("protected_action_clicked",{action});
  const modal=document.getElementById("authModal");
  if(modal){modal.dataset.action=action;modal.classList.add("open");document.body.classList.add("modal-open");}
  else location.href="access.html?action="+encodeURIComponent(action);
}
function closeAuth(){document.getElementById("authModal")?.classList.remove("open");document.body.classList.remove("modal-open")}
function providerFlow(provider){
  const action=document.getElementById("authModal")?.dataset.action||"unknown";
  track("provider_login_clicked",{provider,action});
  location.href="failed.html?source="+encodeURIComponent(provider)+"&action="+encodeURIComponent(action);
}
function toast(msg){const w=document.getElementById("toasts");if(!w)return;const e=document.createElement("div");e.className="toast";e.textContent=msg;w.appendChild(e);requestAnimationFrame(()=>e.classList.add("show"));setTimeout(()=>{e.classList.remove("show");setTimeout(()=>e.remove(),200)},1800)}
function toggleFav(id){
  if(favorites.has(id)){favorites.delete(id);toast("Quitado de guardados")}else{favorites.add(id);toast("Guardado para después")}
  localStorage.setItem("mdn:favorites",JSON.stringify([...favorites]));
  renderPlaces();
}
function placeCard(p){
  return `<article class="place-card">
    <a href="place.html?id=${p.id}" class="place-visual">${p.image?`<img src="${p.image}" alt="${p.name}">`:`<div class="place-placeholder">${p.name.split(" ").map(x=>x[0]).join("").slice(0,3)}</div>`}</a>
    <div class="place-copy">
      <div class="place-meta"><span>${p.type}</span><span>${p.area}</span></div>
      <h3><a href="place.html?id=${p.id}">${p.name}</a></h3>
      <p>${p.summary}</p>
      <div class="tags">${p.tags.map(t=>`<span>${t}</span>`).join("")}</div>
      <div class="place-bottom"><span>${p.rating?`★ ${p.rating} · ${p.reviews} reseñas`:""}</span><button class="${favorites.has(p.id)?"saved":""}" onclick="toggleFav('${p.id}')">${favorites.has(p.id)?"♥":"♡"}</button></div>
      ${p.credit?`<small class="credit">${p.credit}</small>`:""}
    </div>
  </article>`;
}
function articleCard(a){
  return `<article class="article-card"><span>${a.category}</span><h3><a href="article.html?id=${a.id}">${a.title}</a></h3><p>${a.deck}</p><a class="read" href="article.html?id=${a.id}">Leer artículo →</a></article>`;
}
function renderPlaces(list=DATA.places){
  const m=document.getElementById("placesGrid");if(m)m.innerHTML=list.map(placeCard).join("");
}
function renderArticles(list=DATA.articles){
  const m=document.getElementById("articlesGrid");if(m)m.innerHTML=list.map(articleCard).join("");
}
function initHome(){
  renderPlaces(DATA.places.slice(0,6));renderArticles(DATA.articles.slice(0,3));track("home_view");
  document.getElementById("emailForm")?.addEventListener("submit",e=>{e.preventDefault();const email=document.getElementById("authEmail").value.trim();const action=document.getElementById("authModal").dataset.action||"unknown";track("email_login_submitted",{email,action});location.href="failed.html?source=email&action="+encodeURIComponent(action)});
}
function initExplore(){
  renderPlaces();
  const input=document.getElementById("search");
  const filter=document.getElementById("areaFilter");
  function apply(){
    const q=(input.value||"").toLowerCase(), a=filter.value;
    renderPlaces(DATA.places.filter(p=>(!q||(p.name+" "+p.summary+" "+p.tags.join(" ")).toLowerCase().includes(q))&&(!a||p.area===a)));
  }
  input.addEventListener("input",apply);filter.addEventListener("change",apply);track("explore_view");
}
function initArticles(){renderArticles();track("articles_view")}
function initArticle(){
  const id=new URLSearchParams(location.search).get("id")||DATA.articles[0].id;
  const a=DATA.articles.find(x=>x.id===id)||DATA.articles[0];
  document.title=a.title+" — Managua de Noche";
  document.getElementById("articleCategory").textContent=a.category;
  document.getElementById("articleTitle").textContent=a.title;
  document.getElementById("articleDeck").textContent=a.deck;
  document.getElementById("articleBody").innerHTML=a.body.map(p=>`<p>${p}</p>`).join("");
  document.getElementById("sourceLabel").textContent=a.source_label;
  document.getElementById("sourceLinks").innerHTML=a.source_urls.map((u,i)=>`<a href="${u}" target="_blank" rel="noopener">Fuente ${i+1}</a>`).join(" · ");
  track("article_view",{id:a.id});
}
function initPlace(){
  const id=new URLSearchParams(location.search).get("id")||DATA.places[0].id;
  const p=DATA.places.find(x=>x.id===id)||DATA.places[0];
  document.title=p.name+" — Managua de Noche";
  document.getElementById("placeName").textContent=p.name;
  document.getElementById("placeType").textContent=p.type+" · "+p.area;
  document.getElementById("placeSummary").textContent=p.summary;
  document.getElementById("placeWhy").textContent=p.why;
  document.getElementById("placeStats").innerHTML=`${p.rating?`<span><b>${p.rating}</b> rating</span>`:""}${p.reviews?`<span><b>${p.reviews}</b> reseñas</span>`:""}${p.price?`<span><b>${p.price}</b> rango</span>`:""}`;
  document.getElementById("placeTags").innerHTML=p.tags.map(t=>`<span>${t}</span>`).join("");
  const fig=document.getElementById("placeFigure");
  if(p.image){document.getElementById("placeImage").src=p.image;document.getElementById("placeImage").alt=p.name;document.getElementById("placeCredit").textContent=p.credit}else fig.classList.add("hidden");
  if(p.source_url){document.getElementById("sourceBox").innerHTML=`Fuente editorial: ${p.source}. <a href="${p.source_url}" target="_blank" rel="noopener">Ver fuente</a>`}else document.getElementById("sourceBox").textContent="Fuente editorial: "+p.source;
  track("place_view",{id:p.id});
}
