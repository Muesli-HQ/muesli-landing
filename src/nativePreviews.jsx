import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp, AtSign, ChevronDown, Maximize2, Paperclip, Plus, SlidersHorizontal, X } from 'lucide-react';
import { FeatureLoop, loopDescriptions } from './FeatureLoop.jsx';
import './nativePreviews.css';

// Layout values and custom icon paths follow the macOS 0.8.6 views.
// The illustrated documents are sample data; no user content is embedded.
export function NativeIcon({ name, size = 14, className = '' }) {
  if (name === 'time-turner') return <svg className={`np-icon ${className}`} width={size} height={size} viewBox="0 0 20 20" aria-hidden="true"><g transform="translate(0 20) scale(1 -1)" fill="none" stroke="currentColor"><circle cx="10" cy="10" r="8" strokeWidth="1.15"/><ellipse cx="10" cy="10" rx="9.2" ry="4" transform="rotate(38 10 10)" strokeWidth=".9"/><path d="M7 15H13V13C13 12 11 11 10 10C11 9 13 8 13 7V5H7V7C7 8 9 9 10 10C9 11 7 12 7 13Z" strokeWidth="1.25" strokeLinejoin="round"/></g></svg>;
  if (name === 'vidshot') return <svg className={`np-icon ${className}`} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true"><path d="M36 11H11V36 M64 11H89V36 M36 89H11V64 M64 89H89V64" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/><path d="M42 31L69 50L42 69Z" fill="currentColor"/></svg>;
  return <span className={`np-icon np-symbol ${className}`} aria-hidden="true" style={{ width:size, height:size, maskImage:`url('/native-preview/native/${name}.png')`, WebkitMaskImage:`url('/native-preview/native/${name}.png')` }}/>;
}
function BrandMark() { return <span className="np-brand-mark"/>; }
const navigation = [['Timeline','clock'],['Dictations','waveform'],['Meetings','person.wave.2'],['Time Turner','time-turner'],['Chat','bubble.left.and.bubble.right'],['Dictionary','character.book.closed'],['Vidshots','vidshot']];
function Sidebar({ active }) {
  return <aside className="np-sidebar">
    <div className="np-brand"><div className="np-brand-identity"><div><BrandMark/><span>muesli</span></div><small>Hi, Alex</small></div><span className="np-sidebar-toggle"><NativeIcon name="sidebar.left" size={16}/></span></div>
    <div className="np-search"><NativeIcon name="magnifyingglass"/><span>Search…</span><small>⌘F</small></div>
    <div className="np-nav">{navigation.map(([label,icon])=><React.Fragment key={label}><div className={`np-nav-row ${label===active?'np-selected':''}`}><span className="np-icon-column"><NativeIcon name={icon} size={icon==='time-turner'?20:14}/></span><span>{label}</span>{label==='Meetings'&&<span className="np-folder-controls"><NativeIcon name="chevron.down" size={11}/><NativeIcon name="folder.badge.plus"/></span>}</div>{label==='Meetings'&&<div className="np-nav-child"><NativeIcon name="tray.2"/><span>All Meetings</span><small>12</small></div>}</React.Fragment>)}</div>
    <div className="np-nav np-bottom">{[['Models','cpu'],['Shortcuts','command'],['Settings','gearshape'],['About','info.circle']].map(([label,icon])=><div className="np-nav-row" key={label}><span className="np-icon-column"><NativeIcon name={icon}/></span><span>{label}</span></div>)}<div className="np-appearance"><NativeIcon name="sun.max"/><span className="np-appearance-active"><NativeIcon name="desktopcomputer"/></span><NativeIcon name="moon"/></div></div>
  </aside>;
}
function TrafficLights() { return <span className="np-traffic"><i/><i/><i/></span>; }
function Shell({ active, children, className='' }) {
  return <div className={`np-window ${className}`}><div className="np-titlebar"><TrafficLights/></div><div className="np-window-body"><Sidebar active={active}/><div className="np-main">{children}</div></div></div>;
}
function Control({ icon, children, className='' }) { return <span className={`np-control ${className}`}>{icon&&<NativeIcon name={icon}/ >}{children}</span>; }
function Segment({ labels }) { return <div className="np-segment">{labels.map((label,i)=><span key={label} className={i===0?'np-segment-selected':''}>{label}</span>)}</div>; }
function NotesDocument({ ghost=false, dictation=false, compact=false }) {
  return <div className={`np-notes ${compact?'np-notes-compact':''}`}>
    <div className="np-notes-toolbar"><TrafficLights/><NativeIcon name="sidebar.left" size={18}/><span className="np-notes-spacer"/><NativeIcon name="list.bullet" size={18}/><NativeIcon name="tablecells" size={18}/><NativeIcon name="checklist" size={18}/><NativeIcon name="textformat" size={18}/><NativeIcon name="square.and.pencil" size={18}/><NativeIcon name="square.and.arrow.up" size={18}/></div>
    <div className="np-notes-body"><div className="np-notes-folders"><b>iCloud</b><span className="np-notes-folder"><NativeIcon name="folder"/> Notes <small>8</small></span><span><NativeIcon name="folder"/> Projects <small>3</small></span></div><div className="np-notes-list"><div className="np-note-current"><b>Product review</b><small>11:18 AM &nbsp; Launch plan and next steps</small></div><div><b>Ideas for next week</b><small>Yesterday &nbsp; A few things to try</small></div><div><b>Reading list</b><small>Monday &nbsp; Saved for later</small></div></div><div className="np-notes-paper"><small>9 November 2026 at 11:18 AM</small><h3>Product review</h3>{ghost?<p>Thanks for the thoughtful conversation today. I’ll share<span className="np-caret"/><span className="np-ghost"> the updated plan before Friday.</span></p>:dictation?<p className="np-dictated">Share the first draft with the team and collect feedback before Friday.<span className="np-caret"/></p>:<><p>Launch plan and next steps</p><h4>Keep the experience simple.</h4><p>Start with a small release. Gather feedback from the first group, then share the rollout plan.</p><h4>Before Friday</h4><ul><li>Share the updated plan</li><li>Review the first round of feedback</li><li>Confirm the launch date</li></ul></>}</div></div>
  </div>;
}
function ChatComposer({ compact=false }) { return <div className={`np-composer ${compact?'np-composer-compact':''}`}><div className="np-composer-box"><p>What’s on your mind? Type / for skills.</p>{!compact&&<div className="np-composer-footer"><AtSign size={16}/><SlidersHorizontal size={16}/><span>All saved meetings</span><span className="np-model">Gemma 4 <ChevronDown size={10}/></span><Plus size={16}/><Paperclip size={16}/><span className="np-send"><ArrowUp size={16}/></span></div>}</div>{!compact&&<small>↵ Send · ⇧↵ New line</small>}</div>; }
function MeetingScreen() {
  return <Shell active="Meetings" className="np-meeting"><div className="np-meeting-head"><Control icon="chevron.left">Back to Meetings</Control><div className="np-meeting-identity"><div><h2>Product review</h2><div className="np-meeting-meta"><NativeIcon name="calendar" size={12}/> Nov 9, 2026 · 11:00 AM <span>·</span><NativeIcon name="clock" size={12}/> 24 min <span>·</span><NativeIcon name="doc.text" size={12}/> 1,280 words</div></div><span className="np-resume"><span className="np-record-dot"/>Resume<ChevronDown size={14}/></span><Control icon="square.and.arrow.up">Export <ChevronDown size={10}/></Control><Control icon="ellipsis"/></div><div className="np-meeting-context"><Control icon="folder">Unfiled <NativeIcon name="chevron.down" size={10}/></Control><i/><Control icon="person.2">Add people</Control><Segment labels={['Notes','Transcript']}/></div></div><div className="np-document-toolbar"><Control icon="doc.on.clipboard">Copy</Control></div><div className="np-meeting-document"><h3>Meeting Summary</h3><p>The team agreed to start with a small release and gather feedback before the full launch.</p><h3>Key decisions</h3><ul><li>Share the first draft with the team this week.</li><li>Keep the initial release focused on the core workflow.</li><li>Review the feedback together before expanding access.</li></ul><h3>Action items</h3><ul><li>Share the updated plan by Friday.</li><li>Confirm the launch date in the next product review.</li></ul></div><ChatComposer compact/></Shell>;
}
function WritingScreen({ dictation=false }) {
  return <div className="np-writing"><NotesDocument ghost={!dictation} dictation={dictation}/>{dictation?<div className="np-recording-pill">{[.6,.85,1,.85,.6].map((weight,i)=><i key={i} style={{'--amplitude':weight,'--delay':`${i*.07}s`}}/>)}</div>:<div className="np-key-caption"><kbd>tab</kbd> Accept suggestion <kbd>⌥ →</kbd> Accept a word</div>}</div>;
}
const screens = {meeting:MeetingScreen,dictation:()=> <WritingScreen dictation/>};
const labels = {'time-turner':'Time Turner history',vidshots:'Vidshot recording','chat-and-agents':'Chat',meeting:'Meeting notes',cotypist:'Cotypist inline suggestion',dictation:'Dictation'};
function ScaledScreen({type}) {
  const ref=useRef(null);
  const [scale,setScale]=useState(.5);
  useEffect(()=>{const observer=new ResizeObserver(([entry])=>setScale(entry.contentRect.width/1100));observer.observe(ref.current);return ()=>observer.disconnect();},[]);
  const Screen=screens[type];
  return <div className="np-viewport" ref={ref} role="img" aria-label={`${labels[type]} in muesli, illustrated with sample content`}><div className="np-canvas" style={{transform:`scale(${scale})`}} aria-hidden="true"><Screen/></div></div>;
}
function StaticPreview({type}) {
  const dialog = useRef(null);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => { if (expanded) dialog.current?.showModal(); }, [expanded]);

  return <>
    <ScaledScreen type={type}/>
    <button className="np-expand" onClick={() => setExpanded(true)} aria-label={`Enlarge ${labels[type]} preview`}>
      <Maximize2 size={13}/> View closer
    </button>
    {expanded && <dialog className="np-dialog" ref={dialog} aria-label={labels[type]} onClose={() => setExpanded(false)}
      onClick={e => { if (e.target === e.currentTarget) dialog.current.close(); }}>
      <div className="np-dialog-toolbar"><span>{labels[type]}</span>
        <button onClick={() => dialog.current.close()} aria-label="Close preview" autoFocus><X size={19}/></button>
      </div>
      <ScaledScreen type={type}/>
    </dialog>}
  </>;
}

export function NativePreview({type}) {
  return <div className="np-preview">
    {loopDescriptions[type] ? <FeatureLoop key={type} type={type}/> : <StaticPreview type={type}/>}
  </div>;
}
