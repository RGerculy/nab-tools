import { useState } from 'react';
import { Check, Copy, FileCode } from 'lucide-react';
import { copyText } from '../utils/clipboard';
import './tools.css';

const SAMPLE = '# Hello, world!\n\nWrite **bold** text, *emphasis*, [links](https://example.com), and lists.\n\n- One item\n- Two items';

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] ?? c));
}

function inline(value: string): string {
  let out = escapeHtml(value);
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  out = out.replace(/!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)/g, '<img alt="$1" src="$2">');
  out = out.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/__([^_]+)__/g, '<strong>$1</strong>');
  out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>').replace(/_([^_]+)_/g, '<em>$1</em>');
  return out;
}

function renderMarkdown(source: string): string {
  const lines = source.replace(/\r\n?/g, '\n').split('\n');
  const out: string[] = [];
  let inCode = false;
  let code: string[] = [];
  let list: 'ul' | 'ol' | null = null;
  let paragraph: string[] = [];
  const closeList = () => { if (list) { out.push(`</${list}>`); list = null; } };
  const closeParagraph = () => { if (paragraph.length) { out.push(`<p>${paragraph.map(inline).join('<br>')}</p>`); paragraph = []; } };
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

export function MarkdownToHtml() {
  const [markdown, setMarkdown] = useState(SAMPLE);
  const [copied, setCopied] = useState(false);
  const html = renderMarkdown(markdown);
  const copy = async () => { await copyText(html); setCopied(true); setTimeout(() => setCopied(false), 1200); };
  return <div className="tool-ui">
    <div className="field"><label htmlFor="markdown-input">Markdown</label><textarea id="markdown-input" className="input" value={markdown} onChange={e => setMarkdown(e.target.value)} style={{ minHeight: 220 }} /></div>
    <div className="row"><button className="btn" onClick={copy}>{copied ? <Check size={16} /> : <Copy size={16} />} Copy HTML</button></div>
    <div className="field"><label><FileCode size={15} style={{ verticalAlign: 'middle', marginRight: 5 }} />HTML output</label><textarea className="input" readOnly value={html} style={{ minHeight: 220, fontFamily: 'ui-monospace, Consolas, monospace' }} /></div>
    <div className="field"><label>Preview</label><div className="article-section" dangerouslySetInnerHTML={{ __html: html }} /></div>
  </div>;
}
