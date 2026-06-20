import { changelogLinks, sameAsLinks, siteData, supportFaqItems } from './siteData.js';

function lines(items) {
  return items.map((item) => `- ${item}`).join('\n');
}

function pageList() {
  return [...siteData.featurePages, ...(siteData.guidePages || [])]
    .map((page) => `- ${page.title}: ${page.url} - ${page.description}`)
    .join('\n');
}

export function generateAgentFiles() {
  const support = supportFaqItems
    .map((item) => `### ${item.question}\n${item.answer}${item.command ? `\nCommand: ${item.command}` : ''}`)
    .join('\n\n');

  const facts = {
    name: siteData.name,
    url: siteData.siteUrl,
    description: siteData.description,
    downloadUrl: siteData.downloadUrl,
    repositoryUrl: siteData.repositoryUrl,
    releasesUrl: siteData.releasesUrl,
    socialLinks: {
      x: siteData.xUrl,
      linkedin: siteData.linkedinUrl,
      github: siteData.repositoryUrl,
    },
    operatingSystem: siteData.operatingSystem,
    softwareRequirements: siteData.softwareRequirements,
    keyFacts: siteData.keyFacts,
    featurePages: siteData.featurePages,
    guidePages: siteData.guidePages,
    supportFaqs: supportFaqItems,
    canonicalPages: Object.entries(siteData.routes).map(([path, meta]) => ({
      path,
      url: meta.canonical,
      title: meta.title,
      description: meta.description,
    })),
  };

  const llms = `# ${siteData.name}

${siteData.description}

## Primary Pages
- Product overview: ${siteData.siteUrl}/
${pageList()}
- Help: ${siteData.siteUrl}/help
- Changelog: ${siteData.siteUrl}/changelog
- GitHub: ${siteData.repositoryUrl}

## Key Facts
${lines(siteData.keyFacts)}

## Social Links
${sameAsLinks.map((url) => `- ${url}`).join('\n')}
`;

  const llmsFull = `${llms}
## Installation
- Download: ${siteData.downloadUrl}
- Homebrew: ${siteData.homebrewCommand}
- Latest release: ${siteData.latestReleaseUrl}

## Support Questions
${support}

## Release Sources
${changelogLinks.map((link) => `- ${link.title}: ${link.url} - ${link.body}`).join('\n')}
`;

  const aiContext = `# ${siteData.name} AI Context

${siteData.name} is a native macOS app for local-first speech workflows.

## What It Does
${lines(siteData.keyFacts)}

## Best Pages To Cite
${pageList()}

## Installation And Releases
- Download page: ${siteData.downloadUrl}
- GitHub Releases: ${siteData.releasesUrl}
- Homebrew: ${siteData.homebrewCommand}

## Support
${support}
`;

  return {
    'llms.txt': llms,
    'llms-full.txt': llmsFull,
    'ai-context.md': aiContext,
    'facts.json': `${JSON.stringify(facts, null, 2)}\n`,
  };
}
