# NAB Tools

> Free online tools that run in your browser. No uploads. No accounts. No tracking.

**Use the live tools:** [tools.notabis.com](https://tools.notabis.com/)

NAB Tools is a collection of practical browser-based utilities for developers,
creators, students, and everyday web tasks. Text, files, passwords, tokens, and
other input are processed locally by JavaScript wherever the tool does not
explicitly need an external lookup.

[![Live site](https://img.shields.io/badge/try%20it-live%20site-2563eb)](https://tools.notabis.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Built with React](https://img.shields.io/badge/built%20with-React%20%2B%20TypeScript-61dafb)](https://react.dev/)

## Why this project exists

Many useful web tools do not need a server. A password generator does not need
to upload the password it creates. A JSON formatter does not need to transmit
the JSON being formatted. A hex decoder does not need an account or a database.

NAB Tools keeps that work in the browser so the tools are fast, inexpensive to
host, and inspectable. The source is available so anyone can check how the
client-side processing works.

## Tool catalogue

The live site currently contains 60 tools across seven groups:

| Group | Examples |
|---|---|
| [Generators](https://tools.notabis.com/) | [Password Generator](https://tools.notabis.com/tools/password-generator), [UUID Generator](https://tools.notabis.com/tools/uuid-generator), [QR Code Generator](https://tools.notabis.com/tools/qr-code-generator), [WiFi QR Generator](https://tools.notabis.com/tools/wifi-qr-generator) |
| [Security](https://tools.notabis.com/) | [Password Strength Tester](https://tools.notabis.com/tools/password-strength), [File Hash Checker](https://tools.notabis.com/tools/file-hash), [JWT Decoder](https://tools.notabis.com/tools/jwt-tool), [HTTP Headers Analyzer](https://tools.notabis.com/tools/http-headers) |
| [Utilities](https://tools.notabis.com/) | [Color Contrast Checker](https://tools.notabis.com/tools/contrast-checker), [QR Decoder](https://tools.notabis.com/tools/qr-decoder), [Image Resizer](https://tools.notabis.com/tools/image-resizer), [EXIF Viewer](https://tools.notabis.com/tools/exif-viewer) |
| [Calculators](https://tools.notabis.com/) | [Mortgage Calculator](https://tools.notabis.com/tools/mortgage-calculator), [BMI Calculator](https://tools.notabis.com/tools/bmi-calculator), [Unix Permissions](https://tools.notabis.com/tools/unix-permissions), [Date Difference](https://tools.notabis.com/tools/date-difference) |
| [Text Tools](https://tools.notabis.com/) | [JSON Formatter](https://tools.notabis.com/tools/json-formatter), [Regex Tester](https://tools.notabis.com/tools/regex-tester), [Text Diff](https://tools.notabis.com/tools/text-diff), [Word Counter](https://tools.notabis.com/tools/word-counter) |
| [Converters](https://tools.notabis.com/) | [Base64](https://tools.notabis.com/tools/base64-tool), [Hex](https://tools.notabis.com/tools/hex-encoder), [URL Encoding](https://tools.notabis.com/tools/url-encoder), [YAML ↔ JSON](https://tools.notabis.com/tools/yaml-json), [Unicode Escapes](https://tools.notabis.com/tools/unicode-escape-tool) |
| [Network](https://tools.notabis.com/) | [DNS Lookup](https://tools.notabis.com/tools/dns-lookup), [What Is My IP](https://tools.notabis.com/tools/ip-check), [URL Parser](https://tools.notabis.com/tools/url-parser) |

For the complete catalogue, visit [NAB Tools](https://tools.notabis.com/).

## Privacy model

For local tools, processing happens in the browser. NAB Tools does not upload,
store, or log the text and files entered into those tools. There is no user
account system and no application database behind the tools.

Two lookup tools necessarily contact third-party services:

- **What Is My IP** contacts [ipify](https://www.ipify.org/) and
  [ip-api.com](https://ip-api.com/) to return public IP and approximate location
  information.
- **DNS Lookup** contacts Cloudflare or Google DNS-over-HTTPS with the domain
  and record type being queried.

These exceptions are visible in the source and documented on the live site's
[privacy page](https://tools.notabis.com/privacy). “Browser-based” does not
mean “the browser makes no network requests”; it means the tool logic runs on
the client and local input is not sent to NAB Tools servers.

## Tech stack

- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/)
- [Lucide](https://lucide.dev/) icons
- [jsQR](https://github.com/cozmo/jsQR) for QR decoding
- [qrcode.react](https://github.com/zpao/qrcode.react) for QR generation
- [yaml](https://eemeli.org/yaml/) for YAML parsing
- Web Crypto APIs for browser cryptography and secure random generation

The production output is a static `dist/` directory and can be hosted on
nginx, Apache, GitHub Pages, Cloudflare Pages, Netlify, or another static host.

## Run locally

Requirements:

- Node.js 20 or newer recommended
- npm

```bash
git clone https://github.com/RGerculy/nab-tools.git
cd nab-tools
npm install
npm run dev
```

Open the local URL printed by Vite.

Build and preview the production bundle:

```bash
npm run lint
npm run build
npm run preview
```

## Public tools-only build

The blog content is intentionally not part of the public source release. The
production articles are maintained privately as one Markdown file per article
under `private-content/articles/` and injected only during the production
build. Without the private directory, the build uses one deliberately generic
example article from `examples/articles/` so the content workflow remains
demonstrable without exposing the real article catalogue.

To build the public tools-only edition:

```bash
cp .env.example .env
npm install
npm run build
```

This sets `VITE_ENABLE_BLOG=false`. The private article directory is optional;
without it, the project still builds successfully using only the example
article.

For the private production build, keep `private-content/articles/` in the
workspace and leave `VITE_ENABLE_BLOG` unset or set it to `true`.

## Project structure

```text
src/
├── components/       Shared layout, pages, and tool routing
├── data/tools.ts     Authoritative tool catalogue
├── data/content/     Explanatory content for tool pages
└── tools/             Browser-side tool implementations
public/               Static assets, sitemap, and site metadata
scripts/              Build-time article generation
examples/articles/    One generic public example article
private-content/      Local-only production articles; never published
```

The public repository contains the complete tool implementations. Private
article files and the generated article registry are excluded by `.gitignore`.

## Contributing

Issues and pull requests are welcome. Useful contributions include:

- New browser-local tools that solve a clear problem.
- Improvements to accessibility, keyboard navigation, and mobile layouts.
- Tests for malformed input, Unicode, binary data, and edge cases.
- Documentation corrections and clearer privacy explanations.
- Performance improvements that do not move local processing to a server.

Before adding a tool, check the existing catalogue to avoid duplicating an
existing capability. Keep privacy claims precise: distinguish local processing
from third-party lookups, and do not describe encoding as encryption or
heuristic detection as certainty.

Please run these checks before opening a pull request:

```bash
npm run lint
npm run build
```

## Licence

This project is released under the [MIT License](LICENSE).

The project depends on third-party packages with their own licences. Those
licences remain applicable to the relevant dependencies.

## Links

- **Source repository:** <https://github.com/RGerculy/nab-tools>
- **Live tools:** <https://tools.notabis.com/>
- **Privacy policy:** <https://tools.notabis.com/privacy>
- **Terms:** <https://tools.notabis.com/tos>
- **Issues:** use the GitHub Issues tab in this repository
