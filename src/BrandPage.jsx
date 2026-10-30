import React from 'react';
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react';
import { brandAssets, brandManifest } from './brandAssets.js';
import './brand.css';

function Asset({ asset }) {
  return <figure className="brand-asset">
    <div className={`brand-asset-stage brand-tone-${asset.tone}${asset.group === 'previews' ? ' brand-preview-stage' : ''}`}>
      <img src={asset.path} alt={asset.alt} width={asset.width} height={asset.height} loading="lazy" />
    </div>
    <figcaption>
      <div className="brand-asset-title"><h3>{asset.name}</h3><a href={asset.path} download aria-label={`Download ${asset.name}`}><Download size={17} /><span>{asset.format}</span></a></div>
      <p>{asset.description}</p>
      <small>{asset.width} × {asset.height} · {Math.ceil(asset.bytes / 1024)} KB</small>
    </figcaption>
  </figure>;
}

export function BrandPage({ nav, footer }) {
  const sections = [
    ['icons', 'The app icon', 'Our waveform is the M in Muesli. Start with the original blue icon, or use a monochrome version when the design calls for it.'],
    ['lockups', 'Waveform meets wordmark', 'Use the combined logo when introducing Muesli. The spacing and proportions are built into each file.'],
    ['wordmarks', 'Just muesli', 'Our name, in lowercase. These wordmarks use Nunito Sans with the letters converted to paths.'],
    ['previews', 'Ready to share', 'Open Graph images and article banners from the Muesli repository. Download the original files for links, write-ups, and launch posts.'],
  ];
  const schema = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: brandManifest.name, url: brandManifest.url,
    description: brandManifest.description, mainEntity: { '@type': 'ItemList', itemListElement: brandAssets.map((a, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'ImageObject', name: a.name, description: a.description, contentUrl: a.url, width: a.width, height: a.height, encodingFormat: a.format === 'SVG' ? 'image/svg+xml' : a.format === 'JPG' ? 'image/jpeg' : `image/${a.format.toLowerCase()}` } })) } };
  return <div className="brand-page">
    {nav}
    <main className="brand-library">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <header className="brand-intro">
        <h1>Make it muesli.</h1>
        <div><p>Our logos, wordmarks, and images. Ready for your next article, app listing, or something you’re building with us.</p>
          <a className="brand-kit-download" href="/brand/muesli-brand-kit.zip" download><Download size={18} /> Download brand kit</a>
        </div>
      </header>
      <div className="brand-cover"><img src="/brand/muesli-waveform-lockup-navy.svg" alt="Muesli deep blue waveform and lowercase wordmark" width="665" height="161" /><span>Right to Free Speech to Text</span></div>
      <nav className="brand-jump-links" aria-label="Brand assets"><a href="#icons">App icon <ArrowDown size={14} /></a><a href="#lockups">Logo lockups <ArrowDown size={14} /></a><a href="#wordmarks">Wordmarks <ArrowDown size={14} /></a><a href="#previews">Social images <ArrowDown size={14} /></a></nav>
      {sections.map(([id, title, description], i) => <section className="brand-section" id={id} key={id}>
        <div className="brand-section-heading"><span>0{i + 1}</span><div><h2>{title}</h2><p>{description}</p></div></div>
        <div className={`brand-asset-grid${id === 'previews' ? ' brand-preview-grid' : ''}`}>{brandAssets.filter(a => a.group === id).map(asset => <Asset key={asset.id} asset={asset} />)}</div>
      </section>)}
      <section className="brand-notes" id="usage">
        <div><h2>Using the assets</h2><p>Keep the proportions. Leave space around the logo. Pick a version that reads clearly against its background.</p><p>Write <strong>Muesli</strong> in running text. Keep the supplied wordmark lowercase. Partner logos in article artwork belong to their respective owners.</p></div>
        <div><h2>Asset index</h2><p>Every preview links to a downloadable file. The asset index includes permanent URLs, descriptions, formats, and dimensions.</p><a href="/brand/assets.json">Read the JSON asset index <ArrowUpRight size={17} /></a><a href="/brand/README.txt">Read the plain-text guide <ArrowUpRight size={17} /></a></div>
      </section>
    </main>
    {footer}
  </div>;
}
