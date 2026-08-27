---
title: How Browser-Local Tools Protect Your Input
slug: browser-local-processing-example
date: 2026-08-27
excerpt: A short example article showing how NAB Tools keeps ordinary tool processing in your browser.
tag: examples
relatedToolSlugs:
  - json-formatter
  - hex-encoder
sources:
  - title: MDN — Web APIs
    url: https://developer.mozilla.org/en-US/docs/Web/API
---

## Intro

A large number of everyday web utilities do not need a server. Formatting JSON, converting text to hexadecimal, counting words, and calculating a percentage can all happen inside the browser that is already running the page.

NAB Tools is designed around that simple idea: send only the code needed to run the tool, then process ordinary input on the device that entered it.

## What happens when you use a local tool

The page loads the application JavaScript and the selected tool. When you type or paste data, the tool reads that value from the page, performs its operation, and renders the result locally.

For local tools, the input is not submitted to an NAB Tools application server. Refreshing the page clears the working state unless the browser itself has retained page data through normal browser features.

## Browser-local is not the same as offline

A tool can process input locally while still needing the internet to download its JavaScript, fonts, or other assets the first time it is opened. A small number of lookup tools also contact a third-party service because they need information that only an external resolver can provide.

That is why the privacy explanation identifies the IP and DNS lookup exceptions rather than making the broader and less accurate claim that the browser makes no network requests.

> Tip: For sensitive work, inspect the source, use a trusted copy, and remember that browser extensions and the device itself are outside the control of any website.

## Why publish the source

Publishing the tool source makes the privacy model independently inspectable. Visitors can see whether a formatter, encoder, calculator, or generator sends its input anywhere instead of relying only on marketing text.

That is the purpose of the public NAB Tools repository: the tools should be useful, and the important privacy claims should be checkable.

## FAQ

### Does NAB Tools store text entered into local tools?

The local tools do not upload, store, or log the text entered into them on NAB Tools servers.

### Do all tools work without network access?

No. The application assets must normally be loaded first, and the IP and DNS lookup tools use external services by design. The rest of the tool logic is intended to run locally.

### Is browser-local processing a security guarantee?

No. It reduces what the site needs to receive, but users should still use trusted software, keep browsers updated, and avoid entering secrets into unfamiliar websites.
