import test from 'node:test';
import assert from 'node:assert/strict';
let getSolution;
try {({getSolution}=await import('../home-content.js'));} catch {}
test('portfólio mantém o interesse escolhido até o contato',()=>{assert.equal(typeof getSolution,'function');const selected=getSolution('insumos');const href=new URL(selected.href,'http://localhost');assert.equal(href.pathname,'/contato/');assert.equal(href.searchParams.get('interesse'),'Equipamentos e insumos');});
test('Likawave leva à página técnica do produto',()=>{assert.equal(typeof getSolution,'function');assert.equal(getSolution('likawave').href,'/likawave/');});
test('uma opção desconhecida tem alternativa comercial válida',()=>{assert.equal(typeof getSolution,'function');assert.equal(getSolution('desconhecida').href,'/solucoes/');});
