# Docusaurus Setup Guide for Hubshift Documentation

This guide will help you set up a Docusaurus documentation website for Hubshift.

## Prerequisites

- Node.js 16+ and npm/yarn
- Git
- Basic knowledge of Markdown

## Step 1: Create Docusaurus Project

```bash
# Create a new Docusaurus site
npx create-docusaurus@latest hubshift-docs classic --typescript

# Navigate to the project
cd hubshift-docs
```

## Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

## Step 3: Copy Documentation Files

Copy all markdown files from the `docs/` directory to your Docusaurus `docs/` folder:

```bash
# From the hubshift-admin project root
cp -r docs/*.md hubshift-docs/docs/
cp -r docs/apis hubshift-docs/docs/
```

## Step 4: Configure Docusaurus

Edit `docusaurus.config.js`:

```javascript
const config = {
  title: 'Hubshift Documentation',
  tagline: 'NDIS Management Platform - API Documentation & Developer Guide',
  url: 'https://docs.hubshift.au',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'hubshift',
  projectName: 'hubshift-docs',
  
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/hubshift/hubshift-admin/tree/main/docs/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: false, // Disable blog if not needed
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Hubshift Docs',
      logo: {
        alt: 'Hubshift Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'overview',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/hubshift/hubshift-admin',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Overview',
              to: '/docs/overview',
            },
            {
              label: 'APIs',
              to: '/docs/apis/authentication',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/hubshift/hubshift-admin',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Hubshift. Built with Docusaurus.`,
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  },
};

module.exports = config;
```

## Step 5: Configure Sidebar

Create or update `sidebars.js`:

```javascript
/**
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  docs: [
    {
      type: 'doc',
      id: 'overview',
      label: 'Overview',
    },
    {
      type: 'doc',
      id: 'tech-stack',
      label: 'Tech Stack',
    },
    {
      type: 'doc',
      id: 'system-architecture',
      label: 'System Architecture',
    },
    {
      type: 'category',
      label: 'APIs',
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'apis/authentication',
          label: 'Authentication',
        },
        {
          type: 'doc',
          id: 'apis/clients',
          label: 'Clients',
        },
        {
          type: 'doc',
          id: 'apis/workers',
          label: 'Workers',
        },
        {
          type: 'doc',
          id: 'apis/appointments',
          label: 'Appointments',
        },
        {
          type: 'doc',
          id: 'apis/incidents',
          label: 'Incidents',
        },
      ],
    },
    {
      type: 'doc',
      id: 'security',
      label: 'Security',
    },
  ],
};

module.exports = sidebars;
```

## Step 6: Add Front Matter to Documents

Add front matter to each markdown file. Example for `overview.md`:

```markdown
---
id: overview
title: Hubshift Overview
sidebar_position: 1
---

# Hubshift Overview
...
```

Example for `apis/authentication.md`:

```markdown
---
id: authentication
title: Authentication APIs
sidebar_position: 1
sidebar_label: Authentication
---

# Authentication APIs
...
```

## Step 7: Customize Styling (Optional)

Edit `src/css/custom.css` to match your brand:

```css
:root {
  --ifm-color-primary: #2e8555;
  --ifm-color-primary-dark: #29784c;
  --ifm-color-primary-darker: #277148;
  --ifm-color-primary-darkest: #205d3b;
  --ifm-color-primary-light: #33925d;
  --ifm-color-primary-lighter: #359962;
  --ifm-color-primary-lightest: #3cad6e;
  --ifm-code-font-size: 95%;
  --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.1);
}

[data-theme='dark'] {
  --ifm-color-primary: #25c2a0;
  --ifm-color-primary-dark: #21af90;
  --ifm-color-primary-darker: #1fa588;
  --ifm-color-primary-darkest: #1a8870;
  --ifm-color-primary-light: #29d5b0;
  --ifm-color-primary-lighter: #32d8b4;
  --ifm-color-primary-lightest: #4fddbf;
  --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.3);
}
```

## Step 8: Test Locally

```bash
# Start development server
npm start
# or
yarn start
```

Visit `http://localhost:3000` to see your documentation.

## Step 9: Build for Production

```bash
# Build static site
npm run build
# or
yarn build
```

The built site will be in the `build/` directory.

## Step 10: Deploy

### Option 1: GitHub Pages

1. Install GitHub Pages plugin:
```bash
npm install --save-dev @docusaurus/plugin-pwa
```

2. Update `docusaurus.config.js`:
```javascript
presets: [
  [
    '@docusaurus/preset-classic',
    {
      docs: {
        // ... existing config
      },
      // Add GitHub Pages deployment
      deploymentBranch: 'gh-pages',
    },
  ],
],
```

3. Deploy:
```bash
GIT_USER=<your-github-username> npm run deploy
```

### Option 2: Netlify

1. Connect your repository to Netlify
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
3. Deploy automatically on push

### Option 3: Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

## Additional Features

### Search

Add Algolia DocSearch (free for open source):

1. Sign up at [Algolia DocSearch](https://docsearch.algolia.com/)
2. Add to `docusaurus.config.js`:
```javascript
themeConfig: {
  algolia: {
    appId: 'YOUR_APP_ID',
    apiKey: 'YOUR_SEARCH_API_KEY',
    indexName: 'hubshift-docs',
  },
  // ... rest of config
}
```

### Code Highlighting

Docusaurus uses Prism.js. Add language support in `docusaurus.config.js`:

```javascript
presets: [
  [
    '@docusaurus/preset-classic',
    {
      // ... existing config
      theme: {
        // ... existing config
      },
    },
  ],
],
```

### Versioning (Optional)

If you need versioned documentation:

```bash
npm run docusaurus docs:version 2.0.0
```

## Troubleshooting

### Common Issues

1. **Sidebar not showing**: Check `sidebars.js` file paths match your doc IDs
2. **Build errors**: Ensure all markdown files have proper front matter
3. **Links broken**: Use relative paths or Docusaurus link syntax
4. **Images not loading**: Place images in `static/img/` and reference with `/img/filename.png`

### Getting Help

- [Docusaurus Documentation](https://docusaurus.io/docs)
- [Docusaurus Discord](https://discord.gg/docusaurus)
- [GitHub Issues](https://github.com/facebook/docusaurus/issues)

## Next Steps

1. Customize the theme and branding
2. Add more documentation sections
3. Set up CI/CD for automatic deployments
4. Configure search (Algolia DocSearch)
5. Add analytics (Google Analytics, Plausible, etc.)

