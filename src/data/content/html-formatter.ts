import type { ToolContent } from './types';

export const htmlFormatterContent: ToolContent = {
  slug: 'html-formatter',
  intro: ['Format compressed HTML into readable indentation, or minify it for a smaller page payload. Comments and whitespace between tags are handled locally in your browser.', 'This is a lightweight formatter for inspection and cleanup. It does not attempt to rewrite, validate, or execute scripts.'],
  sections: [
    { heading: 'Why format HTML?', paragraphs: ['Production HTML is often compressed to reduce bytes, but a single long line is difficult to inspect. Indentation makes parent and child elements visible, which helps when debugging layout, missing closing tags, and copied snippets.'] },
    { heading: 'What minification changes', paragraphs: ['Minification removes comments and whitespace between tags. It does not change text inside an element or rewrite attributes. Avoid minifying source that depends on meaningful whitespace between inline elements until you have tested the result.'] },
    { heading: 'Formatter versus validator', paragraphs: ['Formatting changes presentation; validation checks whether markup follows HTML rules. A formatted document can still contain an invalid nesting or a missing attribute. Use browser developer tools and an HTML validator when correctness matters.'], tip: 'Keep a readable source version in your project and minify during your build pipeline rather than editing minified output by hand.' },
  ],
  faqs: [
    { q: 'Does formatting change my HTML?', a: 'The formatter adds indentation and line breaks for readability. It does not intentionally rewrite element names or attributes.' },
    { q: 'Does minifying remove comments?', a: 'Yes. HTML comments are removed by the minify mode, along with whitespace between tags.' },
    { q: 'Is this an HTML validator?', a: 'No. It is a formatter and minifier. Use a validator separately when you need standards checking.' },
    { q: 'Can I format a full HTML document?', a: 'Yes. Paste a document or fragment; the tool treats tags and text as a readable HTML string.' },
  ],
  relatedSlugs: ['markdown-to-html', 'json-formatter', 'regex-tester'],
};
