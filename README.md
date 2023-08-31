Placeholder for image`<img src="https://raw.githubusercontent.com/business-thiem/NextJS13-scott-tut/main/assets/NextJS13-todo-ss1.png" width="1200" height="500">`

# Overview

A journal fullstack app that just ai to infer user's mood

## App Info

- The App is a journaling app... more details to be added later.
- Reads journal entry from user's journal, creates a prompt that enforces GPT to respond with consistent JSON with proper datatypes.
- Why would the user just not give prompts to GPT? (the problem solved by the app):
  - Simplifies prompting the a.i., saves journal entries for each user (i.e. just typing their text instead of being bloated with "give me an analysis of x", tell me the: "mood, color, and does it contain negative emotions")
  - Gives back consistent analysis of the journal entries
  - Summarizes the user's mood from all of their entries.

#### Example

##### input (user prompt):

`Dammit! So much happened today. I found my favorite tea, Sencha green tea. I won the lottery, but I failed my exam and my girlfriend broke up with me.`

##### output to journal entry (from LangChain & Zod parser):

```json
{
  "mood": "mixed",
  "summary": "A rollercoaster of emotions",
  "subject": "Events of the day",
  "negative": true,
  "color": "#ff0000"
}
```

Full output:

- Note: It's a full prompt to GPT. It even teaches it what a JSON schema is, looks like, and how it should respond to the user's prompt.

````
Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what!
You must format your output as a JSON value that adheres to a given "JSON Schema" instance.

"JSON Schema" is a declarative language that allows you to annotate and validate JSON documents.

For example, the example "JSON Schema" instance {{"properties": {{"foo": {{"description": "a list of test words", "type": "array", "items": {{"type": "string"}}}}}}, "required": ["foo"]}}}}
would match an object with one required property, "foo". The "type" property specifies "foo" must be an "array", and the "description" property semantically describes it as "a list of test words". The items within "foo" must be strings.
Thus, the object {{"foo": ["bar", "baz"]}} is a well-formatted instance of this example "JSON Schema". The object {{"properties": {{"foo": ["bar", "baz"]}}}} is not well-formatted.

Your output will be parsed and type-checked according to the provided schema instance, so make sure all fields in your output match the schema exactly and there are no trailing commas!

Here is the JSON Schema instance your output must adhere to. Include the enclosing markdown codeblock:
```json
{"type":"object","properties":{"mood":{"type":"string","description":"the mood of the person who wrote the journal entry."},"summary":{"type":"string","description":"quick summary of the entire entry."},"subject":{"type":"string","description":"the subject of the journal entry."},"negative":{"type":"boolean","description":"is the journal entry negative? (i.e. does it contain negative emotions?)."},"color":{"type":"string","description":"a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness."}},"required":["mood","summary","subject","negative","color"],"additionalProperties":false,"$schema":"http://json-schema.org/draft-07/schema#"}
```

Dammit! So much happened today. I found my favorite tea, Sencha green tea. I won the lottery, but I failed my exam and my girlfriend broke up with me.
{
  "mood": "mixed",
  "summary": "A rollercoaster of emotions",
  "subject": "Events of the day",
  "negative": true,
  "color": "#ff0000"
}
````

## Tech used

- NextJS : server-sided logic for server-sided rendering (SSR), great for SEO, makes loading pages faster for client. Must opt into 'use client' react scripts
- Tailwind : CSS library
- Prisma : ORM, create tables in a human-readable way
- PlanetScale (DB) : Serverless MySQL DB platform
- NodeJS : JS package manager
- API : OpenAi API GPT3.5-turbo. See https://platform.openai.com/
- Clerk: Authentication and user management built for React and NextJS. See https://clerk.com/ for more details
- Prettier: Makes code look nice and formatted. Adds semicolons (good habit from Java)
- Vitest: Unit test framework. See: https://vitest.dev/
- Recharts: React Library to create simple charts. See: https://recharts.org/en-US/
- LangChain: popular LLMs js framework for working with ai. See: https://js.langchain.com/docs/get_started/installation
- Zod: See: https://zod.dev/

- LangChain & Zod: Zod is a schema validator used by LangChain's output parser. Langchain describes to GPT the purpose of each object and the expected value. In tandem both techs help get back consistent JSON responses from GPT.

Link to course notes and future references:

