import { useState } from 'react';
import { Check, Copy, FileText } from 'lucide-react';
import { copyText } from '../utils/clipboard';
import './tools.css';

const SAMPLE = `About this template
Keep useful developer knowledge somewhere you can actually find it again.

What's included
Notes
— Save setup guides, bug fixes, architecture decisions, and deployment checklists.

Code Snippets
— Store reusable code with language, framework or tool, status, and tags.

Projects
— Optionally connect notes and snippets to active or archived projects.

Simple by design
Projects are optional.

Built-in views
Use prepared views to browse your workspace:
All Notes
Notes Gallery
All Snippets
Favourites

Best for
Developers
Coding students
Indie hackers
Technical hobbyists`;

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] ?? c));
}

function isUrl(text: string): boolean {
  return /^https?:\/\/\S+$/i.test(text.trim());
}

const isShort = (s: string) => s.length <= 40;
const endsWithPunct = (s: string) => /[.!?:]$/.test(s);
const isLabelLike = (s: string) => isShort(s) && !endsWithPunct(s) && /^[A-Za-z0-9]/.test(s);
const isTitleHeading = (s: string) => /^[A-Z][A-Za-z0-9 &'()\-]{2,44}$/.test(s) && !endsWithPunct(s);

// Word processors often use curly apostrophes (’) — treat them as straight for matching.
const normalizeApostrophes = (s: string) => s.replace(/[\u2018\u2019]/g, "'");

// Common section labels that would otherwise be mistaken for list items
// (e.g. "Best for" followed by an audience list).
const KNOWN_HEADINGS = new Set([
  'about this template', "what's included", 'simple by design', 'built-in views',
  'best for', 'easy to start', 'free vs premium', 'important limitations',
  'overview', 'features', 'getting started', 'how to use', 'what you get',
  'installation', 'setup', 'usage', 'requirements', 'faq', 'frequently asked questions',
  'pricing', 'conclusion', 'examples', 'tips', 'troubleshooting', 'limitations',
  'table of contents', 'about', 'contact', 'support', 'changelog', 'release notes',
]);

/**
 * Heuristic plain-text -> Markdown conversion:
 * - short lines ending with ':' become headings
 * - short title-case lines followed by a body line become headings
 *   ("What's included", "Built-in views", "Best for")
 * - a label line followed by an em-dash continuation becomes a bold bullet
 *   ("Notes" + "— Save setup guides…" -> "- **Notes** — Save setup guides…")
 * - consecutive short lines become a bullet list ("All Notes", "Notes Gallery", …)
 * - lines starting with - * • or 1. stay lists; bare URLs become links
 * - everything else becomes paragraphs
 */
function convertToMarkdown(source: string): string {
  const lines = source.replace(/\r\n?/g, '\n').split('\n');

  // Split into segments separated by blank lines (paragraph groups).
  const segments: string[][] = [];
  let cur: string[] = [];
  for (const raw of lines) {
    const t = raw.trim();
    if (!t) { if (cur.length) { segments.push(cur); cur = []; } }
    else cur.push(t);
  }
  if (cur.length) segments.push(cur);

  const out: string[] = [];
  const push = (s: string) => out.push(s);

  for (const seg of segments) {
    // 1. Attach em-dash continuations to the previous label line.
    const rows: { text: string; dash?: string }[] = [];
    for (const line of seg) {
      const dash = /^[—–]\s+(.+)$/.exec(line);
      if (dash && rows.length && isLabelLike(rows[rows.length - 1].text) && !rows[rows.length - 1].dash) {
        rows[rows.length - 1].dash = dash[1];
      } else {
        rows.push({ text: line });
      }
    }

    // 2. Classify and emit each row.
    let i = 0;
    while (i < rows.length) {
      const row = rows[i];
      const t = row.text;

      // Em-dash label item: "Notes" + "— Save setup guides…"
      if (row.dash) {
        push(`- **${t}** — ${row.dash}`);
        i++;
        continue;
      }

      // Bare URL
      if (isUrl(t)) {
        push(`[${t}](${t})`);
        i++;
        continue;
      }

      // Explicit bullet / ordered list
      const bullet = /^[-*•]\s+(.+)$/.exec(t);
      if (bullet) { push(`- ${bullet[1]}`); i++; continue; }
      const ordered = /^\d+[.)]\s+(.+)$/.exec(t);
      if (ordered) { push(`1. ${ordered[1]}`); i++; continue; }

      // Colon heading: short line ending in ':' ("Decisions:" -> "## Decisions")
      const colonH = /^(.{2,70}):$/.exec(t);
      if (colonH && !/^https?:/.test(t) && t.trim().length <= 40) {
        push(`## ${colonH[1].trim()}`);
        i++;
        continue;
      }

      // Known section label ("Best for", "What's included", …) — always a heading
      if (KNOWN_HEADINGS.has(normalizeApostrophes(t).toLowerCase())) {
        push(`## ${t}`);
        i++;
        continue;
      }

      // Title-case heading: short line NOT followed by another short label line.
      const next = rows[i + 1];
      const nextIsLabel = !!(next && !next.dash && isLabelLike(next.text));
      if (isTitleHeading(normalizeApostrophes(t)) && !nextIsLabel) {
        push(`## ${t}`);
        i++;
        continue;
      }

      // Implicit list: consecutive short, non-punctuated lines (2+).
      // Stop at rows carrying an em-dash continuation so their content is never dropped.
      if (isLabelLike(t)) {
        const run = [t];
        let j = i + 1;
        while (j < rows.length && isLabelLike(rows[j].text) && !rows[j].dash) { run.push(rows[j].text); j++; }
        if (run.length >= 2) {
          for (const item of run) push(`- ${item}`);
          i = j;
          continue;
        }
      }

      // Paragraph
      push(t);
      i++;
    }
  }

  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

/** Tiny renderer for the preview pane. */
function inline(value: string): string {
  let out = escapeHtml(value);
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  out = out.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return out;
}

function renderPreview(markdown: string): string {
  const lines = markdown.replace(/\r\n?/g, '\n').split('\n');
  const out: string[] = [];
  let inCode = false;
  let code: string[] = [];
  let list: 'ul' | 'ol' | null = null;
  let paragraph: string[] = [];
  const closeList = () => { if (list) { out.push(`</${list}>`); list = null; } };
  const closeParagraph = () => { if (paragraph.length) { out.push(`<p>${paragraph.map(inline).join(' ')}</p>`); paragraph = []; } };
  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      closeParagraph(); closeList();
      if (inCode) { out.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`); code = []; }
      inCode = !inCode; continue;
    }
    if (inCode) { code.push(line); continue; }
    const heading = /^(#{1,6})\s+(.+)$/.exec(line);
    const bullet = /^\s*[-*+]\s+(.+)$/.exec(line);
    const ordered = /^\s*\d+[.)]\s+(.+)$/.exec(line);
    if (heading) { closeParagraph(); closeList(); out.push(`<h${heading[1].length}>${inline(heading[2])}</h${heading[1].length}>`); }
    else if (bullet || ordered) { closeParagraph(); const next = bullet ? 'ul' : 'ol'; if (list !== next) { closeList(); list = next; out.push(`<${list}>`); } out.push(`<li>${inline((bullet ?? ordered)![1])}</li>`); }
    else if (!line.trim()) { closeParagraph(); closeList(); }
    else paragraph.push(line);
  }
  closeParagraph(); closeList(); if (inCode) out.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`);
  return out.join('\n');
}

export function TextToMarkdown() {
  const [text, setText] = useState(SAMPLE);
  const [copied, setCopied] = useState(false);
  const markdown = convertToMarkdown(text);
  const copy = async () => { await copyText(markdown); setCopied(true); setTimeout(() => setCopied(false), 1200); };
  return (
    <div className="tool-ui">
      <div className="field">
        <label htmlFor="text-input">Plain text</label>
        <textarea id="text-input" className="input" value={text} onChange={e => setText(e.target.value)} style={{ minHeight: 220 }} placeholder="Paste or type plain text…" />
      </div>
      <div className="row">
        <button className="btn" onClick={copy}>{copied ? <Check size={16} /> : <Copy size={16} />} Copy Markdown</button>
      </div>
      <div className="field">
        <label><FileText size={15} style={{ verticalAlign: 'middle', marginRight: 5 }} />Markdown output</label>
        <textarea className="input" readOnly value={markdown} style={{ minHeight: 220, fontFamily: 'ui-monospace, Consolas, monospace' }} />
      </div>
      <div className="field">
        <label>Preview</label>
        <div className="article-section" dangerouslySetInnerHTML={{ __html: renderPreview(markdown) }} />
      </div>
      <div className="alert info">
        Heuristic conversion: lines ending in “:” and short title-case lines become headings, label lines
        followed by an em-dash become bold bullets, consecutive short lines become lists, bare URLs become
        links. Tweak the output after conversion — it is a starting point, not a lossless transformation.
      </div>
    </div>
  );
}
