import{a as c,i as n,S as p}from"./assets/vendor-f736e62a.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();async function u(i,o){const a="43757343-ba5778b701f459784bea5ede7";c.defaults.baseURL="https://pixabay.com/api/";const s=`?key=${a}&q=${i}&image_type=photo&orientation=horizontal&safesearch=true&page=${o}&per_page=15`,e=await c.get(s);if(e.status!==200)throw new Error(e.status);return e.data}function d(i,o){const a=i.reduce((s,e)=>s+=`<div class="gallery">
          <a href="${e.largeImageURL}"><img src="${e.webformatURL}" alt="${e.tags}"  width="360"/></a>
          <div class="info">
              <p>Likes <span></span>${e.likes}</span></p>
              <p>Views <span></span>${e.views}</span></p>
              <p>Comments <span></span>${e.comments}</span></p>
              <p>Downloads <span></span>${e.downloads}</span></p>
          </div>
              </div>`,"");o.insertAdjacentHTML("beforeend",a)}const r={formEL:document.querySelector("#form"),inputEL:document.querySelector("#image-input"),galleryEL:document.querySelector("#gallery"),loadMoreBtn:document.querySelector(".load-more")};function g(i){i.preventDefault(),r.loadMoreBtn.classList.remove("is-visible");let o=1;r.galleryEL.innerHTML='<span class="loader"></span>';const a=r.inputEL.value.trim();if(a==="")return n.show({title:"⨻",titleSize:"20px",message:"Introduction field please enter the value to search",color:"white",backgroundColor:"red",position:"topRight"});u(a).then(s=>{if(s.totalHits===0)return n.show({title:"⨻",titleSize:"20px",message:"Sorry, there are no images matching your search query. Please try again!",color:"white",backgroundColor:"red",position:"topRight"});r.galleryEL.innerHTML="",d(s.hits,r.galleryEL),s.totalHits>15&&r.loadMoreBtn.classList.add("is-visible"),new p("#gallery a",{captionsData:"alt",captionDelay:250}).refresh(),r.loadMoreBtn.addEventListener("click",()=>{o+=1,u(a,o).then(t=>{d(t.hits,r.galleryEL);const f=document.querySelector(".gallery").getBoundingClientRect().height;new p("#gallery a",{captionsData:"alt",captionDelay:250}).refresh(),window.scrollBy({top:f*2,behavior:"smooth"}),t.totalHits>o*15?r.loadMoreBtn.classList.add("is-visible"):(r.loadMoreBtn.classList.remove("is-visible"),n.show({title:"⨻",titleSize:"20px",message:"We're sorry, but you've reached the end of search results.",color:"white",backgroundColor:"navy-blue",position:"topRight"}))})})}),r.formEL.reset()}r.formEL.addEventListener("submit",g);
//# sourceMappingURL=commonHelpers.js.map
