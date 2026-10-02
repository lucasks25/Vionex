import {productDetails,productHotspots} from './home-content.js';
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const heroVideo=document.querySelector('#hero-video');
if(heroVideo){
 heroVideo.defaultPlaybackRate=0.75;heroVideo.playbackRate=0.75;
 if(reducedMotion){heroVideo.removeAttribute('autoplay');heroVideo.pause();}
 document.addEventListener('visibilitychange',()=>{if(document.hidden)heroVideo.pause();else if(!reducedMotion)heroVideo.play().catch(()=>{});});
}

const root=document.querySelector('.home-v2');
if(root){
 const panel=root.querySelector('#home-detail-panel');
 const triggers=[...root.querySelectorAll('.sol-list [data-detail]')];
 function showDetail(index){
  triggers.forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.detail)===index)));
  const detail=productDetails[index];panel.querySelector('.home-detail-label').textContent=detail.label;panel.querySelector('.home-detail-title').textContent=detail.title;panel.querySelector('.home-detail-text').textContent=detail.text;
 }
 triggers.forEach(button=>button.addEventListener('click',()=>showDetail(Number(button.dataset.detail))));
 const productPopover=root.querySelector('#product-popover');
 const hotspots=[...root.querySelectorAll('.home-hotspot')];
 let popoverTimer;let activeHotspot;
 const hoverAvailable=matchMedia('(hover:hover) and (pointer:fine)').matches;
 function hideProductPopover(){clearTimeout(popoverTimer);productPopover.hidden=true;hotspots.forEach(button=>button.setAttribute('aria-expanded','false'));}
 function showProductPopover(index){clearTimeout(popoverTimer);activeHotspot=hotspots[index];const detail=productHotspots[index];productPopover.querySelector('h3').textContent=detail.label;productPopover.querySelector('.home-popover-copy p').textContent=detail.text;productPopover.hidden=false;hotspots.forEach((button,i)=>button.setAttribute('aria-expanded',String(i===index)));}
 function schedulePopoverClose(fromPointer=false){clearTimeout(popoverTimer);popoverTimer=setTimeout(()=>{const pointerInside=hoverAvailable&&(productPopover.matches(':hover')||hotspots.some(button=>button.matches(':hover')));const keyboardInside=!fromPointer&&(productPopover.contains(document.activeElement)||hotspots.includes(document.activeElement));if(!pointerInside&&!keyboardInside)hideProductPopover();},140);}
 hotspots.forEach((button,index)=>{button.setAttribute('aria-controls','product-popover');button.setAttribute('aria-expanded','false');if(hoverAvailable){button.addEventListener('pointerenter',()=>showProductPopover(index));button.addEventListener('pointerleave',()=>schedulePopoverClose(true));}button.addEventListener('focus',()=>showProductPopover(index));button.addEventListener('blur',()=>schedulePopoverClose(false));button.addEventListener('click',()=>showProductPopover(index));});
 productPopover.addEventListener('pointerenter',()=>clearTimeout(popoverTimer));
 productPopover.addEventListener('pointerleave',()=>schedulePopoverClose(true));
 productPopover.addEventListener('focusout',()=>schedulePopoverClose(false));
 productPopover.querySelector('.home-popover-close').addEventListener('click',()=>{if(productPopover.contains(document.activeElement))activeHotspot?.focus();hideProductPopover();});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!productPopover.hidden){if(productPopover.contains(document.activeElement))activeHotspot?.focus();hideProductPopover();}});
 document.addEventListener('pointerdown',event=>{if(!productPopover.hidden&&!productPopover.contains(event.target)&&!hotspots.some(button=>button.contains(event.target)))hideProductPopover();});
 showDetail(1);
}

// Story card video plays in place with native controls.
const story=document.querySelector('.story-video');
if(story){const video=story.querySelector('video');story.querySelector('.story-play').addEventListener('click',()=>{story.classList.add('is-playing');video.controls=true;video.play().catch(()=>{});});video.addEventListener('ended',()=>{story.classList.remove('is-playing');video.controls=false;});}

// Visitors choose an official VARIO mode diagram; no timer changes their reading.
const modeButtons=[...document.querySelectorAll('[data-mode]')];
const modePanels=[...document.querySelectorAll('[data-mode-panel]')];
modeButtons.forEach(button=>button.addEventListener('click',()=>{
 modeButtons.forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
 modePanels.forEach(panel=>{panel.hidden=panel.dataset.modePanel!==button.dataset.mode;});
}));
