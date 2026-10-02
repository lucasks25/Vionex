import './i18n.css';
import {
 LOCALE_KEY, COUNTRY_KEY, normalizeLocale, resolveLocale, readCountryCache,
 detectCountry, translateText, translateContactMessage, translateContactURL, updateTranslation
} from './locale.js';

const textRecords = new WeakMap();
const attributeRecords = new WeakMap();
const translatedAttributes = ['aria-label', 'aria-valuetext', 'alt', 'title', 'placeholder'];
const ignored = 'script, style, noscript, textarea, [data-i18n-ignore]';
const languages = navigator.languages?.length ? navigator.languages : [navigator.language || 'pt-BR'];
let explicit = normalizeLocale(new URLSearchParams(location.search).get('lang'));
let remembered = normalizeLocale(readStorage(LOCALE_KEY));
let country = readCountryCache(readStorage(COUNTRY_KEY));
let currentLocale = resolveLocale({explicit, remembered, country, languages});

function readStorage(key) {
 try { return localStorage.getItem(key); } catch { return null; }
}
function writeStorage(key, value) {
 try { localStorage.setItem(key, value); } catch { /* Private browsing may disallow persistence. */ }
}

const header = document.querySelector('.header');
const switcher = document.createElement('div');
switcher.className = 'language-switcher';
switcher.setAttribute('role', 'group');
switcher.dataset.i18nIgnore = '';
switcher.innerHTML = '<button type="button" lang="pt-BR" data-language="pt-BR" title="Português do Brasil">PT</button><span aria-hidden="true">/</span><button type="button" lang="en-US" data-language="en-US" title="American English">EN</button>';
// Pages reserve a slot for the switcher; older markup falls back to the header.
const slot = document.querySelector('[data-language-slot]');
if (slot) slot.append(switcher);
else if (header) header.insertBefore(switcher, header.querySelector('.menu-button'));

function translateAttribute(element, name, transform = translateText) {
 const current = element.getAttribute(name);
 if (current === null) return;
 let records = attributeRecords.get(element);
 if (!records) { records = new Map(); attributeRecords.set(element, records); }
 const next = updateTranslation(records, name, current, currentLocale, transform);
 if (next !== current) element.setAttribute(name, next);
}
function translateAccessibleAttribute(source, locale) {
 const translated = translateText(source, locale);
 if (locale === 'en-US' && translated === source && source.endsWith(', CEO da Vionex Med')) {
  return source.slice(0, -', CEO da Vionex Med'.length) + ', CEO of Vionex Med';
 }
 return translated;
}

function translateDocument() {
 // Disconnect during our own writes so translated text does not trigger an observer loop.
 observer.disconnect();
 try {
  document.documentElement.lang = currentLocale;
  const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
   const node = walker.currentNode;
   const element = node.parentElement;
   if (!element || element.closest(ignored) || !node.data.trim()) continue;
   const transform = element.closest('#message-preview') ? translateContactMessage : translateText;
   const next = updateTranslation(textRecords, node, node.data, currentLocale, transform);
   if (next !== node.data) node.data = next;
  }
  document.querySelectorAll('[aria-label], [aria-valuetext], [alt], [title], [placeholder]').forEach(element => {
   if (element.closest('[data-i18n-ignore]')) return;
   translatedAttributes.forEach(name => translateAttribute(element, name, translateAccessibleAttribute));
  });
  const description = document.querySelector('meta[name="description"]');
  if (description) translateAttribute(description, 'content');
  const whatsapp = document.querySelector('#whatsapp-ready');
  if (whatsapp) translateAttribute(whatsapp, 'href', translateContactURL);
  switcher.setAttribute('aria-label', currentLocale === 'en-US' ? 'Site language' : 'Idioma do site');
  switcher.querySelectorAll('button').forEach(button => {
   const selected = button.dataset.language === currentLocale;
   button.setAttribute('aria-pressed', String(selected));
   button.setAttribute('aria-label', button.dataset.language === 'en-US' ? 'American English' : 'Português do Brasil');
  });
 } finally {
  observer.observe(document.documentElement, {subtree: true, childList: true, characterData: true, attributes: true,
   attributeFilter: [...translatedAttributes, 'content', 'href']});
 }
}

const observer = new MutationObserver(() => translateDocument());
translateDocument();

switcher.addEventListener('click', event => {
 const button = event.target.closest('button[data-language]');
 if (!button) return;
 explicit = normalizeLocale(button.dataset.language);
 remembered = explicit;
 currentLocale = explicit;
 writeStorage(LOCALE_KEY, remembered);
 // A manual choice is newer than a URL test override and must survive a reload.
 const url = new URL(location.href);
 if (url.searchParams.has('lang')) {
  url.searchParams.delete('lang');
  try { history.replaceState(history.state, '', url); } catch { /* Still apply the choice in this document. */ }
 }
 translateDocument();
 document.dispatchEvent(new CustomEvent('vionex:languagechange', {detail: {locale: currentLocale}}));
});

// Use the cache or explicit preference before contacting the geolocation provider.
// Rendering and all page interactions continue while the request is in flight.
if (!explicit && !remembered && !country) {
 detectCountry().then(detected => {
  if (!detected) return;
  country = detected;
  writeStorage(COUNTRY_KEY, JSON.stringify({country, timestamp: Date.now()}));
  if (explicit || remembered) return; // The visitor may have clicked while awaiting the network.
  const next = resolveLocale({country, languages});
  if (next !== currentLocale) {
   currentLocale = next;
   translateDocument();
   document.dispatchEvent(new CustomEvent('vionex:languagechange', {detail: {locale: currentLocale}}));
  }
 });
}
