/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be configured from the docs structure.

 This file is a template for Docusaurus sidebar configuration.
 Place this in your Docusaurus config file (typically docusaurus.config.js)
 */

module.exports = {
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

