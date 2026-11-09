import React, { useEffect, useRef } from 'react';
import { ArrowRight, Keyboard, MessageCircle, Mic2, CalendarDays, Check, ChevronDown } from 'lucide-react';

export const featureLinks = [
  { title:'Dictation', description:'Speak anywhere on your Mac', href:'/on-device-dictation/', Icon:Mic2 },
  { title:'Meeting notes', description:'Record, revisit and export', href:'/meeting-notes/', Icon:CalendarDays },
  { title:'Time Turner', description:'Find your way back to your work', href:'/features/time-turner/', Icon:({size})=><NativeIcon name="time-turner" size={size}/> },
  { title:'Vidshots', description:'Show your agent what you mean', href:'/features/vidshots/', Icon:({size})=><NativeIcon name="vidshot" size={size}/> },
  { title:'Cotypist', description:'Get suggestions as you type', href:'/features/cotypist/', Icon:Keyboard },
  { title:'Chat & agents', description:'Put your context to work', href:'/features/chat-and-agents/', Icon:MessageCircle },
];

import { newFeatures } from './featureData.js';
import { NativePreview, NativeIcon } from './nativePreviews.jsx';

export function ProductMenu() {
 const menuRef = useRef(null);
 useEffect(() => {
  const closeOutside = (event) => {
   const menu = menuRef.current;
   if (menu?.open && !menu.contains(event.target)) menu.open = false;
  };
  const closeOnEscape = (event) => {
   const menu = menuRef.current;
   if (event.key === 'Escape' && menu?.open) {
    menu.open = false;
    menu.querySelector('summary')?.focus();
   }
  };
  document.addEventListener('click', closeOutside);
  document.addEventListener('focusin', closeOutside);
  document.addEventListener('keydown', closeOnEscape);
  return () => {
   document.removeEventListener('click', closeOutside);
   document.removeEventListener('focusin', closeOutside);
   document.removeEventListener('keydown', closeOnEscape);
  };
 }, []);
 return <details ref={menuRef} className="nav-feature-menu m-product-menu"><summary>Product <ChevronDown className="m-chevron" size={16} aria-hidden="true"/></summary><div className="nav-dropdown m-product-dropdown"><div className="m-product-grid">{featureLinks.map(({title,description,href,Icon})=><a href={href} key={title}><span className="m-product-icon"><Icon size={19}/></span><span><strong>{title}</strong><small>{description}</small></span><ArrowRight size={15} className="m-menu-arrow"/></a>)}</div><div className="m-product-extra"><a href="/local-first-ai/">Local-first AI <ArrowRight size={14}/></a><a href="/ios">muesli for iPhone <span>Coming soon</span></a></div></div></details>;
}

export function CoreFeatureVisual({type}) { const isMeeting=type==='meeting'; return <section className={`m-core-feature m-core-${type}`}><div><h2>{isMeeting ? 'Every conversation, ready when you need it.' : 'Your voice, right where you work.'}</h2><p>{isMeeting ? 'Record microphone and computer audio, review your transcript and keep the notes on your Mac. Import your Granola export to bring your history along.' : 'Hold your hotkey to dictate into your current app. In hands-free mode, supported Parakeet and Whisper models can show words as you speak.'}</p><a href={isMeeting ? '/blog/import-granola-notes/' : '/features/cotypist/'}>{isMeeting ? 'Bring your Granola history' : 'Meet Cotypist'} <ArrowRight size={17}/></a></div><div className="m-core-art">{isMeeting ? <NativePreview type="meeting"/> : <NativePreview type="dictation"/>}</div></section>; }
export function FeatureVisual({type}) { return <NativePreview type={type}/>; }

const homeFeatures = [
 {type:'time-turner',...newFeatures['/features/time-turner'],href:'/features/time-turner/'},
 {type:'vidshots',...newFeatures['/features/vidshots'],href:'/features/vidshots/'},
 {type:'cotypist',...newFeatures['/features/cotypist'],href:'/features/cotypist/'},
 {type:'chat-and-agents',...newFeatures['/features/chat-and-agents'],href:'/features/chat-and-agents/'},
];
export function HomepageFeatures() { return <section className="m-feature-story" id="features" aria-label="More ways to use muesli"><div className="m-feature-intro"><h2>Muesli is the home for all your context</h2><p>Your conversations, your ideas and the things you meant to come back to. Muesli keeps them close.</p></div><div className="m-feature-rows">{homeFeatures.map((f,i)=><article className={`m-feature-row m-feature-row-${f.type}`} key={f.type}><div className="m-feature-copy"><h3>{f.headline}</h3><p>{f.intro}</p><a href={f.href}>{f.cta} <ArrowRight size={18}/></a></div><div className="m-feature-stage"><FeatureVisual type={f.type}/></div></article>)}</div></section>; }
export function FeaturePage({feature, type, nav, footer}) { useEffect(() => { document.title = feature.meta; const canonical = document.querySelector('link[rel=canonical]'); if (canonical) canonical.href = `https://muesli.works/features/${type}`; }, [feature, type]); return <main className={`m-feature-page m-page-${type}`}>{nav}<section className="m-feature-hero"><div className="m-feature-hero-copy"><a href="/#features" className="m-back-link">← All features</a><h1>{feature.headline}</h1><p>{feature.intro}</p><a className="m-feature-download download-cta" href="/download/">Download muesli <ArrowRight size={18}/></a><span>Free and open source · Apple Silicon Mac</span></div><div className="m-feature-hero-art"><FeatureVisual type={type}/></div></section><div className="m-feature-facts">{feature.facts.map(f=><div key={f}><Check size={17}/><span>{f}</span></div>)}</div><section className="m-feature-details"><div className="m-feature-details-title"><h2>Made for the way you work.</h2></div><div>{feature.sections.map(([title,body],i)=><article key={title}><span>0{i+1}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div></section>{type === 'chat-and-agents' && <div className="m-feature-related"><a href="/docs/agents/">Set up a coding agent <ArrowRight size={16}/></a><a href="/docs/">Explore the muesli CLI <ArrowRight size={16}/></a></div>}{type === 'vidshots' && <div className="m-feature-related"><a href="/docs/">Explore the muesli CLI <ArrowRight size={16}/></a></div>}<section className="m-feature-next"><div><h2>There’s more to muesli.</h2><p>One app for the words, conversations and context behind your work.</p></div><div>{featureLinks.filter(f=>f.title!==feature.title).slice(0,4).map(({title,href,Icon})=><a href={href} key={title}><Icon size={18}/><span>{title}</span><ArrowRight size={16}/></a>)}</div></section>{footer}</main>; }
