import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Terminal } from 'lucide-react';
import iconUrl from '../docs/icon.png';
import './agentConnections.css';

const agents = {
  chatgpt: { name: 'ChatGPT', logo: '/images/agents/chatgpt.svg', prompt: 'What did we decide about the launch? Pull out the next steps.', tasks: ['Find the launch discussion', 'Read the transcript and notes', 'Turn decisions into next steps'], link: 'https://chatgpt.com/plugins/plugins_6abe2bb24af081919ea718e221cfdafa', cta: 'Get the Muesli plugin', detail: 'Use the Muesli plugin in a session with access to your Mac’s local tools.' },
  claude: { name: 'Claude Code', logo: '/images/agents/claude.svg', prompt: 'Read the product review. Make an implementation plan for this repo.', tasks: ['Find the product review', 'Read the meeting alongside the code', 'Draft an implementation plan'], link: '/docs/agents/', cta: 'Set up Claude Code', detail: 'Give Claude Code access to muesli-cli on the Mac where your meetings live.' },
};

export default function AgentConnections() {
  const [selected, setSelected] = useState('chatgpt');
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const agent = agents[selected];
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.1 });
    if (ref.current) {
      observer.observe(ref.current);
      if (window.location.hash === '#agents') ref.current.scrollIntoView({ block: 'start' });
    }
    return () => observer.disconnect();
  }, []);
  return <section ref={ref} id="agents" className={`agent-bridge${visible ? ' agent-bridge-visible' : ''}`} aria-labelledby="agent-bridge-title">
    <header className="agent-bridge-heading">
      <h2 id="agent-bridge-title">Your meetings.<br />Your favorite AI.</h2>
      <p>Give ChatGPT, Claude Code, and your coding agents the context from your conversations. Find a decision. Pull out the tasks. Put the next idea to work.</p>
    </header>
    <div className={`agent-connection-map agent-selected-${selected}`}>
      <svg className="agent-wires" viewBox="0 0 1000 240" preserveAspectRatio="none" aria-hidden="true">
        <path className="agent-wire" d="M170 118 C280 118 300 118 450 118" />
        <path className="agent-wire" d="M550 118 C700 118 720 118 830 118" />
        <path className="agent-wire-echo" d="M170 118 C275 118 315 53 450 118" />
        <path className="agent-wire-echo" d="M550 118 C680 185 725 118 830 118" />
        <circle className="agent-packet agent-packet-left" r="4" />
        <circle className="agent-packet agent-packet-right" r="4" />
        <circle className="agent-packet agent-packet-left agent-packet-return" r="3" />
        <circle className="agent-packet agent-packet-right agent-packet-return" r="3" />
      </svg>
      <button type="button" className="agent-node agent-node-chatgpt" aria-pressed={selected === 'chatgpt'} aria-controls="agent-workflow-preview" onClick={() => setSelected('chatgpt')}>
        <span className="agent-logo-disc"><img src={agents.chatgpt.logo} width="48" height="48" alt="" /></span>
        <span className="agent-node-name">ChatGPT</span><span className="agent-node-caption">and Codex</span>
      </button>
      <div className="agent-node agent-node-muesli">
        <span className="agent-muesli-orbit" aria-hidden="true" />
        <span className="agent-muesli-icon"><img src={iconUrl} width="100" height="100" alt="Muesli" /></span>
        <span className="agent-muesli-name">muesli</span><span className="agent-node-caption">Your conversations, on your Mac</span>
      </div>
      <button type="button" className="agent-node agent-node-claude" aria-pressed={selected === 'claude'} aria-controls="agent-workflow-preview" onClick={() => setSelected('claude')}>
        <span className="agent-logo-disc"><img src={agents.claude.logo} width="58" height="58" alt="" /></span>
        <span className="agent-node-name">Claude</span><span className="agent-node-caption">with Claude Code</span>
      </button>
      <span className="agent-wire-label agent-wire-label-left">Meeting context</span>
      <span className="agent-wire-label agent-wire-label-right">Ideas into action</span>
    </div>
    <div className="agent-workflow-preview" id="agent-workflow-preview">
      <div className="agent-workflow-copy">
        <h3>Pick up the conversation<br />with {agent.name}.</h3>
        <p>{agent.detail}</p>
        <a className="agent-setup-link" href={agent.link}>{agent.cta} <ArrowUpRight size={17} /></a>
      </div>
      <div className={`agent-prompt-preview agent-prompt-${selected}`} key={selected}>
        <div className="agent-prompt-meta"><span>Example workflow</span><span><img src={agent.logo} width="16" height="16" alt="" />{agent.name}</span></div>
        <p className="agent-example-prompt">“{agent.prompt}”</p>
        <ol>{agent.tasks.map((task, i) => <li key={task} style={{ '--step': i }}><Check size={15} aria-hidden="true" />{task}</li>)}</ol>
      </div>
    </div>
    <div className="agent-bridge-bottom">
      <a href="/docs/">Explore the agent CLI <ArrowRight size={16} /></a>
      <details className="agent-cli-example"><summary><Terminal size={15} /> See the local workflow <ChevronDown size={14} /></summary><pre><code>{'muesli-cli spec\nmuesli-cli meetings list --limit 5\nmuesli-cli meetings get 42'}</code></pre><p>Use an ID returned by list. Agents need local tool access. Shared transcripts become part of your agent’s context.</p></details>
    </div>
  </section>;
}
