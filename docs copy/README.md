# Hubshift Documentation

This directory contains the documentation for the Hubshift platform, structured for use with Docusaurus.

## Structure

```
docs/
├── overview.md              # Platform overview and key features
├── tech-stack.md            # Technology stack details
├── system-architecture.md  # System architecture and design
├── security.md             # Security practices and compliance
├── sidebar.js              # Sidebar configuration (for reference)
├── apis/
│   ├── authentication.md   # Authentication APIs
│   ├── clients.md          # Client management APIs
│   ├── workers.md          # Worker management APIs
│   ├── appointments.md     # Appointment management APIs
│   └── incidents.md        # Incident management APIs
└── README.md               # This file
```

## Quick Start

### Setting Up Docusaurus

1. **Install Docusaurus** (if not already installed):
```bash
npx create-docusaurus@latest hubshift-docs classic
cd hubshift-docs
```

2. **Copy Documentation Files**:
```bash
# Copy all markdown files from this directory to your Docusaurus docs folder
cp -r /path/to/hubshift-admin/docs/*.md /path/to/hubshift-docs/docs/
cp -r /path/to/hubshift-admin/docs/apis /path/to/hubshift-docs/docs/
```

3. **Configure Sidebar**:
   - Copy the sidebar structure from `sidebar.js` to your `docusaurus.config.js`
   - Or use the sidebar configuration directly

4. **Update Docusaurus Config**:
   - Set your project title, tagline, and URL
   - Configure theme settings
   - Set up search (if using Algolia)

### Docusaurus Configuration Example

Add this to your `docusaurus.config.js`:

```javascript
module.exports = {
  title: 'Hubshift Documentation',
  tagline: 'NDIS Management Platform Documentation',
  url: 'https://docs.hubshift.au',
  baseUrl: '/',
  // ... other config
  
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // ... other options
        },
      },
    ],
  ],
};
```

### Sidebar Configuration

Create or update `sidebars.js`:

```javascript
module.exports = {
  docs: [
    'overview',
    'tech-stack',
    'system-architecture',
    {
      type: 'category',
      label: 'APIs',
      items: [
        'apis/authentication',
        'apis/clients',
        'apis/workers',
        'apis/appointments',
        'apis/incidents',
      ],
    },
    'security',
  ],
};
```

## Documentation Sections

### Overview
- Platform introduction
- Key features
- User roles
- Integration capabilities

### Tech Stack
- Frontend technologies
- Backend technologies
- Infrastructure
- Third-party integrations

### System Architecture
- Architecture diagrams
- Component structure
- Data flow
- Integration architecture

### APIs
- Authentication APIs
- Client management APIs
- Worker management APIs
- Appointment management APIs
- Incident management APIs

### Security
- Authentication security
- Authorization
- Data security
- Infrastructure security
- Compliance

## Contributing

When updating documentation:

1. **Follow Markdown Format**: Use standard Markdown syntax
2. **Code Examples**: Include request/response examples
3. **Keep Updated**: Update docs when APIs change
4. **Test Examples**: Ensure code examples are accurate
5. **Add Diagrams**: Use Mermaid or images for complex flows

## Building Documentation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Serve production build
npm run serve
```

## Deployment

### GitHub Pages
```bash
npm run build
# Deploy to GitHub Pages
```

### Netlify
- Connect repository
- Build command: `npm run build`
- Publish directory: `build`

### Vercel
- Connect repository
- Framework preset: Docusaurus
- Build command: `npm run build`
- Output directory: `build`

## Additional Resources

- [Docusaurus Documentation](https://docusaurus.io/docs)
- [Markdown Guide](https://www.markdownguide.org/)
- [API Documentation Best Practices](https://swagger.io/resources/articles/adopting-an-api-first-approach/)

