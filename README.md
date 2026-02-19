https://github.com/SquidyLOL/nuxtjs-boilerplate/releases

[![Release Assets](https://img.shields.io/badge/Release%20Assets-Download%20Now-brightgreen?logo=github&logoColor=white)](https://github.org/SquidyLOL/nuxtjs-boilerplate/releases)

# Nuxt 4 Full-Stack Boilerplate for Quick Start with Prisma

A full-stack starter for Nuxt 4. Built with modern tools and best practices to help you get up and running quickly.

Embrace a calm, productive setup that covers the essentials and leaves room for your custom ideas. This boilerplate keeps the architecture clean, the code readable, and the development flow smooth. It stitches together Nuxt 4 on the frontend with a robust backend powered by PostgreSQL and Prisma, all while offering strong typing with TypeScript, solid state management with Pinia, and a pleasant UI powered by Tailwind CSS. It is designed for real projects, not just experiments.

Emojis help highlight the vibe: 💡, 🚀, 🧭, 🧰, 🛠️, 🔐, 🗺️, 🧭

Table of contents
- Why this starter?
- Core technologies and topics
- Quick start guide
- Project structure
- Backend architecture and data layer
- Frontend architecture and UI
- Authentication and security
- State management and data flow
- Styling and theming
- Quality, tests, and automation
- Development workflow
- Deployment and running in production
- Customization and advanced patterns
- Accessibility and internationalization
- Contributing and governance
- Licensing and releases

Why this starter?
This boilerplate is built to save you time and reduce the boilerplate pain when starting new Nuxt 4 projects. It provides a strong, opinionated yet flexible foundation. You get a clean separation between frontend and backend, clear data models, and practical defaults for developer experience. The goal is to help teams ship features faster while keeping the codebase maintainable long-term.

Key benefits
- Faster onboarding: A ready-to-run full-stack app with sensible defaults.
- Strong type safety: TypeScript throughout the stack keeps bugs small and predictable.
- Consistent style: Tailwind CSS gives you a scalable design system from day one.
- Modern tooling: ESLint, Prettier, and strict typing for a safer codebase.
- Solid data layer: Prisma with PostgreSQL provides a strong, flexible ORM experience.
- Planned extensibility: The architecture is designed to evolve with your product.

Core technologies and topics
- Boilerplate and starter kit patterns: boilerplate, starter-template
- JavaScript and TypeScript: javascript, typescript
- Frontend framework: nuxt, nuxtjs, vue
- State management: pinia
- Backend power: prisma, postgresql
- Styling: tailwindcss
- Authentication and authorization: oauth
- Quality and tooling: eslint
- UI and developer experience: tailwind, vite/nuxt tooling
- Ecosystem comfort: eslint, oauth, prisma, postgresql, vue

Quick start guide
This section walks you through the fastest path to a running dev server. It assumes you have a modern Node.js environment and a PostgreSQL server available. If you prefer, you can adapt the steps to your existing stack.

Prerequisites
- Node.js 18.x or newer
- npm, yarn, or pnpm as your package manager (pnpm recommended for performance)
- PostgreSQL 12+ instance with a user you can configure
- Basic command line familiarity
- Optional: Docker for local database if you want an isolated environment

Download and run from the releases
From the Releases page, download the installer asset nuxtjs-boilerplate-installer.sh and run it. This installer will set up the project skeleton on your machine, install dependencies, and create initial configuration files. After the installer completes, you will have a ready-to-run project with development scripts you can start immediately. See the Releases page for more details and asset options. For quick access, the Releases page is the central place to grab the latest version and any important updates. The Releases page can be accessed here: https://github.com/SquidyLOL/nuxtjs-boilerplate/releases

- Step 1: Install dependencies
  - Open a terminal in an empty directory where you want the project.
  - If you used the installer, it will handle this step. If you prefer manual setup, navigate to the project folder and run:
    - npm install
    - or pnpm install
  - This installs the frontend and backend dependencies, configures package scripts, and ensures the TypeScript types compile cleanly.

- Step 2: Configure environment variables
  - Prepare a .env file at the project root. You will need values for the database URL, OAuth configuration, and any external services you plan to use.
  - A typical .env.sample looks like this:
    - DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
    - JWT_SECRET="your_jwt_secret_here"
    - OAUTH_GOOGLE_CLIENT_ID="your_google_client_id"
    - OAUTH_GOOGLE_CLIENT_SECRET="your_google_client_secret"
  - Copy .env.sample to .env and customize it to your environment.
  - If you use Docker for local development, you can adapt the database URL to point to the container network.

- Step 3: Set up the database and Prisma
  - Ensure PostgreSQL is running and accessible with the credentials in your .env.
  - Prisma migrations bring your schema into sync with the database:
    - npx prisma migrate dev --name init
  - Generate the Prisma client to ensure type-safe queries:
    - npx prisma generate
  - If you have existing data, you can seed it with a script in prisma/seed.ts and run it via npx ts-node prisma/seed.ts (adjust according to your tsconfig).

- Step 4: Run the development server
  - Start the backend API and the Nuxt frontend in development mode:
    - npm run dev
  - The command starts a local server for the API and the client app, typically on http://localhost:3000 or a port you configure.
  - If you want to run a specific part, you can use workspace scripts if provided by the boilerplate (e.g., npm run ui for frontend or npm run api for backend).

- Step 5: Verify the app
  - Open the browser and navigate to the local address shown in your terminal.
  - Check user flows: sign-up, sign-in, password reset if included, and OAuth login if configured.
  - Confirm data flows through Prisma to PostgreSQL by creating or reading records in the UI and in the database.

- Step 6: Optional enhancements
  - Set up Docker Compose to unify the app, database, and any dependent services.
  - Add a local SMTP server for testing email flows.
  - Integrate a caching layer if your app requires high read performance.
  - Wire up a CI/CD pipeline to automate tests and deployments.

- Step 7: Project health checks
  - Run ESLint to ensure code style and quality:
    - npm run lint
  - Run TypeScript checks:
    - npm run typecheck
  - Run tests if present:
    - npm test
  - Build a production bundle to verify bundling and asset optimization:
    - npm run build
  - Run the production server to validate runtime behavior:
    - npm start

Project structure
- apps/
  - frontend/  — Nuxt 4 frontend with Pinia, Tailwind, and Vue components
  - backend/   — API layer powered by Prisma, PostgreSQL, and express or fastify
- prisma/
  - schema.prisma — Data model and migrations
  - migrations/   — Generated migration files
  - seed.ts         — Optional seeding script
- config/
  - environment/    — Environment configuration helpers
  - nuxt.config.ts   — Nuxt configuration
  - server.config.ts — Server initialization and middleware
- scripts/
  - helpers/        — Utility scripts for dev and build
  - db/              — Database bootstrap and migration helpers
- public/            — Static assets for the frontend
- .env.example       — Sample environment variables
- .eslint.js          — Linting configuration
- .prettierrc.json     — Code formatting rules
- README.md            — This file, the primary guide

Backend architecture and data layer
PostgreSQL forms the data backbone for this boilerplate. The design favors clear separation of concerns, predictable migrations, and easy data access through Prisma. The architecture emphasizes type safety, testability, and forward compatibility.

Key choices
- PostgreSQL as the primary relational database for stability and a robust feature set.
- Prisma as the ORM to provide a clean query API with a strong type system.
- Clear data models that map closely to the UI components and business logic.
- Migration-first approach for database evolution, with careful versioning of schema changes.

Data modeling philosophy
- Entities are modeled with explicit relationships and constraints for integrity.
- Each table has a primary key that’s stable across environments.
- Timestamps are used for created_at and updated_at to track changes.
- Sensitive fields are protected by access controls within the API layer.

Prisma schema design
- Put all models under prisma/schema.prisma.
- Use relations to model one-to-many and many-to-many associations.
- Generate type-safe client to minimize runtime errors and improve developer experience.
- Use migrations to carry schema changes from development to production.

Security and data protection
- Access to data is governed by API layer authorization checks.
- Sensitive fields are excluded from client responses unless explicitly allowed.
- Environment-based secrets and keys are loaded from a secure source (e.g., .env).
- Regular updates and security reviews are encouraged to keep dependencies safe.

Frontend architecture and UI
Nuxt 4 powers the frontend with a modern, modular structure. Pinia handles state management, while Tailwind CSS provides a scalable styling system. The UI is designed to be responsive, accessible, and consistent across pages.

Frontend decisions
- Server-side rendering (SSR) for fast first paint and SEO friendliness.
- Auto-imported components to reduce boilerplate.
- Pinia store modules organized by domain for maintainability.
- UI components designed to be reusable across pages and features.
- Tailwind CSS with a tailored design system to speed up styling.

Component structure
- components/
  - common/        — Shared UI blocks (buttons, inputs, modals)
  - layout/        — Header, footer, navigation
  - features/        — Domain-specific components
- pages/
  - index.vue      — Home
  - auth/          — Login, signup, profile
  - dashboard/     — Main user area
- store/
  - user.ts        — User data and auth state
  - settings.ts    — Application settings state
- composables/
  - useAuth.ts     — Authentication hooks
  - useApi.ts       — API helper for requests
- plugins/
  - axios.ts        — HTTP client configuration
  - auth.ts         — Global auth guard logic
- styles/
  - global.css      — Tailwind base styles and custom tweaks
  - themes.css       — Theme-specific customizations

Styling and theming
- Tailwind CSS is the foundation for styling.
- A design system with tokens for colors, spacing, typography, and radii is defined to ensure consistency.
- Dark mode is supported via a simple toggle in the UI and a color palette that adapts automatically.
- Accessibility considerations are baked in: semantic HTML, ARIA attributes on interactive elements, and keyboard navigation first.

OAuth and authentication
- The boilerplate includes OAuth-ready patterns for popular providers (e.g., Google, GitHub).
- A secure authentication flow is implemented with access tokens and refresh tokens.
- Token storage is designed to minimize exposure in the browser and support server-side session management when needed.
- Roles and permissions can be extended as your app grows.

State management and data flow
- Pinia stores manage client-side state with clear actions and getters.
- Data fetching uses a service layer that centralizes API calls and error handling.
- Caching strategies are included to optimize repeated data access and reduce unnecessary network calls.
- The dev experience benefits from strict typing for store definitions and API payloads.

Security and best practices
- ESLint enforces code quality and consistency.
- TypeScript reduces runtime surprises and improves editor feedback.
- Sensitive configuration lives in environment variables; never commit secrets.
- Regular dependency updates and vulnerability scans are recommended.

Quality, tests, and automation
- ESLint and Prettier enforce style and quality across the codebase.
- Unit and integration tests are encouraged for core logic and critical paths.
- A sample test setup is provided; adapt it to your testing philosophy.
- Continuous Integration (CI) recommendations are included to help you set up pipelines that run tests, linting, and builds on every push.

Development workflow
- Clone the project and install dependencies.
- Set up the environment with a .env file tailored to your environment.
- Run migrations to align the database with your Prisma schema.
- Use dedicated scripts to run the frontend and backend in development mode.
- Leverage hot-reloading for rapid iteration.
- Keep code quality high with lint and type checks as part of your daily routine.

Deployment and production
- The boilerplate supports running in production with a production-ready build.
- Separate API server and frontend rendering can be deployed behind a reverse proxy.
- Environment variables govern behavior in production. Ensure those are securely managed.
- Database migrations should be applied in a controlled manner during deployment.

Customization and advanced patterns
- Extend data models with minimal friction by updating Prisma schema and generating the client.
- Add new pages by creating route-based Vue components under the pages directory.
- Create new store modules for additional domains.
- Introduce feature flags to enable or disable features without deploying new code paths.
- Add or adjust OAuth providers as your needs evolve.

Accessibility and internationalization
- The UI includes semantic HTML and ARIA attributes for better assistive tech support.
- Text content is designed to be translatable; you can integrate i18n libraries and provide locale files.
- Keyboard navigation is supported across all interactive elements.

Project structure in depth
- apps/frontend
  - pages/
  - components/
  - store/
  - plugins/
  - composables/
  - assets/ (images and fonts)
  - public/ (static assets)
  - nuxt.config.ts
- apps/backend
  - src/
  - prisma/
  - migrations/
  - tsconfig.json
  - schema.prisma
- config
  - environment/
  - nuxt.config.ts (shared or specific)
- scripts
  - dev.sh
  - build.sh
  - db/
- tests
  - unit/
  - integration/
- .env.example
- README.md

Tips for adopting this boilerplate in real projects
- Start with the core data model and tailor it to your domain. Prisma makes evolving the schema straightforward.
- Build a clean UI kit using Tailwind CSS utility classes. Extract common components into the components/common folder.
- Use Pinia stores to orchestrate global app state, such as user authentication, UI modes, and feature flags.
- Keep API routes lean. Validate payloads on the server and sanitize inputs to prevent common security issues.
- Document your public API in a dedicated wiki or docs folder to help new developers get up to speed quickly.
- Plan for multi-environment deployment. Use environment-specific configs to keep behavior stable across dev, staging, and prod.
- Regularly check dependencies for security updates. Set up alerts to stay ahead of vulnerabilities.

Security considerations
- Treat secrets as confidential and rotate keys periodically.
- Use HTTPS in production and enforce secure cookie policies if you implement sessions.
- Validate all inputs and escape outputs to prevent injection attacks.
- Audit access controls and make sure only authorized roles can perform sensitive operations.
- Implement rate limiting and monitoring to detect abnormal usage.

Testing strategy
- Unit tests for core business logic and utilities.
- Integration tests for critical interactions between frontend and backend.
- End-to-end tests for primary user flows, including authentication and data access.
- Use mocks and stubs to isolate tests and speed up feedback cycles.
- Run tests as part of your CI pipeline to catch regressions early.

Linting, formatting, and code quality
- ESLint provides rules to catch common mistakes and maintain consistency.
- Prettier ensures consistent code formatting across the codebase.
- TypeScript compiler checks guard against type errors and help you catch mismatches early.
- Set up pre-commit hooks to run linting and tests before commits.

Continuous integration and delivery
- A simple CI setup can run lint, tests, and type checks on every pull request.
- Build artifacts for frontend and backend, and run smoke tests against the built app.
- Use environmental variables and secrets management to keep credentials out of the codebase.
- Implement automated deployments to staging and production with rollback capability.

Contributing and governance
- The project welcomes contributions that align with the design philosophy.
- Maintain a clear code of conduct and an issue template to guide discussions.
- Propose features via issues, then open PRs with a focused scope and thorough tests.
- Review changes for architectural fit, maintainability, and performance impact.

License
- This boilerplate uses a permissive license suitable for personal, academic, and commercial use.
- The code should be credited to the original authors and used in accordance with the license terms.

Releases
- The latest version and asset downloads live in the Releases page. You can browse the latest release notes, security advisories, and migration guides there.
- For quick access, go to the Releases page at the same link used to obtain the installer earlier. See the Releases page for more details and updated assets:
  https://github.com/SquidyLOL/nuxtjs-boilerplate/releases

Endnotes
- This project aims to be practical and extensible. It is not a one-size-fits-all solution; adapt it to your product requirements.
- If you need to share a specific configuration example, add it under config or docs so others can reuse it as a starting point.
- Maintain clarity and consistency as you evolve the codebase. Clear boundaries help long-term maintenance and team collaboration.

Releases and assets
- The Releases area is the primary source for installer assets and versioned updates.
- If you need to re-create a local development environment from scratch, the Releases page is your first stop for obtaining the necessary files and configuration patterns.
- The project evolves over time, so keeping up with the releases helps you align with the latest features, fixes, and recommended practices. For reference, the same link appears again here: https://github.com/SquidyLOL/nuxtjs-boilerplate/releases

Roadmap and future work
- Enhance the API layer with more robust input validation, rate limiting, and improved error handling.
- Expand the authentication module to support more providers and more fine-grained roles.
- Introduce a plugin system to easily extend the frontend and backend without touching core code.
- Improve observability with structured logs, traces, and metrics for production deployments.
- Provide more example features to demonstrate best practices for common app types (admin dashboards, e-commerce, CMS patterns).

Usage patterns and examples
- Typical page flows: landing page, sign-in, user profile, protected dashboard, and settings.
- Common UI patterns: modal dialogs, toasts, notifications, and a consistent form validation experience.
- Data flows: user actions trigger API calls, which update Pinia stores; the UI responds with loading states and optimistic UI where appropriate.
- Feature flags can gate experimental functionality until you are ready for broader release.

Environment and platform guidance
- Local development: run with your local PostgreSQL instance, or use Docker for an isolated environment.
- Staging: mirror production settings to ensure behavior aligns with production.
- Production: focus on performance, security, and reliability; consider caching and CDN strategies as needed.

Documentation philosophy
- Keep internal docs close to the code, but document high-impact decisions in a central guide.
- Provide quick reference guides for common tasks, such as running migrations, seeding data, and deploying.
- Maintain a policy for versioning and change management to help teams coordinate upgrades.

Accessibility notes
- All interactive controls have visible focus states.
- Form fields have associated labels and descriptive error messages.
- Internationalization is planned to enable broader audience reach.

Code samples and snippets
- You will find example components, composables, and store modules throughout the frontend and backend folders.
- Snippets illustrate common patterns, such as API request helpers, authentication guards, and data loading strategies.
- Replace sample data with real content as you implement your features.

Tagging and topics
- boilerplate
- eslint
- javascript
- nuxt
- nuxtjs
- oauth
- pinia
- postgresql
- prisma
- starter-kit
- starter-template
- tailwindcss
- typescript
- vue

Final notes
- This README is designed to guide you through setup, development, and extension in a practical way.
- Use the Releases page as the primary source for getting started and for updates to assets used by the installer workflow.
- Keep your environment safe and your dependencies current as you evolve the project to meet your needs.

End-of-document signals
- The structure above is meant to be navigable and actionable.
- When you return to the project after a break, use the Quick Start steps and the Instantiation steps to reestablish your development environment quickly.
- For any gaps, consult the code and accompanying docs in the repository to reinforce best practices and ensure consistency across your team.