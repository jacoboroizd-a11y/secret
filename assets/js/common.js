
const D=window.MDN_DATA||{};
const KEY="mdn:v10:";
const DEPTH_SEGMENTS=["discover","communities","places","posts","events","guides","profile","saved","notifications","settings","auth","moderation","legal"];

function prefix(){
  const parts=location.pathname.split("/").filter(Boolean);
  const idx=parts.findIndex(p=>DEPTH_SEGMENTS.includes(p));
  return idx>=0?"../":"";
}
function R(path){return prefix()+String(path).replace(/^\/+/,"")}
function qs(name){return new URLSearchParams(location.search).get(name)}
function getJSON(k,fallback){try{return JSON.parse(localStorage.getItem(KEY+k))??fallback}catch{return fallback}}
function setJSON(k,v){localStorage.setItem(KEY+k,JSON.stringify(v))}
function getUser(){return getJSON("user",null)}
function getSaved(){return new Set(getJSON("saved",[]))}
function getJoined(){return new Set(getJSON("joined",["nightlife","comida"]))}
function getFollowing(){return new Set(getJSON("followingPlaces",[]))}
function getVotes(){return getJSON("votes",{})}
function getUserPosts(){return getJSON("userPosts",[])}
function getUserComments(){return getJSON("userComments",{})}
function allPosts(){return [...getUserPosts(),...(D.posts||[])]}
function initials(s){return String(s||"U").split(/[_\s]+/).filter(Boolean).map(x=>x[0]).join("").slice(0,2).toUpperCase()}
function community(id){return D.communities.find(c=>c.id===id)}
function place(id){return D.places.find(p=>p.id===id)}
function guide(id){return D.guides.find(g=>g.id===id)}
function findPost(id){return allPosts().find(p=>p.id===id)}
function score(post){const v=getVotes();return (post.score||0)+(v[post.id]||0)}
function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]))}
function formatNumber(n){return Number(n||0).toLocaleString("es-NI")}
function requireUser(returnTo=""){if(getUser())return true;location.href=R("auth/register.html")+(returnTo?("?return="+encodeURIComponent(returnTo)):"");return false}

function toast(msg){
  let root=document.getElementById("toast-root");
  if(!root){root=document.createElement("div");root.id="toast-root";document.body.appendChild(root)}
  const el=document.createElement("div");el.className="toast";el.textContent=msg;root.appendChild(el);
  requestAnimationFrame(()=>el.classList.add("show"));
  setTimeout(()=>{el.classList.remove("show");setTimeout(()=>el.remove(),180)},1800);
}
function header(active=""){
  const u=getUser();
  return `<header class="topbar">
    <a class="brand" href="${R("index.html")}"><span class="mark">MN</span><span><b>Managua de Noche</b><small>La ciudad, entre todos</small></span></a>
    <nav class="desktop-nav">
      <a class="${active==="home"?"active":""}" href="${R("index.html")}">Inicio</a>
      <a class="${active==="discover"?"active":""}" href="${R("discover/index.html")}">Explorar</a>
      <a class="${active==="communities"?"active":""}" href="${R("communities/index.html")}">Comunidades</a>
      <a class="${active==="places"?"active":""}" href="${R("places/index.html")}">Lugares</a>
      <a class="${active==="guides"?"active":""}" href="${R("guides/index.html")}">Guías</a>
    </nav>
    <div class="header-actions">
      <button class="icon-btn" onclick="openGlobalSearch()" title="Buscar">⌕</button>
      ${u?`<a class="icon-btn" href="${R("notifications/index.html")}" title="Notificaciones">♢</a><a class="newpost" href="${R("posts/new.html")}">+ Publicar</a><button class="avatar" onclick="toggleAccountMenu()">${initials(u.username)}</button>`:`<a class="login" href="${R("auth/register.html")}">Crear cuenta</a>`}
      <button class="mobile-menu" onclick="toggleMobileNav()">☰</button>
    </div>
  </header>
  <div id="account-menu"></div><div id="mobile-nav"></div>`;
}
function footer(){
  return `<footer>
    <div class="footer-brand"><b>Managua de Noche</b><span>Comunidad, lugares y planes construidos entre todos.</span></div>
    <div class="footer-cols">
      <div><b>Explorar</b><a href="${R("discover/index.html")}">Descubrir</a><a href="${R("places/index.html")}">Lugares</a><a href="${R("events/index.html")}">Eventos</a></div>
      <div><b>Comunidad</b><a href="${R("communities/index.html")}">Comunidades</a><a href="${R("guides/index.html")}">Guías</a><a href="${R("moderation/index.html")}">Moderación</a></div>
      <div><b>Legal</b><a href="${R("about.html")}">Acerca</a><a href="${R("legal/privacy.html")}">Privacidad</a><a href="${R("legal/terms.html")}">Términos</a></div>
    </div>
  </footer>`;
}
function mountChrome(active){document.getElementById("site-header").innerHTML=header(active);document.getElementById("site-footer").innerHTML=footer();applyTheme()}

