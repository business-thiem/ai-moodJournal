Placeholder for image`<img src="https://raw.githubusercontent.com/business-thiem/NextJS13-scott-tut/main/assets/NextJS13-todo-ss1.png" width="1200" height="500">`

# Overview

A journal fullstack app that just ai to infer user's mood

## App Info

- The App is a journaling app... more details to be added later.

## Tech used

- NextJS : server-sided logic for server-sided rendering (SSR), great for SEO, makes loading pages faster for client. Must opt into 'use client' react scripts
- Tailwind : CSS library
- Prisma : ORM, create tables in a human-readable way
- PlanetScale (DB) : Serverless MySQL DB platform
- NodeJS : JS package manager
- API : ?
- a.i. : ?
- Clerk: Authentication and user management built for React and NextJS. See https://clerk.com/ for more details
- Prettier: Makes code look nice and formatted. Adds semicolons (good habit from Java)

Link to course notes and future references:

- https://frontendmasters.com/courses/fullstack-app-next-v3/setup-app-homepage/

## Personal Notes

Prisma Studio Notes:

- `npm insall @prisma/client`: package installation for production
- `npm install prisma --save-dev`: for dev dependencies
- `npx prisma studio` to load the DB with GUI
- `npx prisma generate && npm run build` in vercel build deployments (override)

PlanetScale Notes:

- create the org, create db, install via scoop. https://planetscale.com/docs/concepts/planetscale-environment-setup

##### Workflow notes

Planescale workflow:

- cmd `pscale auth login`
- switch orgs: `pscale org switch mood-journal-db`
- create branch `pscale branch create mood dev`
- connect `pscale connect mood dev --port [port#]`
- `npx prisma db push` push to open local IP:port after connection to planetscale via shell
- - `Your database is now in sync with your Prisma schema.` on success
