
function repoPrefix(){
  const path = location.pathname;
  const dirs = ["auth","communities","places","posts","profile","saved","legal"];
  return dirs.some(d => path.includes("/"+d+"/")) ? "../" : "";
}
function link(path){ return repoPrefix()+path.replace(/^\/+/,""); }


const D=window.MDN_DATA||{};
const KEY="mdn:v9_1:";
function getUser(){return JSON.parse(localStorage.getItem(KEY+"user")||"null")}
function setUser(u){localStorage.setItem(KEY+"user",JSON.stringify(u))}
function getSaved(){return new Set(JSON.parse(localStorage.getItem(KEY+"saved")||"[]"))}
function setSaved(s){localStorage.setItem(KEY+"saved",JSON.stringify([...s]))}
function getJoined(){return new Set(JSON.parse(localStorage.getItem(KEY+"joined")||'["nightlife"]'))}
function setJoined(s){localStorage.setItem(KEY+"joined",JSON.stringify([...s]))}
function toast(msg){
  let r=document.getElementById("toast-root");
  if(!r){r=document.createElement("div");r.id="toast-root";document.body.appendChild(r)}
  const el=document.createElement("div");el.className="toast";el.textContent=msg;r.appendChild(el);
  requestAnimationFrame(()=>el.classList.add("show"));
  setTimeout(()=>{el.classList.remove("show");setTimeout(()=>el.remove(),180)},1700)
}
function qs(name){return new URLSearchParams(location.search).get(name)}
function initials(s){return String(s||"U").split(/[_\s]+/).map(x=>x[0]).join("").slice(0,2).toUpperCase()}
function siteHeader(active=""){
  const u=getUser();
  return `<header class="topbar">
    <a class="brand" href="${link('index.html')}"><span class="mark">MN</span><span><b>Managua de Noche</b><small>Comunidad local</small></span></a>
    <nav>
      <a class="${active==="home"?"active":""}" href="${link('index.html')}">Inicio</a>
      <a class="${active==="communities"?"active":""}" href="${link('communities/index.html')}">Comunidades</a>
      <a class="${active==="places"?"active":""}" href="${link('places/index.html')}">Lugares</a>
      <a class="${active==="saved"?"active":""}" href="${link('saved/index.html')}">Guardados</a>
    </nav>
    <div class="account">${u?`<a class="newpost" href="${link('posts/new.html')}">+ Publicar</a><a class="avatar" href="${link('profile/index.html')}">${initials(u.username)}</a>`:`<a class="login" href="${link('auth/register.html')}">Crear cuenta</a>`}</div>
  </header>`;
}
function siteFooter(){
  return `<footer><div><b>Managua de Noche</b><span>Hecho desde Managua.</span></div><div><a href="${link('about.html')}">Acerca</a><a href="${link('legal/privacy.html')}">Privacidad</a><a href="${link('legal/terms.html')}">Términos</a></div></footer>`;
}
function renderHeader(active){const x=document.getElementById("site-header");if(x)x.innerHTML=siteHeader(active)}
function renderFooter(){const x=document.getElementById("site-footer");if(x)x.innerHTML=siteFooter()}
function communityName(id){return D.communities.find(c=>c.id===id)?.name||id}
function postCard(p){
  const saved=getSaved();
  return `<article class="post-card">
    <div class="vote-col"><button>▲</button><b>${p.score}</b><button>▼</button></div>
    <div class="post-main">
      <div class="meta"><a href="${link('communities/community.html')}?id=${p.community}">${communityName(p.community)}</a><span>por u/${p.author}</span><span>· ${p.time}</span></div>
      <h2><a href="${link('posts/post.html')}?id=${p.id}">${p.title}</a></h2>
      <p>${p.body}</p>
      <div class="post-actions"><a href="${link('posts/post.html')}?id=${p.id}">💬 ${p.comments} comentarios</a><button onclick="toggleSave('${p.id}',this)">${saved.has(p.id)?"♥ Guardado":"♡ Guardar"}</button></div>
    </div>
  </article>`;
}
function toggleSave(id,btn){
  const s=getSaved(); s.has(id)?s.delete(id):s.add(id); setSaved(s);
  if(btn) btn.textContent=s.has(id)?"♥ Guardado":"♡ Guardar";
  toast(s.has(id)?"Guardado":"Quitado de guardados");
}
function placeCard(p){
  return `<article class="place-card"><div class="place-art">${initials(p.name)}</div><div class="place-body">
    <div class="meta"><span>${p.type}</span><span>· ${p.area}</span></div>
    <h3><a href="${link('places/place.html')}?id=${p.id}">${p.name}</a></h3><p>${p.summary}</p>
    <div class="chips">${p.tags.map(t=>`<span>${t}</span>`).join("")}</div>
    <div class="place-foot"><span>★ ${p.rating} · ${p.reviews} reseñas</span><a href="${link('places/place.html')}?id=${p.id}">Ver lugar →</a></div>
  </div></article>`;
}
function communityCard(c){
  const joined=getJoined();
  return `<article class="community-card"><div class="community-icon">${c.name[0]}</div><div><h3><a href="/communities/community.html?id=${c.id}">${c.name}</a></h3><p>${c.desc}</p><span>${c.members.toLocaleString()} miembros</span></div><button onclick="toggleJoin('${c.id}',this)">${joined.has(c.id)?"Unido":"Unirme"}</button></article>`;
}
function toggleJoin(id,btn){
  const u=getUser(); if(!u){location.href="${link('auth/register.html')}";return}
  const j=getJoined(); j.has(id)?j.delete(id):j.add(id); setJoined(j); btn.textContent=j.has(id)?"Unido":"Unirme"; toast(j.has(id)?"Te uniste":"Saliste de la comunidad");
}
document.addEventListener("DOMContentLoaded",()=>{renderFooter()});