- Github Repo: https://github.com/Hendrixer/fullstack-ai-nextjs
- Video Course: https://frontendmasters.com/courses/fullstack-app-next-v3/setup-app-homepage/

## Personal Notes

Future TODO:

- Known Bugs:
  - Journal entry data needs revalidate/reload all entries when user finishes entry and navigates back to dashboard. Currently requires refresh.
- UI additions:
  - Sidebar navigation hover color do not match the anchor tag's actual size. Could be Nextjs13 Link bug that is Nextjs13 dependent.

Prisma Studio Notes:

- `npm install @prisma/client`: package installation for production
- `npm install prisma --save-dev`: for dev dependencies
- `npx prisma format` cleans up schema after you finish. (Important: it also writes your side relations between models)
- `npx prisma studio` displays DB on browser
- `npx prisma generate && npm run build` in vercel build deployments (override)

PlanetScale Notes:

- create the org, create db, install via scoop. https://planetscale.com/docs/concepts/planetscale-environment-setup

LangChain Notes:

- If a.i. call goes over token/word limit. Use a Vector DB / embeddings.
  - LangChains' solution: https://js.langchain.com/docs/modules/chains/document/
    - "These are the core chains for working with Documents. They are useful for summarizing documents, answering questions over documents, extracting information from documents, and more."
    - We used: RefineChain here: https://js.langchain.com/docs/modules/chains/document/refine
  - Vector DB / embedding: https://platform.openai.com/docs/guides/embeddings/what-are-embeddings

### Workflows guide for myself in future

Planescale workflow:

- cmd `pscale auth login`
- switch orgs: `pscale org switch mood-journal-db`
- create branch `pscale branch create mood dev`
- connect `pscale connect mood dev --port 3309`
- `npx prisma db push` push to open local IP:port after connection to planetscale via shell
  - `Your database is now in sync with your Prisma schema.` on success
  - `There might be data loss when applying the changes`: safety rail in case you're overwriting old data without the new constraints from new schema. Yes it's okay in the dev env. Be careful in Production

Vitest

- terminal: `npm i @testing-library/jest-dom @testing-library/react vitest @vitejs/plugin-react-swc jsdom --save-dev`
- create:

  - vite.config.ts at root with the following. See: https://github.com/Hendrixer/fullstack-ai-nextjs/blob/main/vite.config.ts

  ```ts
  import { defineConfig } from 'vitest/config';
  import react from '@vitejs/plugin-react-swc';

  // https://vitejs.dev/config/
  export default defineConfig({
    plugins: [react()],
    test: {
      include: [
        '**/**tests**/**/_.[jt]s?(x)',
        '**/?(_.)+(spec|test).[jt]s?(x)',
      ],
      globals: true,
      environment: 'jsdom',
      setupFiles: 'setupTests',
      mockReset: true,
    },
  });
  ```

  - setupTests.ts at root
  - tsconfig.node.json at root : this runs client side tests on server side (still no standardized configuration for nextjs13 yet)

- add `"references": [{ "path": "./tsconfig.node.json" }]` to tsconfig.json
- add `"test": "vitest"` to package.json scripts

- create tests folder at root : create write tests. See home.test.tsx as sample
- run tests with `npm test`
- `npm build` if you want to build locally without vercel

#### Vercel Deploy Config:

- Clerk: change your auth DB to production (but for personal uses you can still use your dev branch) keep in mind: real world implications means that dev users will mix with production user accounts.

- PlanetScale:

  - promote your DB to production (should be enabled by default).
  - enable safe migrations of 'main' production branch
  - 'create deploy request' dev branch to main
  - In Overview tab: 'Ready to connect to your database?'
    - get username and create password
    - connect with 'prisma'
    - copy .env and paste it into vercel env

- Misc (required):

  - .env.local : all your Next Public Clerk variables & openai key - put into vercel env
  - next.config.js add:

  ```js
  const nextConfig = {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreBuildErrors: true,
      ignoreDuringBuilds: true,
    },
  };
  ```

- Vercel

  - Build and Output Settings - Override: `npx prisma generate && next build`
    - See: https://www.prisma.io/docs/guides/deployment/serverless/deploy-to-vercel for reason
  - Double check all your env variables for deployment are good. eslint and typescript checks are turned off via `ignoreBuildErrors`
    - this will cause vercel deploy to fail

- If above is good: good to deploy
