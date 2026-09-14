const toggle=document.getElementById("menuToggle");const nav=document.getElementById("nav");toggle?.addEventListener("click",()=>{const open=nav.classList.toggle("is-open");toggle.setAttribute("aria-expanded",String(open))});nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("is-open");toggle.setAttribute("aria-expanded","false")}));

const styleGrid=document.getElementById("styleGrid");
const styleMore=document.getElementById("styleMore");
const styleDialog=document.getElementById("styleLightbox");
const styleImage=document.getElementById("styleLightboxImage");
const styleCount=document.getElementById("styleLightboxCount");
const styleButtons=[...document.querySelectorAll(".style-thumb")];
let activeStyle=0;
styleMore?.addEventListener("click",()=>{
  const expanded=styleGrid.classList.toggle("is-expanded");
  styleMore.setAttribute("aria-expanded",String(expanded));
  styleMore.innerHTML=expanded?'写真を少なく表示 <span aria-hidden="true">−</span>':'すべての写真を見る <span aria-hidden="true">＋</span>';
});
function showStyle(index){
  activeStyle=(index+styleButtons.length)%styleButtons.length;
  styleImage.src=styleButtons[activeStyle].dataset.full;
  styleImage.alt=styleButtons[activeStyle].querySelector("img").alt;
  styleCount.textContent=`${activeStyle+1} / ${styleButtons.length}`;
}
styleButtons.forEach((button,index)=>button.addEventListener("click",()=>{
  showStyle(index);
  styleDialog.showModal();
}));
styleDialog?.querySelector(".style-lightbox__close")?.addEventListener("click",()=>styleDialog.close());
styleDialog?.querySelector(".style-lightbox__prev")?.addEventListener("click",()=>showStyle(activeStyle-1));
styleDialog?.querySelector(".style-lightbox__next")?.addEventListener("click",()=>showStyle(activeStyle+1));
styleDialog?.addEventListener("click",event=>{if(event.target===styleDialog)styleDialog.close()});
document.addEventListener("keydown",event=>{
  if(!styleDialog?.open)return;
  if(event.key==="ArrowLeft")showStyle(activeStyle-1);
  if(event.key==="ArrowRight")showStyle(activeStyle+1);
});
