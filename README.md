# Mood Tracker
App to record and track mood over time.

## Pre-Reqs
1. `node` :: https://nodejs.org
1. `yarn` :: https://yarnpkg.com

## Commands
1. `yarn start` :: build the React app to static files and run the server
1. `yarn dev` :: runs a local copy of the client and server
1. `yarn client` :: runs a local copy of the client app
1. `yarn server` :: runs a local copy of the server app

## Sessions Database
```sql
CREATE TABLE public.session (
  sid character varying PRIMARY KEY NOT NULL,
  sess json NOT NULL,
  expire timestamp(6) without time zone NOT NULL
);
```