function applyTheme(){
  const theme=localStorage.getItem(KEY+"theme")||"light";
  document.documentElement.dataset.theme=theme;
}
function toggleTheme(){
  const next=(localStorage.getItem(KEY+"theme")||"light")==="light"?"dark":"light";
  localStorage.setItem(KEY+"theme",next);applyTheme();toast(next==="dark"?"Modo oscuro":"Modo claro");
}
function toggleAccountMenu(){
  const root=document.getElementById("account-menu"),u=getUser();if(!root||!u)return;
  root.innerHTML=root.innerHTML?"":
  `<div class="account-menu">
    <div class="account-head"><span class="avatar large">${initials(u.username)}</span><div><b>u/${escapeHtml(u.username)}</b><small>${escapeHtml(u.email||"")}</small></div></div>
    <a href="${R("profile/index.html")}">Mi perfil</a>
    <a href="${R("saved/index.html")}">Guardados</a>
    <a href="${R("settings/index.html")}">Configuración</a>
    <button onclick="logout()">Cerrar sesión</button>
  </div>`;
}
function logout(){localStorage.removeItem(KEY+"user");location.href=R("index.html")}
function toggleMobileNav(){
  const root=document.getElementById("mobile-nav");if(!root)return;
  root.innerHTML=root.innerHTML?"":
  `<div class="mobile-drawer-bg" onclick="toggleMobileNav()"></div><aside class="mobile-drawer">
    <button onclick="toggleMobileNav()">×</button>
    <a href="${R("index.html")}">Inicio</a><a href="${R("discover/index.html")}">Explorar</a><a href="${R("communities/index.html")}">Comunidades</a>
    <a href="${R("places/index.html")}">Lugares</a><a href="${R("events/index.html")}">Eventos</a><a href="${R("guides/index.html")}">Guías</a>
    <a href="${R("saved/index.html")}">Guardados</a>
  </aside>`;
}
function openGlobalSearch(){
  const root=document.getElementById("overlay-root")||document.body.appendChild(Object.assign(document.createElement("div"),{id:"overlay-root"}));
  root.innerHTML=`<div class="modal-bg" onclick="closeOverlay()"></div><section class="search-modal">
    <div class="search-modal-head"><b>Buscar en Managua de Noche</b><button onclick="closeOverlay()">×</button></div>
    <input id="globalSearch" autofocus placeholder="Lugar, comunidad, pregunta..." oninput="renderGlobalResults(this.value)">
    <div id="globalResults" class="global-results"><div class="search-hint">Probá “Los Robles”, “primera cita” o “café”.</div></div>
  </section>`;
  setTimeout(()=>document.getElementById("globalSearch")?.focus(),50);
}
function renderGlobalResults(q){
  const root=document.getElementById("globalResults"),s=q.trim().toLowerCase();
  if(!s){root.innerHTML='<div class="search-hint">Probá “Los Robles”, “primera cita” o “café”.</div>';return}
  const places=D.places.filter(p=>(p.name+" "+p.area+" "+p.tags.join(" ")+" "+p.summary).toLowerCase().includes(s)).slice(0,4);
  const posts=allPosts().filter(p=>(p.title+" "+p.body).toLowerCase().includes(s)).slice(0,4);
  const comms=D.communities.filter(c=>(c.name+" "+c.desc).toLowerCase().includes(s)).slice(0,3);
  root.innerHTML=`${places.map(p=>`<a href="${R("places/place.html")}?id=${p.id}"><span>Lugar</span><b>${p.name}</b><small>${p.area}</small></a>`).join("")}
  ${posts.map(p=>`<a href="${R("posts/post.html")}?id=${p.id}"><span>Post</span><b>${p.title}</b><small>${community(p.community)?.name||""}</small></a>`).join("")}
  ${comms.map(c=>`<a href="${R("communities/community.html")}?id=${c.id}"><span>Comunidad</span><b>${c.name}</b><small>${formatNumber(c.members)} miembros</small></a>`).join("")}
  ${!places.length&&!posts.length&&!comms.length?'<div class="search-hint">Nada por aquí todavía.</div>':""}`;
}
function closeOverlay(){const r=document.getElementById("overlay-root");if(r)r.innerHTML=""}

