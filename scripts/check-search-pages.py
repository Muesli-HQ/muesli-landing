"""Validate rendered search-page content and shared product identity after npm run build."""
import json
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
ROUTES = ['superwhisper-alternative', 'granola-vs-muesli', 'on-device-dictation']


class Page(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.links, self.ids, self.canonicals, self.text = [], set(), [], []
        self.h1s = 0
        self.in_script = False
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        if tag == 'a' and 'href' in attrs:
            self.links.append(attrs['href'])
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonicals.append(attrs['href'])
        if tag == 'h1':
            self.h1s += 1
        if tag == 'script':
            self.in_script = True

    def handle_endtag(self, tag):
        if tag == 'script':
            self.in_script = False

    def handle_data(self, data):
        if not self.in_script:
            self.text.append(data)


def schemas(html):
    for data in re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.S):
        value = json.loads(data)
        yield from value.get('@graph', [value])


identities = set()
count = 0
for file in DIST.rglob('index.html'):
    html = file.read_text()
    for node in schemas(html):
        if node.get('@id') == 'https://muesli.works/#software':
            identities.add(json.dumps(node, sort_keys=True))
            assert node['url'] == 'https://muesli.works/', file
            count += 1
assert len(identities) == 1, 'Muesli software identity varies across pages'

for route in ROUTES:
    html = (DIST / route / 'index.html').read_text()
    page = Page(html)
    visible = ' '.join(page.text)
    assert page.h1s == 1, route
    assert page.canonicals == [f'https://muesli.works/{route}'], route
    assert '2026-10-29' in html and 'v0.8.5/README.md' in html, route
    assert 'macOS 14.2' in visible and 'Apple Silicon' in visible, route
    assert '/download/' in page.links, route
    assert 'hosted' in visible.lower(), route
    assert not re.search(r'~0\.13s|~1-2s|~2-3s|added sugar|Stop renting', visible), route
    assert '—' not in visible, f'{route}: em dash in visible content'
    for node in schemas(html):
        if node.get('@type') == 'FAQPage':
            for item in node['mainEntity']:
                assert item['name'] in visible, route
                assert item['acceptedAnswer']['text'] in visible, route
    for link in page.links:
        url = urlsplit(link)
        if url.scheme or url.netloc:
            continue
        path = url.path.strip('/')
        target = (DIST / path) if url.path.startswith('/') else (DIST / route / path)
        if target.is_dir():
            target = target / 'index.html'
        assert target.exists(), (route, link)
        if url.fragment and target.suffix == '.html':
            assert unquote(url.fragment) in Page(target.read_text()).ids, (route, link)
    print(f'PASS {route}: initial HTML, canonical, sources, requirements, FAQ, internal links, download CTA')
print(f'PASS one consistent Muesli software entity across {count} rendered pages')
