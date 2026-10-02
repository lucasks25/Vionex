# Vionex Med

Site institucional e comercial, com identidade original azul/turquesa e fontes Inter/Manrope. HTML, CSS e JavaScript com Vite.

## Executar

```sh
npm install
npm run dev
```

## Páginas

- `/`: apresentação, foto original Vionex, apresentação Wide Focus, pontos interativos Likawave, vídeo inline, CEO e publicações oficiais
- `/sobre/`: empresa, parceria e liderança
- `/solucoes/`: portfólio e interesses comerciais
- `/likawave/`: equipamento, vídeo, Wide Focus e perguntas frequentes
- `/contato/`: formulário e canais oficiais

`npm run build` gera todas as páginas em `dist`; `npm run preview` serve a produção. `npm test` verifica consentimento, telefone e montagem da mensagem comercial.

## Foto do CEO

A home apresenta Vagner Monferrer Gonzales, identificado pelo cliente como CEO, com retrato corporativo oficial obtido da diretoria da SP Osteos. A foto não recebe filtros, animações ou efeitos de hover. `leadership.json` também configura essa foto na página institucional. Nenhuma fala pessoal ou biografia foi inventada.

## Contato

O formulário valida dados e apresenta a mensagem com link para o WhatsApp oficial. O visitante revisa e envia. Categorias selecionadas no portfólio chegam preenchidas ao formulário. Não há armazenamento de leads nem envio automático. Política de privacidade aponta para a página oficial.

## Conteúdo e publicação

Imagens, vídeo, contatos e portfólio provenientes de https://www.vionex.med.br. Depoimentos com fotos genéricas e percentuais clínicos sem documentação verificável foram omitidos. Adicione depoimentos reais e documentação quando disponíveis.

Publique `dist` em hospedagem estática com HTTPS, preservando as subpastas de cada página. A reconstrução não foi publicada no domínio oficial. O vídeo é servido localmente e carregado sob demanda. Na home, pode ser reproduzido diretamente na seção ou ampliado, mantendo a posição entre os modos.

A inicial mantém o foco no Likawave e utiliza a fotografia original Vionex na hero, inteira e estática, com cantos suaves e movimento discreto apenas no fundo. Publicações fixadas do perfil oficial são exibidas com miniaturas locais e links diretos; a seleção é editorial, sem atualização automática. O vídeo usa uma prévia extraída aos 8 segundos, carregamento sob demanda e pausa ao fechar a janela. Fontes e regras de composição estão em `docs/layout-system.md`; mídia em `docs/assets-sources.md`.

## Idiomas e experiência

Português do Brasil e inglês americano nas cinco páginas, incluindo navegação, acessibilidade, mensagens e prévia do WhatsApp. A primeira visita consulta o país aproximado do IP: EUA usam inglês; Brasil usa português. A escolha PT/EN do visitante é lembrada e tem prioridade. Em falhas da consulta, o idioma do navegador serve de alternativa. Detalhes e limites em `docs/localization.md`.

A home apresenta o Wide Focus com o mapa original, uma explicação breve e um link para a página técnica, sem controles sobrepostos ao gráfico. Os pontos do equipamento abrem uma prévia animada com fotografia real ao passar o mouse, focar ou tocar. A hero tem movimento de fundo lento e de baixa intensidade, com a fotografia estática; a preferência por movimento reduzido desativa as animações. A navbar acompanha a rolagem e indica a página institucional atual.
