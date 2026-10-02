import test from 'node:test';
import assert from 'node:assert/strict';
let buildContact;
try { ({buildContact}=await import('../contact.js')); } catch {}
test('recusa contato sem consentimento',()=>{ assert.equal(typeof buildContact,'function'); assert.throws(()=>buildContact({name:'Lucas',phone:'11999999999',consent:false}),/consentimento/); });
test('recusa telefone inválido',()=>{ assert.equal(typeof buildContact,'function'); assert.throws(()=>buildContact({name:'Lucas',phone:'123',consent:true}),/telefone/); });
test('monta mensagem real para o WhatsApp da Vionex com caracteres seguros',()=>{ assert.equal(typeof buildContact,'function'); const url=new URL(buildContact({name:'João & Maria',phone:'(11) 99999-9999',company:'Clínica São Paulo',need:'Likawave',consent:true})); assert.equal(url.pathname,'/551152820777'); assert.match(url.searchParams.get('text'),/João & Maria/); assert.match(url.searchParams.get('text'),/Clínica São Paulo/); });
