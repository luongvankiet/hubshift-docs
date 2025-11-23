---
seo:
  title: Hubshift Documentation
  description: Complete documentation for Hubshift - NDIS case management and CRM platform for service providers
---

::u-page-hero
#title
Hubshift Documentation

#description
Complete guide to Hubshift, a cloud-based NDIS case management and CRM platform. :br Built for service providers, support coordinators, and frontline workers.

#links
:::u-button

---

color: neutral
size: xl
to: en/0.overview
trailing-icon: i-lucide-arrow-right

---

Get Started
:::

:::u-button

---

color: neutral
icon: i-lucide-code
size: xl
to: en/apis/authentication
variant: outline

---

View APIs
:::

#headline
:::u-button

---

size: sm
variant: outline

---

NDIS Management Platform
:::
::

::u-page-section
:::u-page-grid
::::u-page-card
---
spotlight: true
class: group col-span-2 lg:col-span-1
to: en/0.overview
---
:::::div{.flex.items-center.justify-center.h-32}
::::::i-lucide-info{.text-6xl.text-primary}
::::::
:::::

    #title
    [Platform Overview]{.text-primary}

    #description
    Learn about Hubshift's features, user roles, and capabilities. Understand how the platform streamlines NDIS case management for service providers.
    ::::

    ::::u-page-card
    ---
    spotlight: true
    class: col-span-2
    to: en/1.tech-stack
    ---
      :::::div{.flex.items-center.justify-center.h-32}
        ::::::i-lucide-layers{.text-6xl.text-primary}
        ::::::
      :::::

    #title
    [Technology Stack]{.text-primary}

    #description
    Built with React.js and Express.js, powered by MongoDB and AWS infrastructure. Discover the modern tech stack that powers Hubshift's scalable platform.
    ::::

    ::::u-page-card
    ---
    spotlight: true
    class: col-span-2 lg:col-span-1
    to: en/2.system-architecture
    ---
      :::::div{.flex.items-center.justify-center.h-32}
        ::::::i-lucide-network{.text-6xl.text-primary}
        ::::::
      :::::

    #title
    [System Architecture]{.text-primary}

    #description
    Understand how Hubshift components connect and interact. Learn about the three-tier architecture, data flow, and integration patterns.
    ::::

    ::::u-page-card
    ---
    spotlight: true
    class: col-span-2 lg:col-span-1
    to: en/apis/authentication
    ---
      :::::div{.flex.items-center.justify-center.h-32}
        ::::::i-lucide-code{.text-6xl.text-primary}
        ::::::
      :::::

    #title
    [API Documentation]{.text-primary}

    #description
    Comprehensive RESTful API documentation with curl examples. Integrate with Hubshift's APIs for authentication, clients, workers, appointments, and incidents.
    ::::

    ::::u-page-card
    ---
    spotlight: true
    class: col-span-2 lg:col-span-1
    to: en/3.security
    ---
      :::::div{.flex.items-center.justify-center.h-32}
        ::::::i-lucide-shield{.text-6xl.text-primary}
        ::::::
      :::::

    #title
    [Security & Compliance]{.text-primary}

    #description
    Learn about Hubshift's security measures, authentication, authorization, and NDIS compliance features. Understand data protection and privacy practices.
    ::::

    ::::u-page-card
    ---
    spotlight: true
    class: col-span-2
    to: en/apis/authentication
    ---
      :::::div{.bg-elevated.rounded-lg.p-3.overflow-x-auto}
      ```bash
      # Example API call
      curl -X POST http://54.79.179.57:5000/api/user/login \
        -H "Content-Type: application/json" \
        -d '{
          "email": "user@example.com",
          "password": "SecurePassword123!"
        }'
      ```
      :::::

    #title
    [Quick API Examples]{.text-primary}

    #description
    All API endpoints include ready-to-use curl examples for quick integration. Copy and paste commands to test endpoints directly from your terminal.
    ::::

:::
::

