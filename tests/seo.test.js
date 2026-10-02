import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const paths=['index.html','sobre/index.html','solucoes/index.html','likawave/index.html','contato/index.html','equipamentos-de-ondas-de-choque/index.html'];
test('every indexable page has unique titles, descriptions, canonical and valid entity data',()=>{
 const titles=new Set(),descriptions=new Set();
 for(const path of paths){const html=readFileSync(path,'utf8');const title=html.match(/<title>(.*?)<\/title>/)[1];const description=html.match(/<meta name="description" content="([^"]+)"/)[1];assert.ok(!titles.has(title));assert.ok(!descriptions.has(description));titles.add(title);descriptions.add(description);const canonical=html.match(/<link rel="canonical" href="([^"]+)"/)[1];assert.ok(canonical.startsWith('https://www.vionex.med.br/'));assert.ok(readFileSync('public/sitemap.xml','utf8').includes(canonical));const schema=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);assert.ok(schema['@graph'].some(entity=>entity['@type']==='Organization'));assert.ok(schema['@graph'].some(entity=>entity['@type']==='WebPage'&&entity.url===canonical));assert.equal((html.match(/<h1\b/g)||[]).length,1);}
});
test('product schema names actual manufacturer without inventing offers or ratings',()=>{const html=readFileSync('likawave/index.html','utf8');const graph=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])['@graph'];const product=graph.find(entity=>entity['@type']==='Product');assert.equal(product.manufacturer.name,'LiKAMED');assert.equal(product.offers,undefined);assert.equal(product.aggregateRating,undefined);});
