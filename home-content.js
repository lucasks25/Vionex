const solutions={
 likawave:{eyebrow:'TECNOLOGIA LIKAMED',title:'Likawave VARIO',description:'Ondas de choque com engenharia alemã. Conheça o equipamento, a tecnologia VARIO e o Wide Focus.',href:'/likawave/',action:'Conhecer o Likawave',visual:'likawave'},
 insumos:{eyebrow:'SOLUÇÕES AMBULATORIAIS',title:'Equipamentos e insumos',description:'Soluções para a rotina de clínicas, hospitais e consultórios. Converse com a Vionex sobre as necessidades da sua operação.',href:'/contato/?interesse=Equipamentos%20e%20insumos',action:'Consultar o portfólio',visual:'insumos'},
 farmacos:{eyebrow:'PORTFÓLIO VIONEX',title:'Fármacos e suplementação',description:'Conheça as linhas disponíveis e encontre, com nossa equipe, as opções que fazem sentido para o seu negócio.',href:'/contato/?interesse=F%C3%A1rmacos%20e%20suplementa%C3%A7%C3%A3o',action:'Consultar disponibilidade',visual:'farmacos'},
 cuidado:{eyebrow:'PORTFÓLIO VIONEX',title:'Higiene e beleza',description:'Um portfólio para diferentes frentes de cuidado. Nossa equipe orienta a seleção e a disponibilidade dos produtos.',href:'/contato/?interesse=Higiene%20e%20beleza',action:'Falar sobre esta linha',visual:'cuidado'}
};
export function getSolution(key){return solutions[key]||{eyebrow:'VIONEX MED',title:'Conheça nossas soluções',description:'Explore as frentes de atuação da Vionex.',href:'/solucoes/',action:'Ver todas as soluções',visual:'insumos'};}
export const productDetails=[
 {label:'Tecnologia VARIO',title:'Ajuste à rotina clínica.',text:'Controle da pressão e da frequência para uma aplicação adequada à sensibilidade do paciente, conforme avaliação profissional.'},
 {label:'Wide Focus',title:'Conheça a distribuição de energia.',text:'O Wide Focus produz um volume de energia amplo. Consulte o mapa e a documentação técnica na página do Likawave.'},
 {label:'Suporte no Brasil',title:'Uma equipe com você.',text:'Orientação comercial, treinamento da equipe e acompanhamento técnico fazem parte da proposta Vionex.'}
];

// Feature labels translated from the manufacturer's product presentation.
export const productHotspots=[
 {label:'Equipamento compacto',text:'Equipamento compacto de mesa.'},
 {label:'Tela EasyTouch',text:'Exibição de pontos-gatilho e sugestões de tratamento na tela EasyTouch.'},
 {label:'Aplicador ergonômico',text:'Aplicador leve e ergonômico com projétil de cerâmica HD e cabo de conexão de 2,5 metros.'}
];