::u-page-section
:::u-page-grid
::::u-page-card
---
spotlight: true
class: col-span-2 lg:col-span-1
to: en/apis/authentication
---
:::::div{.flex.items-center.justify-center.h-32}
::::::i-lucide-key{.text-6xl.text-primary}
::::::
:::::

    #title
    [Authentication APIs]{.text-primary}

    #description
    JWT-based authentication with support for web and mobile. User registration, login, password reset, and token management.
    ::::

    ::::u-page-card
    ---
    spotlight: true
    class: col-span-2 lg:col-span-1
    to: en/apis/clients
    ---
      :::::div{.flex.items-center.justify-center.h-32}
        ::::::i-lucide-users{.text-6xl.text-primary}
        ::::::
      :::::

    #title
    [Client Management APIs]{.text-primary}

    #description
    Complete client profile management, NDIS data tracking, goals, medications, and document storage.
    ::::

    ::::u-page-card
    ---
    spotlight: true
    class: col-span-2 lg:col-span-1
    to: en/apis/workers
    ---
      :::::div{.flex.items-center.justify-center.h-32}
        ::::::i-lucide-user-cog{.text-6xl.text-primary}
        ::::::
      :::::

    #title
    [Worker Management APIs]{.text-primary}

    #description
    Health carer and support coordinator management. Availability tracking, qualifications, and performance monitoring.
    ::::

    ::::u-page-card
    ---
    spotlight: true
    class: col-span-2 lg:col-span-1
    to: en/apis/appointments
    ---
      :::::div{.flex.items-center.justify-center.h-32}
        ::::::i-lucide-calendar{.text-6xl.text-primary}
        ::::::
      :::::

    #title
    [Appointment APIs]{.text-primary}

    #description
    Scheduling, rescheduling, swapping, routines, tasks, shift notes, and expense tracking for appointments.
    ::::

    ::::u-page-card
    ---
    spotlight: true
    class: col-span-2 lg:col-span-1
    to: en/apis/incidents
    ---
      :::::div{.flex.items-center.justify-center.h-32}
        ::::::i-lucide-alert-triangle{.text-6xl.text-primary}
        ::::::
      :::::

    #title
    [Incident Management APIs]{.text-primary}

    #description
    AI-powered incident intake, reporting, investigation workflow, and comprehensive analytics with geographic mapping.
    ::::

:::
::

::u-page-section
:::u-page-grid
::::u-page-card
---
spotlight: true
class: col-span-2
---
:::::div{.bg-elevated.rounded-lg.p-6}
**Key Features:**

      - ✅ Client & Worker Management
      - ✅ Appointment Scheduling
      - ✅ Incident Reporting & Analytics
      - ✅ Document Storage & Management
      - ✅ Timesheet & Payroll Processing
      - ✅ NDIS Compliance Tracking
      - ✅ Real-time Notifications
      - ✅ Mobile API Support
      :::::

    #title
    [Platform Capabilities]{.text-primary}

    #description
    Hubshift provides a comprehensive suite of features designed specifically for NDIS service providers, from client management to compliance reporting.
    ::::

    ::::u-page-card
    ---
    spotlight: true
    class: col-span-2 lg:col-span-1
    ---
      :::::div{.bg-elevated.rounded-lg.p-6}
      **Tech Stack:**

      - Frontend: React.js
      - Backend: Express.js
      - Database: MongoDB
      - Infrastructure: AWS
      - Authentication: JWT
      - Storage: AWS S3
      :::::

    #title
    [Modern Technology]{.text-primary}

    #description
    Built with industry-standard technologies for scalability, maintainability, and performance. Cloud-native architecture with AWS infrastructure.
    ::::

    ::::u-page-card
    ---
    spotlight: true
    class: col-span-2 lg:col-span-1
    ---
      :::::div{.bg-elevated.rounded-lg.p-6}
      **Integration:**

      - Stripe (Payments)
      - Xero (Accounting)
      - Twilio (SMS/WhatsApp)
      - AWS SES (Email)
      - Moodle (LMS)
      - Python AI/ML
      :::::

    #title
    [Third-Party Integrations]{.text-primary}

    #description
    Seamlessly integrate with payment processors, accounting software, communication services, and AI-powered analysis tools.
    ::::

:::
::
