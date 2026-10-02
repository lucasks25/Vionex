import './i18n.js';
import {buildContact} from './contact.js';
import leadership from './leadership.json';
const $=selector=>document.querySelector(selector);
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const menuButton=$('.menu-button');const navigation=$('#navigation');
const header=$('.header');
const headerSections=[...document.querySelectorAll('main > section, .footer')];
let headerFrame=0;
function updateHeader(){
 const probe=header.offsetHeight+24;
 const section=headerSections.find(section=>{const rect=section.getBoundingClientRect();return rect.top<=probe&&rect.bottom>probe;});
 const onHero=!!section?.matches('.hero, .page-hero');
 let background='#10213d',light=false;
 if(section&&!onHero){
  const style=getComputedStyle(section);
  background=style.backgroundColor;
  if(background==='rgba(0, 0, 0, 0)'||background==='transparent'){
   background=section.classList.contains('band--navy')?'#0b1a33':style.backgroundImage.match(/rgba?\([^)]*\)/)?.[0]||'#10213d';
  }
  const channels=background.match(/[\d.]+/g)?.slice(0,3).map(Number);
  light=section.matches('.band--white, .partners')||!!(channels&&channels.length===3&&channels[0]*.2126+channels[1]*.7152+channels[2]*.0722>160);
 }
 header.classList.toggle('is-scrolled',window.scrollY>24);
 header.classList.toggle('header--hero',onHero);
 header.classList.toggle('header--light',light);
 header.style.setProperty('--section-header-bg',background);
 headerFrame=0;
}
function queueHeader(){if(!headerFrame)headerFrame=requestAnimationFrame(updateHeader);}
window.addEventListener('scroll',queueHeader,{passive:true});
window.addEventListener('resize',queueHeader);
window.addEventListener('load',updateHeader);
updateHeader();
// The header takes its first state without animating; only later changes fade.
requestAnimationFrame(()=>requestAnimationFrame(()=>header.classList.remove('is-static')));
// Arriving at /#section jumps straight there; smooth scrolling is only for links clicked on the page.
window.addEventListener('load',()=>setTimeout(()=>document.documentElement.classList.add('smooth-scroll'),50));
navigation.querySelectorAll('a[href]').forEach(link=>{const target=new URL(link.href,location.origin);if(target.pathname!=='/'&&!target.hash&&target.pathname===location.pathname)link.setAttribute('aria-current','page');});
function closeMenu(){navigation.classList.remove('open');document.body.classList.remove('menu-open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menu');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');navigation.classList.toggle('open',open);document.body.classList.toggle('menu-open',open);});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&navigation.classList.contains('open')){closeMenu();menuButton.focus();}});
matchMedia('(min-width: 961px)').addEventListener('change',event=>{if(event.matches)closeMenu();});

// Sub-navigation tabs follow the section in view.
const subTabs=[...document.querySelectorAll('.subnav-tabs a[href^="#"]')];
function markTab(id){subTabs.forEach(tab=>tab.setAttribute('aria-current',String(tab.getAttribute('href')===`#${id}`)));}
if(subTabs.length){markTab(subTabs[0].getAttribute('href').slice(1));if('IntersectionObserver' in window){const spy=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)markTab(entry.target.id);}),{rootMargin:'-45% 0px -50% 0px'});subTabs.forEach(tab=>{const section=document.getElementById(tab.getAttribute('href').slice(1));if(section)spy.observe(section);});}}

// Wide Focus: the marker follows the depth axis of the manufacturer's map (0–55 mm spans 19.62%–78.97% of the image).
const depth=$('#depth');
if(depth)depth.addEventListener('input',()=>{const value=`${depth.value} mm`;$('#depth-output').textContent=value;const marker=$('.depth-marker');marker.style.left=`${19.62+Number(depth.value)*1.0791}%`;marker.firstElementChild.textContent=value;});

