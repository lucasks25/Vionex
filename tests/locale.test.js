import test from 'node:test';
import assert from 'node:assert/strict';

// These cases catch precedence changes, malformed geolocation responses, and
// indefinitely pending requests without depending on a live external service.
const locale = await import('../locale.js').catch(() => ({}));

test('US and Brazil country results take priority over conflicting browser languages', () => {
 assert.equal(locale.resolveLocale?.({country:'US',languages:['pt-BR']}),'en-US');
 assert.equal(locale.resolveLocale?.({country:'BR',languages:['en-US']}),'pt-BR');
});
test('explicit URL or manual selection takes priority over remembered preference and country', () => {
 assert.equal(locale.resolveLocale?.({explicit:'en-US',remembered:'pt-BR',country:'BR'}),'en-US');
 assert.equal(locale.resolveLocale?.({explicit:'pt-BR',remembered:'en-US',country:'US'}),'pt-BR');
});
test('a remembered manual preference wins over country detection', () => {
 assert.equal(locale.resolveLocale?.({remembered:'pt-BR',country:'US'}),'pt-BR');
});
test('any country outside Brazil opens in American English, regardless of browser language', () => {
 assert.equal(locale.resolveLocale?.({explicit:'xx',remembered:'xx',country:'DE',languages:['fr-FR','en-GB','pt-BR']}),'en-US');
 assert.equal(locale.resolveLocale?.({country:'DE',languages:['pt-PT']}),'en-US');
 assert.equal(locale.resolveLocale?.({country:'PT',languages:['pt-PT']}),'en-US');
 assert.equal(locale.resolveLocale?.({country:'BR',languages:['en-US']}),'pt-BR');
});
test('without a detected country, the first supported browser language decides', () => {
 assert.equal(locale.resolveLocale?.({languages:['en-GB','pt-BR']}),'en-US');
 assert.equal(locale.resolveLocale?.({languages:['es-MX']}),'pt-BR');
 assert.equal(locale.resolveLocale?.({country:'??',languages:['pt-PT']}),'pt-BR');
});
test('unsupported explicit locales do not silently become supported overrides', () => {
 assert.equal(locale.normalizeLocale?.('en-GB'),null);
 assert.equal(locale.normalizeLocale?.(' EN-us '),'en-US');
 assert.equal(locale.normalizeLocale?.('pt'),'pt-BR');
});
test('country detection reads the documented plain text response', async () => {
 assert.ok(locale.detectCountry,'detectCountry is implemented');
 assert.equal(await locale.detectCountry({fetchImpl:async()=>new Response('US\n')}),'US');
 assert.equal(await locale.detectCountry({fetchImpl:async()=>new Response('BR')}),'BR');
});
test('country detection rejects HTTP errors, malformed country values, and network failure', async () => {
 assert.ok(locale.detectCountry,'detectCountry is implemented');
 assert.equal(await locale.detectCountry({fetchImpl:async()=>new Response('US',{status:429})}),null);
 assert.equal(await locale.detectCountry({fetchImpl:async()=>new Response('error')}),null);
 assert.equal(await locale.detectCountry({fetchImpl:async()=>{throw new Error('offline');}}),null);
});
test('country detection times out even when a request ignores AbortSignal', async () => {
 assert.ok(locale.detectCountry,'detectCountry is implemented');
 const start=Date.now();
 assert.equal(await locale.detectCountry({fetchImpl:()=>new Promise(()=>{}),timeoutMs:15}),null);
 assert.ok(Date.now()-start<300,'timeout bounds waiting');
});
test('country cache expires and ignores malformed or future timestamps', () => {
 assert.equal(locale.readCountryCache?.(JSON.stringify({country:'US',timestamp:100}),200,1000),'US');
 assert.equal(locale.readCountryCache?.(JSON.stringify({country:'US',timestamp:100}),1200,1000),null);
 assert.equal(locale.readCountryCache?.(JSON.stringify({country:'US',timestamp:1000}),200,1000),null);
 assert.equal(locale.readCountryCache?.('broken',200,1000),null);
});

test('English translation preserves whitespace and leaves unknown text untouched', () => {
 assert.equal(locale.translateText?.('  Engenharia alemã.\n','en-US'),'  German engineering.\n');
 assert.equal(locale.translateText?.('Presença Vionex.','en-US'),'Vionex by your side.');
 assert.equal(locale.translateText?.('Rua Joana Angélica, 249','en-US'),'Rua Joana Angélica, 249');
 assert.equal(locale.translateText?.('User-entered unknown text','en-US'),'User-entered unknown text');
 assert.equal(locale.translateText?.('Engenharia alemã.','pt-BR'),'Engenharia alemã.');
});
test('dynamic messages and accessible labels translate into American English', () => {
 assert.equal(locale.translateText?.('Região mais profunda','en-US'),'Deeper region');
 assert.equal(locale.translateText?.('Fechar menu','en-US'),'Close menu');
 assert.equal(locale.translateText?.('Informe um telefone válido com DDD.','en-US'),'Enter a valid Brazilian phone number with area code.');
});
test('WhatsApp preview translates fixed labels while preserving all user data', () => {
 const message='Olá, Vionex! Gostaria de conhecer suas soluções.\n\nNome: Ana\nWhatsApp: (11) 99999-9999\nEmpresa/especialidade: Clínica A\nNecessidade: Contato';
 assert.equal(locale.translateContactMessage?.(message,'en-US'),'Hello, Vionex! I would like to learn about your solutions.\n\nName: Ana\nWhatsApp: (11) 99999-9999\nCompany/specialty: Clínica A\nNeeds: Contato');
 assert.equal(locale.translateContactMessage?.(message,'pt-BR'),message);
});

test('translation state restores Portuguese and refreshes when application changes content', () => {
 assert.ok(locale.updateTranslation,'updateTranslation is implemented');
 const records=new Map();
 assert.equal(locale.updateTranslation(records,'hero','Engenharia alemã.','en-US'),'German engineering.');
 assert.equal(locale.updateTranslation(records,'hero','German engineering.','pt-BR'),'Engenharia alemã.');
 assert.equal(locale.updateTranslation(records,'hero','Presença Vionex.','en-US'),'Vionex by your side.');
 assert.equal(locale.updateTranslation(records,'hero','Vionex by your side.','pt-BR'),'Presença Vionex.');
});
test('translated WhatsApp URL sends the same English message as its preview', () => {
 assert.ok(locale.translateContactURL,'translateContactURL is implemented');
 const source='https://wa.me/551152820777?text='+encodeURIComponent('Olá, Vionex! Gostaria de conhecer suas soluções.\n\nNome: Ana');
 const translated=new URL(locale.translateContactURL(source,'en-US'));
 assert.equal(translated.hostname,'wa.me');
 assert.equal(translated.pathname,'/551152820777');
 assert.equal(translated.searchParams.get('text'),'Hello, Vionex! I would like to learn about your solutions.\n\nName: Ana');
 assert.equal(locale.translateContactURL(source,'pt-BR'),source);
});

test('WhatsApp message leaves multilingual free text untouched, including line breaks', () => {
 const source='Olá, Vionex! Gostaria de conhecer suas soluções.\n\nNome: Ana\nWhatsApp: (11) 99999-9999\nNecessidade: Gostaria de informação\nNome: equipamento A\nEmpresa/especialidade: descrição livre';
 assert.equal(locale.translateContactMessage(source,'en-US'),'Hello, Vionex! I would like to learn about your solutions.\n\nName: Ana\nWhatsApp: (11) 99999-9999\nNeeds: Gostaria de informação\nNome: equipamento A\nEmpresa/especialidade: descrição livre');
});
