# Sistema de composição Vionex Med

## Direção

Uma apresentação institucional e comercial da Vionex Med, com o Wide Focus como protagonista técnico dentro da solução Likawave. O sistema parte dos elementos próprios da marca: azul profundo, turquesa, símbolo com volumes arredondados e fotografia original dos equipamentos. Não usa template visual nem composição copiada de concorrentes.

## Regras aplicadas na home

- **Cor:** azul `#10213d` nos espaços de apresentação e conversão; turquesa `#60a9ba` nos destaques; `#397f93` para texto de destaque em fundo claro; fundos claros `#f7f9fc` e `#edf2f6`. Cores da fotografia permanecem originais.
- **Tipografia:** Manrope nos títulos, Inter na navegação, texto e controles. Títulos fluidos, com pesos 500/600 e destaques de cor sem itálico. Texto não recebe promessas de resultado clínico novas.
- **Ritmo:** espaçamento entre seções de 64 a 112 px; margens laterais fluidas, com conteúdo limitado a 1.320 px nas telas grandes. Texto, fotografia, exploração interativa e publicações têm composições distintas dentro desse ritmo.
- **Forma:** fotografia original da hero com os dois equipamentos, apresentada integralmente, estática e com cantos suaves, sem máscara sobre o contorno dos aparelhos. Telas, inscrições e aparência são os pixels da imagem original. O palco de exploração usa volume orgânico inspirado no símbolo da marca. Transições entre seções usam curvas amplas, sem grades ou linhas decorativas.
- **Publicações:** três posts fixados oficiais em composição escalonada no desktop e coluna de leitura no celular. Miniaturas completas, data real e link direto. Os títulos abaixo das imagens são chamadas editoriais, não transcrições da legenda. Não são apresentados como os posts mais recentes nem como feed sincronizado.
- **Protagonista:** Wide Focus ocupa a primeira seção após a abertura institucional. Seu mapa técnico aparece íntegro, sem oval, abas, contador ou controles sobrepostos. Uma explicação curta e um link conduzem à página técnica.
- **Interação:** pontos e abas para conhecer o Likawave; vídeo reproduzido diretamente na seção, com controles nativos e botão opcional para ampliar. Ao ampliar, a reprodução inline pausa; a posição é compartilhada ao abrir e fechar a janela. Links de posts abrem a publicação oficial. Os pontos do produto abrem uma prévia com fotografia oficial por hover, foco ou toque; A saída do mouse do ponto e da prévia encerra a janela mesmo após clicar; Escape, botão de fechar e toque fora também encerram a prévia. O foco por teclado é preservado durante a navegação. Sem setas decorativas.
- **Movimento:** ondas volumétricas em SVG e volumes de luz azul e turquesa se deslocam nos fundos da abertura, do Wide Focus e do contato. A hero recupera as primeiras ondas azuis, com ciclos independentes de 14, 19 e 23 segundos e deslocamento suave. A foto permanece estática; não há flutuação ou paralaxe. A preferência por movimento reduzido desativa todas essas animações. A navbar recebe fundo translúcido ao rolar. Nenhum movimento é necessário para ler ou navegar.
- **Idiomas:** PT/EN na navbar; país do IP seleciona o idioma inicial, com escolha manual persistente e alternativa em caso de falha. Fontes, cores e identidade permanecem as mesmas.
- **Acessibilidade:** hierarquia de títulos, texto alternativo, áreas de toque, navegação por teclado nas abas, foco visível e respeito à preferência por movimento reduzido.

## Escopo atual

A home destaca apenas o equipamento principal. As páginas institucionais e de soluções existentes continuam acessíveis por suas URLs. Blog, painel administrativo e geração automática de conteúdo permanecem fora do escopo, conforme orientação do usuário.

Os tokens de composição estão em `home.css` sob o comentário “Vionex composition”. São específicos da home para preservar as outras páginas durante esta revisão.

## Liderança e vídeo

A home inclui uma seção de Vagner Monferrer Gonzales após a apresentação institucional. Seu nome e papel de CEO foram informados pelo cliente; o retrato foi localizado na página oficial da diretoria da SP Osteos. A foto é estática, em sua resolução original, sem filtros, recortes do rosto ou efeitos. O texto ao lado representa a marca, sem ser apresentado como citação pessoal.

O vídeo tem título curto acima da composição, player predominante à esquerda e apoio conciso à direita. A prévia continua sendo o quadro real do vídeo, com reprodução na própria seção e ampliação opcional. No celular, player e apoio se empilham.


