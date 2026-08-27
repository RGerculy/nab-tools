import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { parse as parseYaml } from 'yaml';

const root = resolve(import.meta.dirname, '..');
const privateArticleDir = resolve(root, 'private-content', 'articles');
const exampleArticleDir = resolve(root, 'examples', 'articles');
const articleDir = existsSync(privateArticleDir) ? privateArticleDir : exampleArticleDir;
const output = resolve(root, 'src', 'data', 'articles.generated.ts');
const header = `import type { BlogArticle } from './article-types';\n\n`;
const footer = `\nexport function getArticleBySlug(slug: string): (BlogArticle & { tag: string }) | undefined {\n  for (const [tag, articles] of Object.entries(articlesByTag)) {\n    const article = articles.find(article => article.slug === slug);\n    if (article) return { ...article, tag };\n  }\n  return undefined;\n}\n`;

function parseBlocks(lines) {
  const result = { paragraphs: [], list: [], tip: undefined };
  let paragraph = [];
  const flush = () => { if (paragraph.length) { result.paragraphs.push(paragraph.join('\n')); paragraph = []; } };
  for (const line of lines) {
    if (!line.trim()) { flush(); continue; }
    if (line.startsWith('- ')) { flush(); result.list.push(line.slice(2)); continue; }
    if (line.startsWith('> Tip: ')) { flush(); result.tip = line.slice(7); continue; }
    paragraph.push(line);
  }
  flush();
  if (!result.list.length) delete result.list;
  if (!result.tip) delete result.tip;
  return result;
}

function readArticle(file) {
  const source = readFileSync(file, 'utf8');
  const match = source.match(/^---\n([\s\S]*?)\n---\n(?:\n|$)([\s\S]*)$/);
  if (!match) throw new Error(`Missing front matter: ${file}`);
  const meta = parseYaml(match[1]);
  const lines = match[2].split(/\r?\n/);
  const sections = [];
  let current = null;
  for (const line of lines) {
    const heading = line.match(/^## (.+)$/);
    const subheading = line.match(/^### (.+)$/);
    if (heading) { current = { heading: heading[1], lines: [] }; sections.push(current); continue; }
    if (subheading && current) { current.lines.push(`__FAQ__${subheading[1]}`); continue; }
    if (current) current.lines.push(line);
  }
  const introSection = sections.find(section => section.heading === 'Intro');
  const faqSection = sections.find(section => section.heading === 'FAQ');
  const article = {
    title: meta.title, slug: meta.slug, date: meta.date, excerpt: meta.excerpt,
    intro: parseBlocks(introSection?.lines || []).paragraphs,
    sections: sections.filter(section => !['Intro', 'FAQ', 'Sources'].includes(section.heading)).map(section => ({ heading: section.heading, ...parseBlocks(section.lines) })),
    ...(faqSection ? { faqs: faqSection.lines.reduce((faqs, line) => {
      if (line.startsWith('__FAQ__')) faqs.push({ q: line.slice(7), a: '' });
      else if (faqs.length && line.trim()) faqs[faqs.length - 1].a += `${faqs[faqs.length - 1].a ? '\n' : ''}${line}`;
      return faqs;
    }, []) } : {}),
    ...(meta.relatedToolSlugs?.length ? { relatedToolSlugs: meta.relatedToolSlugs } : {}),
    ...(meta.sources?.length ? { sources: meta.sources } : {}),
  };
  return [meta.tag, article];
}

const grouped = {};
if (existsSync(articleDir)) {
  for (const name of readdirSync(articleDir).filter(name => name.endsWith('.md')).sort()) {
    const [tag, article] = readArticle(join(articleDir, name));
    (grouped[tag] ||= []).push(article);
  }
}
const generated = grouped && Object.keys(grouped).length
  ? `${header}export const articlesByTag: Record<string, BlogArticle[]> = ${JSON.stringify(grouped, null, 2)};${footer}`
  : `${header}export const articlesByTag: Record<string, BlogArticle[]> = {};${footer}`;
mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, generated);
console.log(`Generated ${Object.values(grouped).flat().length} articles from private-content/articles/.`);
