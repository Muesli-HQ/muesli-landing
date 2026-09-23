import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, Copy, Sun, Moon, Monitor, BookOpen, Terminal, Bot, Github } from 'lucide-react';
import { docsPages, docsRoutes, docsMarkdown } from './docsContent.js';
import './docs.css';
import iconUrl from '../docs/icon.png';

function CodeBlock({ children }) {
  const [status, setStatus] = useState('Copy');
  async function copy() {
    try { await navigator.clipboard.writeText(children); setStatus('Copied'); }
    catch { setStatus('Select text to copy'); }
  }
  return <div className="docs-code"><button type="button" onClick={copy} aria-label="Copy example">{status === 'Copied' ? <Check size={14} /> : <Copy size={14} />}<span aria-live="polite">{status}</span></button><pre><code>{children}</code></pre></div>;
}

export function AgentFeature() {
  return <section className="agent-feature" aria-labelledby="agent-feature-title">
    <div><h2 id="agent-feature-title">Your meeting notes are now accessible across Claude, ChatGPT, and more.</h2><p>Let your coding agent read the meeting. Muesli’s local CLI gives Codex, Claude Code, and other shell-capable agents access to transcripts and notes, so you can turn a discussion into a plan for your codebase.</p><a href="/docs/">Explore the agent CLI <ArrowRight size={18} /></a></div>
    <div className="agent-terminal"><div>muesli-cli</div><pre><code>{'# Find the conversation\nmuesli-cli meetings list --limit 5\n\n# Read a meeting using its returned ID\nmuesli-cli meetings get 42'}</code></pre><p>Structured JSON. Local meeting data. Your agent’s model.</p></div>
  </section>;
}

const docLabels = { '/docs': 'Quickstart', '/docs/agents': 'Coding agents', '/docs/cli': 'CLI reference' };
const docIcons = { '/docs': BookOpen, '/docs/agents': Bot, '/docs/cli': Terminal };

export default function DocsPage({ route }) {
  const page = docsPages[route];
  const [theme, setTheme] = useState('system');
  const [active, setActive] = useState(page.sections[0].id);
  const [copyStatus, setCopyStatus] = useState('Copy page');
  useEffect(() => {
    try {
      const saved = localStorage.getItem('muesli-docs-theme');
      if (['light', 'dark', 'system'].includes(saved)) setTheme(saved);
    } catch { /* The system theme works when storage is unavailable. */ }
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting);
      if (visible.length) setActive(visible[0].target.id);
    }, { rootMargin: '-90px 0px -65% 0px', threshold: 0 });
    document.querySelectorAll('.docs-article section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [route]);
  function chooseTheme(value) {
    setTheme(value);
    try { localStorage.setItem('muesli-docs-theme', value); } catch { /* Keep the choice for this visit. */ }
  }
  async function copyPage() {
    try { await navigator.clipboard.writeText(docsMarkdown([route])); setCopyStatus('Copied'); }
    catch { setCopyStatus('Use plain text link'); }
  }
  const navigation = <nav aria-label="Documentation">{docsRoutes.map(path => {
    const Icon = docIcons[path];
    return <a key={path} href={`${path}/`} aria-current={route === path ? 'page' : undefined}><Icon size={16} />{docLabels[path]}</a>;
  })}</nav>;
  return <main className="docs-page" data-theme={theme}>
    <script type="application/ld+json">{JSON.stringify({
      '@context': 'https://schema.org', '@type': 'TechArticle',
      headline: page.title, description: page.description,
      url: `https://muesli.works${route}/`, inLanguage: 'en',
      publisher: { '@type': 'Organization', name: 'Muesli', url: 'https://muesli.works/' },
    }).replace(/</g, '\\u003c')}</script>
    <a className="docs-skip" href="#docs-content">Skip to content</a>
    <header className="docs-topbar"><div className="docs-topbar-inner">
      <a className="docs-brand" href="/" aria-label="Muesli home"><img src={iconUrl} alt="" />muesli<span>docs</span></a>
      <div className="docs-top-actions"><a className="docs-github" href="https://github.com/Muesli-HQ/muesli"><Github size={17} /><span>GitHub</span></a><a className="docs-download" href="/download/">Download</a>
      <div className="docs-themes" role="group" aria-label="Color theme">{[['light', Sun], ['dark', Moon], ['system', Monitor]].map(([value, Icon]) => <button key={value} type="button" aria-label={`${value[0].toUpperCase() + value.slice(1)} theme`} aria-pressed={theme === value} title={`${value} theme`} onClick={() => chooseTheme(value)}><Icon size={16} /></button>)}</div></div>
    </div></header>
    <div className="docs-layout">
      <aside className="docs-sidebar"><p className="docs-nav-label">Documentation</p>{navigation}<div className="docs-sidebar-resources"><a href="/docs.txt">Plain-text docs ↗</a><a href="https://github.com/Muesli-HQ/muesli/tree/main/native/MuesliNative/Sources/MuesliCLI">View source ↗</a><a href="/help">App support ↗</a></div></aside>
      <details className="docs-mobile-nav"><summary>Documentation <span>{docLabels[route]}</span></summary>{navigation}</details>
      <article className="docs-article" id="docs-content"><header><div className="docs-title-row"><h1>{docLabels[route]}</h1><button className="docs-copy-page" type="button" onClick={copyPage}><Copy size={14} /><span aria-live="polite">{copyStatus}</span></button></div><p className="docs-intro">{page.intro}</p></header>
        <details className="docs-mobile-toc"><summary>On this page</summary><nav aria-label="Page sections">{page.sections.map(section => <a href={`#${section.id}`} key={section.id}>{section.title}</a>)}</nav></details>
        {page.sections.map(section => <section id={section.id} key={section.id}><h2><a href={`#${section.id}`}>{section.title}</a></h2>{section.text?.map(text => <p key={text}>{text}</p>)}{section.code && <CodeBlock>{section.code}</CodeBlock>}{section.after && <p>{section.after}</p>}{section.link && <a className="docs-text-link" href={section.link[0]}>{section.link[1]} <ArrowRight size={16} /></a>}</section>)}
        <div className="docs-next">{docsRoutes.filter(path => path !== route).map(path => <a href={`${path}/`} key={path}>{docLabels[path]} <ArrowRight size={16} /></a>)}</div>
        <footer className="docs-footer"><span>© 2026 Muesli</span><div><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/">Back to Muesli ↗</a></div></footer>
      </article>
      <aside className="docs-toc"><p>On this page</p><nav aria-label="On this page">{page.sections.map(section => <a href={`#${section.id}`} key={section.id} aria-current={active === section.id ? 'location' : undefined}>{section.title}</a>)}</nav></aside>
    </div>
  </main>;
}
