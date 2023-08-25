Placeholder for image`<img src="https://raw.githubusercontent.com/business-thiem/NextJS13-scott-tut/main/assets/NextJS13-todo-ss1.png" width="1200" height="500">`

# Overview

A journal fullstack app that just ai to infer user's mood

## App Info

- The App is a journaling app... more details to be added later.
- Reads journal entry from user's journal, creates a prompt that enforces GPT to respond with consistent JSON with proper datatypes.
- Why would the user just not give prompts to GPT? (the problem solved by the app):
- - Simplifies prompting the a.i., saves journal entries for each user (i.e. just typing their text instead of being bloated with "give me an analysis of x", tell me the: "mood, color, and does it contain negative emotions")
- - Gives back consistent analysis of the journal entries
- - Summarizes the user's mood from all of their entries.

#### Example

##### input (user prompt):

`Today was okay. I guess. I found a new tea flavor that was cool but then I got a flat tire. :)`

##### output (from LangChain & Zod parser):

```json
{
  "mood": "okay",
  "summary": "Today was okay. I guess.",
  "negative": true,
  "color": "#ff0000"
}
```

Full output:

````json
"JSON Schema" is a declarative language that allows you to annotate and validate JSON documents.

For example, the example "JSON Schema" instance {{"properties": {{"foo": {{"description": "a list of test words", "type": "array", "items": {{"type": "string"}}}}}}, "required": ["foo"]}}}}
would match an object with one required property, "foo". The "type" property specifies "foo" must be an "array", and the "description" property semantically describes it as "a list of test words". The items within "foo" must be strings.
Thus, the object {{"foo": ["bar", "baz"]}} is a well-formatted instance of this example "JSON Schema". The object {{"properties": {{"foo": ["bar", "baz"]}}}} is not well-formatted.

Your output will be parsed and type-checked according to the provided schema instance, so make sure all fields in your output match the schema exactly and there are no trailing commas!

Here is the JSON Schema instance your output must adhere to. Include the enclosing markdown codeblock:
```json
{"type":"object","properties":{"mood":{"type":"string","description":"the mood of the person who wrote the journal entry."},"summary":{"type":"string","description":"quick summary of the entire entry."},"negative":{"type":"boolean","description":"is the journal entry negative? (i.e. does it contain negative emotions?)."},"color":{"type":"string","description":"a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness."}},"required":["mood","summary","negative","color"],"additionalProperties":false,"$schema":"http://json-schema.org/draft-07/schema#"}```
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
