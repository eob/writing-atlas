# Writing Atlas Web Site

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).


## Getting Started

1. Set up your `.env.local` file.  Ask edward.benson@gmail.com what its contents should be over a private channel.

**WARNING: This will connect you to the production DB!**

2. Install NPM dependencies

```bash
npm install
```

3. Create the database client code stubs

We connect to the database using Prisma. We need to generate JavaScript code stubs that let us query the database using Prisma based on the database schema defined in `web/prisma/schema.prisma`. This is done by running `prisma generate`.

```bash
npm run db-generate
```

4. Finally, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

Typescript is preferred, but our codebase still has lots of Javascript in it:

- [Typescript](https://www.typescriptlang.org)

Next.js is our Javascript framework:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

Tailwind is our CSS framework. Email edward.benson@gmail.com for Tailwind UI access.

- [Tailwind](https://tailwindcss.com) -  base CSS library
- [Tailwind UI](http://tailwindui.com) - a paid set of pre-made Tailwind components

Our realtime search is in the `../search` folder and powered by Meili

- [Meili](http://meilisearch.com) -  Open source Algolia clone

Our auth is provided by Auth0 and NextJS+Auth0.

- [auth0](http://auth0.com) - Authentication as a service
- [nextjs-auth0](https://www.npmjs.com/package/@auth0/nextjs-auth0) -  Nextjs integration for Auth0

Our database connection is done via Prisma

- [Prisma][https://www.prisma.io] - Typescript friendly ORM

## Deploy on Vercel

Deployments are automatically made to:

- `www.writingatlas.com` upon `main` branch merge
- `staging.writingatlas.com` upon `staging` branch merge

Before pushing, please attempt to run `npm build` to verify that there aren't any build errors.

# How to use SQLite instead of PostGres

Note: this will require you to remember not to commit `schema.prisma` to GitHub. :)

1. In `prisma/schema.prisma`, replace the  `db` datasource with this:

```
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

2. Ask Ted <edward.benson@gmail.com> to send you the `dev.db` database snapshot, and put it in `web/prisma`

3. Re-generate Prisma's stubs from the `web/` directory

`npx prisma generate`

# How set up a PostGres database on your local machine

1. Install Docker if you have not already, and open the Docker app.

2. In the command line, pull the most recent Postgres image from Dockerhub and run it. 

```bash
docker pull postgres
docker run --name postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=somepassword -p 5432:5432 -d postgres
```

From now on, you're able to look at the postgres database with these commands:

```bash
docker exec -it postgres bash
su postgres
psql
```

3. In `.env.local` set `DATABASE_URL="postgresql://postgres:somepassword@127.0.0.1:5432/writingatlas"`

4. In the command line, set up the Prisma database query client, and set up the tables in the database

```bash
npm run db-generate
npm run db-update-schema
```

The first command creates JavaScript stubs for querying the database using the schema defined in `prisma/schema.prisma`.

The second command creates tables in the Postgres database depending on the schema defined in `prisma/schema.prisma`.

5. Populate the database with data from Airtable

Follow the README instructions in [`search/README.md`](https://github.com/eric-zhizu/writingatlas.com/blob/main/search/README.md#loading-from-airtable) under section "Loading from Airtable".
