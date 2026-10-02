# Visitor language

The static HTML is Brazilian Portuguese. Import `./i18n.js` once from `main.js` (shared by all five pages). It imports `i18n.css` automatically through Vite. No account, API key, backend, or new dependency is required.

The available locales are `pt-BR` and American English (`en-US`). Language resolution uses this order:

1. Explicit `?lang=en-US` or `?lang=pt-BR`, or the latest PT/EN button click.
2. A manual language choice previously saved in `localStorage` (`vionex.locale`).
3. Country detected from the visitor's public IP: US → `en-US`; BR → `pt-BR`.
4. The first English or Portuguese entry in `navigator.languages`; otherwise Portuguese.

The site renders immediately using available preferences and browser information while country lookup runs. It never waits to enable menus, forms, media, or content. The header provides PT/EN buttons with pressed state and accessible labels; below 760px they replace the header contact CTA so the logo and menu still fit. A manual click persists the language and removes a URL test override; late network responses cannot override that click. When storage is blocked, the selector still works in the current document.

## IP lookup and limits

`https://ipapi.co/country/` returns the client IP's two-letter country code as plain text, as documented in the [official ipapi reference](https://ipapi.co/api/#location-of-clients-ip) (checked October 1, 2026). The request omits credentials and referrer, and does not submit form data. The browser request necessarily exposes the visitor's public IP to ipapi.co.

A valid country result is cached for 24 hours in `vionex.country` as `{country, timestamp}`. Unsupported countries use browser fallback. Failed HTTP responses (including quota exhaustion), malformed responses, blocked requests, offline mode, and a four-second timeout fall back without breaking the page. The timeout bounds response-body waiting as well as connection waiting.

IP location is an estimate: VPNs, proxies, corporate networks, cached results, unavailable country data, and service limits can prevent it from reflecting a visitor's actual location. The permanent manual selector is the graceful fallback. This feature does not promise guaranteed IP detection. The free external service may require an appropriate production plan as usage grows.

## Translation maintenance

`locales/en-US.js` maps exact original Portuguese strings to American English. `translateText()` preserves surrounding whitespace and normalizes internal whitespace for lookup; unknown copy remains as authored. Add a translation whenever Portuguese content is added or changed. Product names, trademarks, addresses, phone destination, and technical units remain their original business values; the floor description is translated. No US office, currency conversion, sales territory, or treatment claim is introduced.

The DOM translator changes text nodes in place, preserving links, emphasis, markup, handlers, and interactive controls. It also translates document title, meta description, placeholders, `alt`, `title`, `aria-label`, and `aria-valuetext`. It retains each original source so selecting PT restores Portuguese. Mutation observation catches dynamic tabs, menu labels, form errors, and later content updates; observation is disconnected during its own writes to avoid loops. Scripts, styles, textareas, and `[data-i18n-ignore]` are excluded from text translation. User-entered field values are never translated.

The contact dialog's `#message-preview` and `#whatsapp-ready` link use the same translation of the message framing. Names, phone, specialty, and free-text needs remain verbatim, including line breaks. Changing language while the dialog is open updates both preview and actual outgoing URL. The Brazilian contact number and phone validation stay the same.

HTML source and routes remain Portuguese, with English applied in the browser. This does not create separately indexed English routes or translate third-party Instagram posts/video pixels. `vionex:languagechange` is emitted after manual selection or a country-driven change, with `{locale}` in event detail, for future consumers.

## Verification

Run `npm test`. Locale tests use real resolver/translation functions and isolated network responses; they cover country precedence, manual/URL preferences, browser fallback, invalid cache values, offline/HTTP/malformed responses, bounded timeout, source restoration, dynamic copy, and preservation of user data in outgoing WhatsApp messages.

Browser checks: visit each page with `?lang=en-US`, exercise the homepage Wide Focus and product tabs, change language back to PT, check mobile header fit, and submit the contact form without sending. Confirm the preview and `text` query parameter of the WhatsApp link agree. To test automatic country lookup again, remove `vionex.locale` and `vionex.country` in browser storage, then reload without `?lang`.
