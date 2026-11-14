import React, { useEffect, useRef, useState } from 'react';

export const loopDescriptions = {
  'time-turner': 'Rewind from the Atlas launch checklist to the pricing page in Time Turner history.',
  vidshots: 'Select the Atlas Analytics window, record a Vidshot, and see when it is ready to copy.',
  cotypist: 'Accept one suggested word with Option and Right Arrow, then accept the rest with Tab.',
  'chat-and-agents': 'Ask about the Studio trial and see the answer with a passage from the pricing review.',
};

export function FeatureLoop({ type }) {
  const video = useRef(null);
  const [showVideo, setShowVideo] = useState(false);
  const path = '/feature-loops/' + type;

  useEffect(() => {
    const element = video.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let inView = false;
    const update = () => {
      if (!inView || document.hidden || motion.matches) {
        element.pause();
        if (motion.matches) setShowVideo(false);
        return;
      }
      if (!element.hasAttribute('src')) element.src = path + '.mp4';
      element.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    document.addEventListener('visibilitychange', update);
    motion.addEventListener('change', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
      motion.removeEventListener('change', update);
      element.pause();
    };
  }, [path]);

  return <div className="np-viewport np-loop" role="img" aria-label={loopDescriptions[type]}>
    <img src={path + '.webp'} width="1120" height="790" loading="lazy" decoding="async" alt=""/>
    <video ref={video} muted playsInline loop preload="none" aria-hidden="true"
      style={{opacity: showVideo ? 1 : 0}}
      onPlaying={() => setShowVideo(true)} onError={() => setShowVideo(false)}/>
  </div>;
}
