// Keeps the maps usable with no signal. Weather is never cached here; each page saves its own last forecast.
const V='wind-maps-v3';
const CORE=['./','./index.html','./home.html','./coon.html','./sauk.html','./stumptown.html','./mckenna.html','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png',
 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js','https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(CORE.map(u=>c.add(new Request(u,{mode:u.startsWith('http')?'no-cors':'same-origin'})).catch(()=>{}))))).then(()=>self.skipWaiting())});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(K=>Promise.all(K.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);
 if(e.request.method!=='GET'||u.hostname.endsWith('open-meteo.com'))return; // weather always goes to the network
 if(u.origin===location.origin){ // show the saved copy right away, update it in the background
  e.respondWith(caches.open(V).then(async c=>{const hit=await c.match(e.request,{ignoreSearch:true});
   const net=fetch(e.request).then(r=>{if(r.ok)c.put(e.request,r.clone());return r}).catch(()=>hit);
   if(hit){e.waitUntil(net);return hit}return net}));return}
 e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{const cp=r.clone();caches.open(V).then(c=>c.put(e.request,cp));return r})));
});
