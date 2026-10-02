# Authentic LiKAMED / LiKAWAVE assets

Retrieved 2026-10-01. Files downloaded unchanged from the manufacturer's official website and visually inspected. These are the human-use LiKAWAVE VARIO 3i device and branded handpiece; no veterinary equipment or unrelated treatment furniture is represented.

| Local asset | Dimensions | Ratio / background | Official image source | Official page establishing context |
|---|---|---|---|---|
| `public/assets/new-likawave-3i.webp` | 800 × 549 | 1.457:1; transparent alpha, natural equipment shadow | [Product cutout](https://likamed.de/wp-content/uploads/2025/09/Likawave3i_Freisteller_mit_Schatten-1.webp) | [LiKAWAVE VARIO 3i product page](https://likamed.de/stosswellentherapiegeraete/likawave-vario-3i/) |
| `public/assets/new-likawave-clinical.webp` | 1552 × 1552 | Square; real physician applying LiKAWAVE VARIO 3i handpiece to a patient's knee | [Clinical scene](https://likamed.de/wp-content/uploads/2025/02/LIKAMEDxSUN-360-0078.webp) | [Official shockwave references, “LiKAWAVE für Sportmedizin”](https://likamed.de/stosswellentherapiegeraete/referenzen/) |
| `public/assets/new-likawave-clinical-detail.webp` | 1552 × 1552 | Square; close view of branded handpiece in knee application | [Application detail](https://likamed.de/wp-content/uploads/2025/02/LIKAMEDxSUN-360-0095.webp) | [Official shockwave references, “LiKAWAVE für Sportmedizin”](https://likamed.de/stosswellentherapiegeraete/referenzen/) |

The product cutout is suitable for an unmasked navy hero with `object-fit: contain`. The wider clinical scene adds authentic human context; the close-up works for a technical/application story. Assets remain unchanged, with their original colors and photographic detail.

## Home: original Vionex assets and official posts

Updated 2026-10-01. The hero uses `public/assets/likawave.jpg`, the original two-device photograph from the Vionex website, as requested in the user's screenshot. `clinical-preview.jpg` is an unaltered frame at 8 seconds of the original local `clinical.mp4` (1920 × 1080), extracted with FFmpeg. It replaces the unrelated static clinical photograph as video preview.

Official pinned posts were verified on the public [Vionex Instagram profile](https://www.instagram.com/vionexmed/). Their thumbnail files are saved locally without visual changes to avoid depending on expiring CDN image URLs. This is a manually curated selection, not an automatically synchronized feed.

| Local thumbnail | Publication | Published |
|---|---|---|
| `vionex-post-may29.jpg` | [Likawave and clinic operations](https://www.instagram.com/vionexmed/p/DY630hbRezF/) | 2026-05-29 |
| `vionex-post-may28.jpg` | [Medical intelligence and care](https://www.instagram.com/vionexmed/p/DY5WHicSpoJ/) | 2026-05-28 |
| `vionex-post-may24.jpg` | [Vionex brand](https://www.instagram.com/vionexmed/p/DYu_H9rEvuL/) | 2026-05-24 |

## Hero: current presentation

The hero displays the original `public/assets/likawave.jpg` intact at its original aspect ratio. No mask, clip path, generated background removal or animation is applied to the photograph. Rounded corners are confined to the outside photograph frame. The earlier vector silhouette was removed because it left visible artifacts around the equipment. Motion now belongs only to the original blue wave background, in 14/19/23-second cycles. Two earlier ImageGen attempts were inspected and rejected; neither is used in the project.

## CEO portrait

`public/assets/vagner-monferrer.png` (260 × 320, original PNG, unchanged) is the corporate portrait labeled **Vagner Monferrer** in the official [SP Osteos board page](https://sp-osteos.com.br/english/), downloaded from [the original image](https://sp-osteos.com.br/english/wp-content/uploads/2023/10/b2.png). The client supplied the full name **Vagner Monferrer Gonzales** and identified him as Vionex's CEO. The source page establishes the portrait, not his Vionex role. No biography or personal quotation was fabricated. The home displays the photo at its native size, with no effects.

## Hero clinical footage — 2 October 2026

`hero-clinical-clean.mp4` is a silent edit of the existing Vionex `clinical.mp4`: application scenes at 7.6–28.4 and 33.3–38.8 seconds, with the lower caption band cropped out. The browser plays the 26.27-second sequence at 0.75× (approximately 35 seconds per loop). `hero-clinical-clean.jpg` is its opening application frame. No generated imagery is used.

### Final hero framing

`hero-clinical-application.mp4` replaces the earlier wide crop. Four continuous clinical shots are cropped to 16:9; the shoulder shot uses source crop x=1010, y=390, width=910, height=680 and a horizontal mirror to place the handpiece/contact on the visible right side. All other shots use the upper 1920×765 area. No blur, artificial frame, or generated pixels are used. Speed remains 0.75× in the browser.

## Official VARIO mode diagrams — 2 October 2026
Downloaded official Pulse, Triangle, Invert and Linear diagrams from https://likamed.de/en/shockwave-therapy-systems/likawave-vario-3i/ (mode-pulse.webp, mode-triangle.webp, mode-invert.png, mode-linear.webp in /wp-content/uploads/2025/01/). Stored as public/assets/likamed-mode-* with manufacturer attribution. No media transformations.

## Vagner em biblioteca de escritório

`vagner-office-library.png`: montagem produzida com a ferramenta de edição de imagem a pedido do usuário, usando `vagner-monferrer.png` como referência de identidade. Ambiente gerado; não representa uma fotografia documental do escritório. O original foi preservado.

`vagner-office-natural.png`: segunda montagem, com iluminação difusa e ambiente de biblioteca mais discreto. Aplicada à seção de liderança em composição retangular com texto sobreposto, conforme referência enviada da Siemens.