Revisão de proporções: hero e Wide Focus compartilham o limite de 1.320 px. O vídeo usa um card de até 920 px, player ao lado do texto no desktop e coluna no celular, com ampliação por ícone acessível. O perfil do CEO usa o componente `home-team-card`, com retrato estático, nome, cargo, apresentação e link institucional; a estrutura pode ser repetida para a equipe.

Interação Wide Focus: uma faixa luminosa percorre a profundidade do mapa original, sem estimar pressão ou resultados. Cursor e toque posicionam a luz; teclado permite percorrer o mapa por setas, Home e End. A animação automática respeita movimento reduzido. Não há pop-up, slider ou novas abas.

Referência de estudo para perfis: [COLLINS Team](https://wearecollins.com/team/), com imagem individual e hierarquia curta de nome/cargo. A implementação Vionex usa fotografia estática, painel em azul profundo e marca no campo do retrato. A apresentação da empresa fica fora do card; `home-team-grid` aceita novos perfis sem repetir a apresentação institucional.

Ajuste solicitado para perfil: card de 300 px, retrato de 280 × 345 px em palco de 285 px, com aproximação por recorte do espaço e parte inferior. Inclinação 3D acompanha o cursor em computadores, retorna ao sair e respeita movimento reduzido. Celulares mantêm o card estável.

Direção final do perfil: card estático, sem inclinação nem movimento. O retrato se projeta acima da borda superior do painel azul turquesa, criando profundidade por sobreposição. O fundo recebe um degradê radial estático e a identificação fica na base em azul profundo.

A seção de vídeo usa somente os controles nativos para tela cheia. O botão externo e a janela adicional foram removidos; a legenda inferior não reserva mais uma faixa de 44 px e o padding inferior foi reduzido.

O retrato original possui 24 px transparentes na base. A posição CSS compensa essa margem para conectar o torso diretamente à faixa de identificação, preservando a imagem original e a projeção da cabeça acima do card.

Integração final do retrato: o fundo turquesa termina no mesmo azul profundo da identificação. Uma transição de opacidade cobre apenas a base do paletó (86–92,5% da altura da imagem), eliminando o corte horizontal seco; rosto e corpo superior mantêm aparência original e não há movimento.

Seção de aplicação final: composição sem moldura externa ou legenda inferior, player e texto em duas colunas, com margem superior de 64–96 px. Controles próprios dentro do vídeo fornecem play/pause, tempo, som e tela cheia, sem barra de progresso cinza. Controles nativos ficam como alternativa caso o JavaScript não carregue.

Espaçamento ampliado acima da aplicação: margem de 112–160 px no desktop e 96 px no celular. A legenda externa e qualquer botão abaixo do vídeo permanecem ausentes.

### Likawave in 60 seconds — 2 October 2026

Navy guided story with five named chapters, real imagery beside the copy, compact countdown and selectable chapter navigation. No decorative rules, arrow buttons or boxed content cards. Mobile stacks imagery and copy and allows chapter navigation to scroll within its own row. Hero clinical footage fills the full hero with cover framing; the product indicators overlay the same footage. The hero is 760px tall on desktop, with no additional CSS zoom, and plays at 0.75×. Application scenes use a dedicated 16:9 crop; the shoulder scene is reframed and horizontally mirrored to keep the contact on the right, clear of the copy. No blurred layer or inset video is used.

User reverted the latest hero re-edit on 2 October: restored `hero-clinical-clean.mp4`, original 880px desktop height and 1.1× scale (1.02× mobile). Playback remains 0.75× and indicators stay over the footage. No blurred or mirrored re-edit is active.

### Current hero and navigation — 2 October

The complete hero fits the initial viewport (100svh), with a centered content grid and product facts anchored inside its lower edge. No extra CSS zoom is applied. The user restored the previous shoulder scene and the stable `hero-clinical-clean.mp4` sequence; experimental re-edits are unused. Header background is transparent over heroes, matches the section at the reading position when scrolling, and switches link/CTA/menu/language contrast on light surfaces.

### Hero framing and spacing — 2 October
The clinical hero now uses hero-clinical-wide.mp4: a 1280×580 crop of the same original-direction sequence, widening the previous 1280×510 crop. Centered object position with no additional scale; playback remains 0.75×. The heading, description and CTA form a vertically centered group above the product facts. Verified at 1280×720 (heading starts at 212px, header ends at 96px, facts end at 692px) and 390×844 (facts end at 820px, no horizontal overflow).

### Homepage refinements — 2 October 2026
Solutions: single product photograph, one border per application row, selected technology indicator, contained commercial buttons. Replaced timed sixty-second carousel with user-selected official VARIO mode diagrams to complement the product overview. Stories moved immediately after this navy section, keeping the navy-to-white overlap, with 88–128px white bottom padding. Homepage contact now uses direct phone, email and demonstration links, without promotional icon cards.
