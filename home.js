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

// Clinical video: custom controls, starting at a lower volume.
document.querySelectorAll('.film').forEach(film=>{
 const video=film.querySelector('video');const controls=film.querySelector('.film-controls');
 const toggle=controls.querySelector('.fc-toggle');const bar=controls.querySelector('.fc-bar');const fill=controls.querySelector('.fc-fill');const buffer=controls.querySelector('.fc-buffer');const time=controls.querySelector('.fc-time');const mute=controls.querySelector('.fc-mute');const full=controls.querySelector('.fc-full');
 video.volume=.3;
 const format=seconds=>{const value=Math.max(0,Math.floor(seconds||0));return `${Math.floor(value/60)}:${String(value%60).padStart(2,'0')}`;};
 function play(){video.volume=Math.min(video.volume,.3);video.play().catch(error=>{if(error.name==='NotSupportedError'){video.controls=true;controls.hidden=true;}sync();});}
 film.querySelector('.film-play').addEventListener('click',()=>{film.classList.add('is-playing');controls.hidden=false;play();toggle.focus({preventScroll:true});});
 toggle.addEventListener('click',()=>{if(video.paused)play();else video.pause();});
 video.addEventListener('click',()=>{if(video.paused)play();else video.pause();});
 function sync(){const playing=!video.paused&&!video.ended;film.classList.toggle('is-paused',!playing);toggle.setAttribute('aria-label',playing?'Pausar vídeo':'Reproduzir vídeo');}
 ['play','pause','ended'].forEach(type=>video.addEventListener(type,sync));
 function progress(){const ratio=video.duration?video.currentTime/video.duration:0;fill.style.width=`${ratio*100}%`;bar.setAttribute('aria-valuenow',String(Math.round(ratio*100)));time.textContent=`${format(video.currentTime)} / ${format(video.duration)}`;if(video.buffered.length&&video.duration)buffer.style.width=`${video.buffered.end(video.buffered.length-1)/video.duration*100}%`;}
 ['timeupdate','loadedmetadata','progress'].forEach(type=>video.addEventListener(type,progress));
 function seek(event){const rect=bar.getBoundingClientRect();const ratio=Math.max(0,Math.min(1,(event.clientX-rect.left)/rect.width));if(video.duration)video.currentTime=ratio*video.duration;}
 bar.addEventListener('pointerdown',event=>{seek(event);bar.setPointerCapture(event.pointerId);bar.addEventListener('pointermove',seek);});
 bar.addEventListener('pointerup',()=>bar.removeEventListener('pointermove',seek));
 bar.addEventListener('keydown',event=>{if(!video.duration)return;if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();video.currentTime+=event.key==='ArrowRight'?5:-5;}});
 mute.addEventListener('click',()=>{video.muted=!video.muted;});
 video.addEventListener('volumechange',()=>{film.classList.toggle('is-muted',video.muted);mute.setAttribute('aria-pressed',String(video.muted));mute.setAttribute('aria-label',video.muted?'Ativar som do vídeo':'Silenciar vídeo');});
 full.addEventListener('click',()=>{if(document.fullscreenElement===film)document.exitFullscreen();else if(film.requestFullscreen)film.requestFullscreen().catch(()=>video.webkitEnterFullscreen?.());else video.webkitEnterFullscreen?.();});
 document.addEventListener('fullscreenchange',()=>full.setAttribute('aria-label',document.fullscreenElement===film?'Sair da tela cheia':'Ver vídeo em tela cheia'));
 if(!document.fullscreenEnabled&&!video.webkitEnterFullscreen)full.hidden=true;
 document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();});
});

// Stories rail: drag, swipe or use the trackpad/arrows; it stops at the first and last post.
const rail=document.querySelector('[data-stories-rail]');
if(rail){
 const track=rail.querySelector('.stories-track');
 const prev=document.querySelector('[data-stories-prev]');const next=document.querySelector('[data-stories-next]');
 let min=0,x=0,velocity=0,frame=0,dragging=false,moved=0,startX=0,lastX=0,lastTime=0;
 function measure(){min=Math.min(0,rail.clientWidth-track.scrollWidth-Math.max(16,(rail.clientWidth-rail.parentElement.clientWidth)));}
 const clamp=value=>Math.max(min,Math.min(0,value));
 function render(){track.style.transform=`translate3d(${x}px,0,0)`;if(prev)prev.disabled=x>=-1;if(next)next.disabled=x<=min+1;}
 // Past either end the rail resists, then settles back.
 function settle(){const target=clamp(x);if(Math.abs(target-x)<.5){x=target;render();return;}x+=(target-x)*.2;render();frame=requestAnimationFrame(settle);}
 function glide(){velocity*=.94;x+=velocity;if(x>0||x<min){velocity*=.5;}render();if(Math.abs(velocity)>.3)frame=requestAnimationFrame(glide);else settle();}
 function animateTo(target){cancelAnimationFrame(frame);target=clamp(target);const from=x,start=performance.now();const step=now=>{const t=Math.min(1,(now-start)/450);x=from+(target-from)*(1-Math.pow(1-t,3));render();if(t<1)frame=requestAnimationFrame(step);};frame=requestAnimationFrame(step);}
 rail.addEventListener('pointerdown',event=>{if(event.button!==0)return;cancelAnimationFrame(frame);dragging=true;moved=0;startX=lastX=event.clientX;lastTime=performance.now();velocity=0;});
 window.addEventListener('pointermove',event=>{if(!dragging)return;const dx=event.clientX-lastX;const now=performance.now();x+=(x>0||x<min)?dx*.35:dx;moved=Math.max(moved,Math.abs(event.clientX-startX));if(moved>6&&!rail.classList.contains('is-dragging')){rail.classList.add('is-dragging');rail.setPointerCapture?.(event.pointerId);}velocity=Math.max(-60,Math.min(60,dx/Math.max(8,now-lastTime)*16));lastX=event.clientX;lastTime=now;render();});
 function release(){if(!dragging)return;dragging=false;rail.classList.remove('is-dragging');if(Math.abs(velocity)>.5&&!reducedMotion)frame=requestAnimationFrame(glide);else settle();}
 window.addEventListener('pointerup',release);window.addEventListener('pointercancel',release);
 // A drag must not open the post underneath the pointer.
 rail.addEventListener('click',event=>{if(moved>6){event.preventDefault();event.stopPropagation();moved=0;}},true);
 rail.addEventListener('dragstart',event=>event.preventDefault());
 rail.addEventListener('wheel',event=>{if(Math.abs(event.deltaX)<=Math.abs(event.deltaY))return;event.preventDefault();cancelAnimationFrame(frame);x=clamp(x-event.deltaX);render();},{passive:false});
 const cardStep=()=>track.children[1].offsetLeft-track.children[0].offsetLeft;
 prev?.addEventListener('click',()=>animateTo(x+cardStep()));
 next?.addEventListener('click',()=>animateTo(x-cardStep()));
 // Keyboard focus on a post scrolls it into view.
 track.addEventListener('focusin',event=>{const card=event.target.closest('.story');if(!card)return;const left=card.offsetLeft+x,right=left+card.offsetWidth;if(left<0)animateTo(-card.offsetLeft);else if(right>rail.parentElement.clientWidth)animateTo(-(card.offsetLeft+card.offsetWidth-rail.parentElement.clientWidth));});
 window.addEventListener('resize',()=>{measure();x=clamp(x);render();});
 measure();render();
}