const visions=[['Aproximar tecnologia e cuidado.','Trazer soluções que façam sentido para os profissionais e para a realidade de cada clínica.'],['Escolher com responsabilidade.','Avaliar cada solução com atenção à sua aplicação, à qualidade e ao suporte que a acompanha.'],['Estar perto em cada etapa.','Construir relações que continuam depois da entrega, com capacitação e acompanhamento da operação.']];
const tabs=[...document.querySelectorAll('.vision-tabs button')];
function selectVision(index){tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(index===i));tab.tabIndex=index===i?0:-1;});const panel=$('#vision-panel');panel.setAttribute('aria-labelledby',`vision-tab-${index}`);panel.querySelector('h3').textContent=visions[index][0];panel.querySelector('p').textContent=visions[index][1];}
if(tabs.length){tabs.forEach(button=>button.addEventListener('click',()=>selectVision(Number(button.dataset.vision))));tabs.forEach((tab,index)=>tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(index+1)%tabs.length;if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;if(next!==undefined){event.preventDefault();selectVision(next);tabs[next].focus();}}));selectVision(0);}
const ceo=$('#ceo-photo');
if(ceo){const fallback=$('.portrait-fallback');const show=()=>{ceo.hidden=false;if(fallback)fallback.hidden=true;};ceo.addEventListener('load',show);if(leadership.photo)ceo.src=leadership.photo;if(leadership.name)ceo.alt=`${leadership.name}, CEO da Vionex Med`;if(ceo.complete&&ceo.naturalWidth>0)show();}

// Carousels: arrows, dots and an optional countdown ring that spans the whole sequence.
document.querySelectorAll('[data-carousel]').forEach(carousel=>{
 const slides=[...carousel.querySelectorAll('[data-slide]')];const dots=[...carousel.querySelectorAll('.carousel-dots button')];
 const total=Number(carousel.dataset.seconds)||0;const per=total?total/slides.length:0;
 const ring=carousel.querySelector('.ring-value');const number=carousel.querySelector('.ring-number');
 let index=0,elapsed=0,timer,inView=false,held=false;
 function render(){slides.forEach((slide,i)=>{slide.classList.toggle('is-active',i===index);slide.setAttribute('aria-hidden',String(i!==index));});dots.forEach((dot,i)=>dot.setAttribute('aria-current',String(i===index)));if(total){const remaining=Math.max(0,Math.round(total-index*per-elapsed));if(number)number.textContent=remaining;if(ring)ring.style.strokeDashoffset=String(264*(1-remaining/total));}}
 function go(next){index=(next+slides.length)%slides.length;elapsed=0;render();}
 carousel.querySelector('[data-prev]')?.addEventListener('click',()=>go(index-1));
 carousel.querySelector('[data-next]')?.addEventListener('click',()=>go(index+1));
 dots.forEach((dot,i)=>dot.addEventListener('click',()=>go(i)));
 function tick(){if(!inView||held||document.hidden)return;elapsed+=1;if(elapsed>=per)go(index+1);else render();}
 if(total&&!reducedMotion){timer=setInterval(tick,1000);carousel.addEventListener('pointerenter',()=>{held=true;});carousel.addEventListener('pointerleave',()=>{held=false;});carousel.addEventListener('focusin',()=>{held=true;});carousel.addEventListener('focusout',()=>{held=false;});if('IntersectionObserver' in window)new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;}).observe(carousel);else inView=true;}
 render();
});

const form=$('#contact-form');const dialog=$('#contact-dialog');
if(form){const interest=new URLSearchParams(location.search).get('interesse');if(interest)$('#need').value=interest.slice(0,1000);form.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(form);try{const url=buildContact({name:data.get('name'),phone:data.get('phone'),company:data.get('company'),need:data.get('need'),consent:data.get('consent')==='on'});$('#whatsapp-ready').href=url;$('#message-preview').textContent=new URL(url).searchParams.get('text');$('#form-status').textContent='';dialog.showModal();}catch(error){$('#form-status').textContent=error.message;}});}
if(dialog){$('#close-dialog').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});}

if('IntersectionObserver' in window&&!reducedMotion){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}});},{threshold:.06});document.querySelectorAll('main .band .h-section,.stories-grid,.solutions-grid,.split-grid,.steps,.cat-grid,.tech-grid,.focus-grid,.app-grid,.faq,.gs-grid').forEach(el=>{el.classList.add('will-reveal');observer.observe(el);});}

// Equipment "+" points: hover and focus are handled in CSS; a tap toggles the description on touch screens.
const specSpots=[...document.querySelectorAll('.spec-spot')];
if(specSpots.length){
 const closeSpots=except=>specSpots.forEach(spot=>{if(spot!==except){spot.classList.remove('is-open');spot.setAttribute('aria-expanded','false');}});
 specSpots.forEach(spot=>spot.addEventListener('click',()=>{const open=!spot.classList.contains('is-open');closeSpots(spot);spot.classList.toggle('is-open',open);spot.setAttribute('aria-expanded',String(open));}));
 document.addEventListener('pointerdown',event=>{if(!event.target.closest('.spec-spot'))closeSpots();});
 document.addEventListener('keydown',event=>{if(event.key==='Escape')closeSpots();});
}