function postCard(p){
  const saved=getSaved(),c=community(p.community), comments=[...(p.comments||[]),...(getUserComments()[p.id]||[])];
  return `<article class="post-card">
    <div class="vote-col"><button onclick="votePost('${p.id}',1)">▲</button><b>${score(p)}</b><button onclick="votePost('${p.id}',-1)">▼</button></div>
    <div class="post-main">
      <div class="meta"><a href="${R("communities/community.html")}?id=${p.community}">${c?.name||p.community}</a><span>por u/${escapeHtml(p.author)}</span><span>· ${p.time||"ahora"}</span></div>
      <h2><a href="${R("posts/post.html")}?id=${p.id}">${escapeHtml(p.title)}</a></h2>
      <p>${escapeHtml(p.body)}</p>
      <div class="post-actions">
        <a href="${R("posts/post.html")}?id=${p.id}">💬 ${comments.length} comentarios</a>
        <button onclick="toggleSave('${p.id}',this)">${saved.has(p.id)?"♥ Guardado":"♡ Guardar"}</button>
        <button onclick="shareItem('${R("posts/post.html")}?id=${p.id}')">↗ Compartir</button>
        <button onclick="openReport('post','${p.id}')">···</button>
      </div>
    </div>
  </article>`;
}
function votePost(id,delta){
  if(!requireUser(location.href))return;
  const v=getVotes(), current=v[id]||0;
  if(current===delta)v[id]=0; else v[id]=delta;
  setJSON("votes",v);location.reload();
}
function toggleSave(id,btn){
  const s=getSaved();s.has(id)?s.delete(id):s.add(id);setJSON("saved", [...s]);
  if(btn)btn.textContent=s.has(id)?"♥ Guardado":"♡ Guardar";
  toast(s.has(id)?"Guardado para después":"Quitado de guardados");
}
function shareItem(url){
  const full=new URL(url,location.href).href;
  navigator.clipboard?.writeText(full);toast("Enlace copiado");
}
function openReport(type,id){
  if(!requireUser(location.href))return;
  const root=document.getElementById("overlay-root")||document.body.appendChild(Object.assign(document.createElement("div"),{id:"overlay-root"}));
  root.innerHTML=`<div class="modal-bg" onclick="closeOverlay()"></div><section class="modal-card"><button class="modal-x" onclick="closeOverlay()">×</button><span class="eyebrow">REPORTAR</span><h2>¿Qué pasa con este contenido?</h2><form onsubmit="submitReport(event,'${type}','${id}')"><label>Motivo</label><select id="reportReason"><option>Spam</option><option>Información falsa</option><option>Acoso o ataque personal</option><option>Contenido fuera de tema</option><option>Otro</option></select><label>Contexto opcional</label><textarea id="reportNote"></textarea><button class="primary">Enviar reporte</button></form></section>`;
}
function submitReport(e,type,id){
  e.preventDefault();const reports=getJSON("reports",[]);
  reports.unshift({id:"r"+Date.now(),type,itemId:id,reason:document.getElementById("reportReason").value,note:document.getElementById("reportNote").value,at:new Date().toISOString(),status:"Pendiente"});
  setJSON("reports",reports);closeOverlay();toast("Reporte enviado a moderación");
}

