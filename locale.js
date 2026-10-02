/** Locale choices remain independent of the DOM so failure and precedence are testable. */
export const LOCALE_KEY = 'vionex.locale';
export const COUNTRY_KEY = 'vionex.country';
export const COUNTRY_CACHE_TTL = 24 * 60 * 60 * 1000;
export const COUNTRY_ENDPOINT = 'https://ipapi.co/country/';

export function normalizeLocale(value) {
 const key = typeof value === 'string' ? value.trim().toLowerCase() : '';
 if (key === 'en-us' || key === 'en') return 'en-US';
 if (key === 'pt-br' || key === 'pt') return 'pt-BR';
 return null;
}

export function resolveLocale({explicit, remembered, country, languages = []} = {}) {
 const preference = normalizeLocale(explicit) || normalizeLocale(remembered);
 if (preference) return preference;
 const code = typeof country === 'string' ? country.trim().toUpperCase() : '';
 if (code === 'US') return 'en-US';
 if (code === 'BR') return 'pt-BR';
 for (const language of languages) {
  if (/^en(?:-|$)/i.test(language)) return 'en-US';
  if (/^pt(?:-|$)/i.test(language)) return 'pt-BR';
 }
 return 'pt-BR';
}

export function readCountryCache(raw, now = Date.now(), ttl = COUNTRY_CACHE_TTL) {
 try {
  const {country, timestamp} = JSON.parse(raw);
  if (typeof country !== 'string' || !/^[A-Z]{2}$/.test(country)) return null;
  if (!Number.isFinite(timestamp) || timestamp > now || now - timestamp >= ttl) return null;
  return country;
 } catch { return null; }
}

/** Fail closed to browser-language fallback. Bound the whole response, including body read. */
export async function detectCountry({fetchImpl = globalThis.fetch, timeoutMs = 4000} = {}) {
 if (typeof fetchImpl !== 'function') return null;
 const controller = new AbortController();
 let timer;
 const timeout = new Promise(resolve => {
  timer = setTimeout(() => { controller.abort(); resolve(null); }, Math.max(1, Math.min(timeoutMs, 4000)));
 });
 const request = (async () => {
  try {
   const response = await fetchImpl(COUNTRY_ENDPOINT, {
    signal: controller.signal, credentials: 'omit', referrerPolicy: 'no-referrer', cache: 'no-store'
   });
   if (!response.ok) return null;
   const country = (await response.text()).trim().toUpperCase();
   return /^[A-Z]{2}$/.test(country) ? country : null;
  } catch { return null; }
 })();
 try { return await Promise.race([request, timeout]); }
 finally { clearTimeout(timer); }
}

import english from './locales/en-US.js';

export function translateText(source, locale) {
 if (locale !== 'en-US' || !source.trim()) return source;
 const key = source.trim().replace(/\s+/g, ' ');
 const translated = english[key];
 if (typeof translated !== 'string') return source;
 const prefix = source.match(/^\s*/)[0];
 const suffix = source.match(/\s*$/)[0];
 return prefix + translated + suffix;
}

/** Translate only the form's fixed framing. Names, specialty and free text stay verbatim. */
export function translateContactMessage(source, locale) {
 if (locale !== 'en-US') return source;
 let freeText = false;
 return source.split('\n').map((line, index) => {
  if (freeText) return line;
  if (index === 0 && line === 'Olá, Vionex! Gostaria de conhecer suas soluções.') {
   return 'Hello, Vionex! I would like to learn about your solutions.';
  }
  const labels = {'Nome: ': 'Name: ', 'Empresa/especialidade: ': 'Company/specialty: ', 'Necessidade: ': 'Needs: '};
  for (const [pt, en] of Object.entries(labels)) if (line.startsWith(pt)) {
   if (pt === 'Necessidade: ') freeText = true;
   return en + line.slice(pt.length);
  }
  return line;
 }).join('\n');
}

/** Retain original copy across language changes, while accepting later application updates. */
export function updateTranslation(records, key, current, locale, translate = translateText) {
 let record = records.get(key);
 if (!record || current !== record.applied) record = {source: current, applied: current};
 const next = translate(record.source, locale);
 record.applied = next;
 records.set(key, record);
 return next;
}

export function translateContactURL(source, locale) {
 if (locale !== 'en-US') return source;
 try {
  const url = new URL(source);
  if (url.hostname !== 'wa.me' || !url.searchParams.has('text')) return source;
  url.searchParams.set('text', translateContactMessage(url.searchParams.get('text'), locale));
  return url.href;
 } catch { return source; }
}
