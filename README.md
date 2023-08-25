Placeholder for image`<img src="https://raw.githubusercontent.com/business-thiem/NextJS13-scott-tut/main/assets/NextJS13-todo-ss1.png" width="1200" height="500">`

# Overview

A journal fullstack app that just ai to infer user's mood

## App Info

- The App is a journaling app... more details to be added later.
- Reads journal entry from user's journal, creates a prompt that enforces GPT to respond with consistent JSON with proper datatypes.

## Tech used

- NextJS : server-sided logic for server-sided rendering (SSR), great for SEO, makes loading pages faster for client. Must opt into 'use client' react scripts
- Tailwind : CSS library
- Prisma : ORM, create tables in a human-readable way
- PlanetScale (DB) : Serverless MySQL DB platform
- NodeJS : JS package manager
- API : OpenAi API GPT3.5-turbo. See https://platform.openai.com/
- Clerk: Authentication and user management built for React and NextJS. See https://clerk.com/ for more details
- Prettier: Makes code look nice and formatted. Adds semicolons (good habit from Java)
- LangChain: popular LLMs js framework for working with ai. See: https://js.langchain.com/docs/get_started/installation
- Zod: See: https://zod.dev/

- LangChain & Zod: Zod is a schema validator used by LangChain's output parser. Langchain describes to GPT the purpose of each object and the expected value. In tandem both techs help get back consistent JSON responses from GPT.

Link to course notes and future references:

- https://frontendmasters.com/courses/fullstack-app-next-v3/setup-app-homepage/

## Personal Notes

Prisma Studio Notes:

- `npm install @prisma/client`: package installation for production
- `npm install prisma --save-dev`: for dev dependencies
- `npx prisma format` cleans up schema after you finish. (Important: it also writes your side relations between models)
- `npx prisma studio` displays DB on browser
- `npx prisma generate && npm run build` in vercel build deployments (override)

PlanetScale Notes:

- create the org, create db, install via scoop. https://planetscale.com/docs/concepts/planetscale-environment-setup

### Workflows guide for myself in future

Planescale workflow:

- cmd `pscale auth login`
- switch orgs: `pscale org switch mood-journal-db`
- create branch `pscale branch create mood dev`
- connect `pscale connect mood dev --port 3309`
- `npx prisma db push` push to open local IP:port after connection to planetscale via shell
- - `Your database is now in sync with your Prisma schema.` on success
- - `There might be data loss when applying the changes`: safety rail in case you're overwriting old data without the new constraints from new schema. Yes it's okay in the dev env. Be careful in Production