function communityCard(c){
  const joined=getJoined();
  return `<article class="community-card"><div class="community-icon ${c.color||""}">${c.icon}</div><div><h3><a href="${R("communities/community.html")}?id=${c.id}">${c.name}</a></h3><p>${c.desc}</p><span>${formatNumber(c.members)} miembros</span></div><button class="${joined.has(c.id)?"joined":""}" onclick="toggleJoin('${c.id}',this)">${joined.has(c.id)?"Unido":"Unirme"}</button></article>`;
}
function toggleJoin(id,btn){
  if(!requireUser(location.href))return;
  const j=getJoined();j.has(id)?j.delete(id):j.add(id);setJSON("joined",[...j]);
  if(btn){btn.textContent=j.has(id)?"Unido":"Unirme";btn.classList.toggle("joined",j.has(id))}
  toast(j.has(id)?"Te uniste a la comunidad":"Saliste de la comunidad");
}

function placeCard(p){
  const following=getFollowing(), rating=p.rating?`★ ${p.rating} · ${formatNumber(p.reviews)} reseñas`:"Señal comunitaria";
  return `<article class="place-card">
    <a class="place-art" href="${R("places/place.html")}?id=${p.id}"><span>${initials(p.name)}</span><small>${p.type}</small></a>
    <div class="place-body"><div class="meta"><span>${p.area}</span>${p.price?`<span>· ${p.price}</span>`:""}</div>
    <h3><a href="${R("places/place.html")}?id=${p.id}">${p.name}</a></h3><p>${p.summary}</p>
    <div class="chips">${p.tags.slice(0,3).map(t=>`<span>${t}</span>`).join("")}</div>
    <div class="place-foot"><span>${rating}</span><button class="${following.has(p.id)?"following":""}" onclick="toggleFollowPlace('${p.id}',this)">${following.has(p.id)?"Siguiendo":"+ Seguir"}</button></div></div>
  </article>`;
}
function toggleFollowPlace(id,btn){
  if(!requireUser(location.href))return;
  const f=getFollowing();f.has(id)?f.delete(id):f.add(id);setJSON("followingPlaces",[...f]);
  if(btn){btn.textContent=f.has(id)?"Siguiendo":"+ Seguir";btn.classList.toggle("following",f.has(id))}
  toast(f.has(id)?"Ahora seguís este lugar":"Dejaste de seguirlo");
}
function eventCard(e){return `<article class="event-card"><div class="event-date">${e.date}</div><div><span>${e.type} · ${e.place}</span><h3>${e.title}</h3><p>${e.desc}</p><small>Fuente: ${e.source}</small></div><button onclick="saveEvent('${e.id}')">♡</button></article>`}
function saveEvent(id){if(!requireUser(location.href))return;const s=new Set(getJSON("savedEvents",[]));s.has(id)?s.delete(id):s.add(id);setJSON("savedEvents",[...s]);toast(s.has(id)?"Evento guardado":"Evento quitado")}
function guideCard(g){return `<article class="guide-card"><span>${g.category} · ${g.read} min</span><h3><a href="${R("guides/guide.html")}?id=${g.id}">${g.title}</a></h3><p>${g.deck}</p><a href="${R("guides/guide.html")}?id=${g.id}">Leer guía →</a></article>`}

document.addEventListener("DOMContentLoaded",applyTheme);
