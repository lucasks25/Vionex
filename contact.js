export function buildContact({name,phone,company='',need='',consent}) {
 if (!consent) throw new Error('É necessário autorizar o contato com seu consentimento.');
 if (!name?.trim()) throw new Error('Informe seu nome.');
 const digits=phone?.replace(/\D/g,'') || '';
 if (!/^(?:55)?\d{10,11}$/.test(digits)) throw new Error('Informe um telefone válido com DDD.');
 const message=`Olá, Vionex! Gostaria de conhecer suas soluções.\n\nNome: ${name.trim()}\nWhatsApp: ${phone.trim()}${company.trim() ? `\nEmpresa/especialidade: ${company.trim()}` : ''}${need.trim() ? `\nNecessidade: ${need.trim()}` : ''}`;
 return `https://wa.me/551152820777?text=${encodeURIComponent(message)}`;
}
