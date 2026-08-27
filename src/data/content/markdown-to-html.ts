import type { ToolContent } from './types';

export const markdownToHtmlContent: ToolContent = {
  slug: 'markdown-to-html',
  intro: ['Convert Markdown into clean HTML in your browser. Headings, emphasis, links, lists, code blocks, and images are supported with a live preview.', 'The converter is useful for README files, blog drafts, documentation, and CMS editors. Your Markdown is processed locally.'],
  sections: [
    { heading: 'What Markdown is', paragraphs: ['Markdown is a plain-text writing format that uses small punctuation conventions for structure. A line beginning with # becomes a heading, **double asterisks** make bold text, and a hyphen begins a list item. It stays readable even before conversion.'] },
    { heading: 'Markdown to HTML basics', paragraphs: ['HTML gives browsers structure; Markdown gives writers a short way to describe that structure. A Markdown converter turns the readable source into tags such as h1, p, strong, a, ul, and li.'] , list: ['# Heading becomes an h1 element.', '**bold** becomes strong text.', '[label](https://example.com) becomes a link.', '- item becomes an unordered list.'] },
    { heading: 'Check links and raw HTML', paragraphs: ['Always review the generated HTML before publishing. Check that links point to the intended destination and that any raw HTML or embedded content follows the security rules of the site where you will paste it.'], tip: 'Keep the original Markdown as your source file. HTML is usually the publishing format, but Markdown is easier to edit and version-control.' },
  ],
  faqs: [
    { q: 'What does Markdown convert to?', a: 'Markdown converts to HTML elements such as headings, paragraphs, emphasis, links, lists, images, and code blocks.' },
    { q: 'Does this converter upload my Markdown?', a: 'No. Conversion and preview happen in your browser, so the text stays on your device.' },
    { q: 'Can Markdown create links?', a: 'Yes. Use the syntax [link text](https://example.com). The converter turns it into an HTML anchor element.' },
    { q: 'What is the difference between Markdown and HTML?', a: 'Markdown is a compact authoring syntax designed to remain readable as plain text. HTML is the tag-based language browsers render.' },
  ],
  relatedSlugs: ['html-formatter', 'json-formatter', 'url-encoder'],
};
