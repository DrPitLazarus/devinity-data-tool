# API

REST API backend server for devinity-data-tool. This API will only need to GET; it will not modify the database.

## Development

### Steps

1. Create a `now-secrets.json` file in the root folder (where `now.json` is).
Replace the values for the database connection. 
Note: The database name is inside `now.json`. 
The `now-env` package will make these keys available to `process.env`. 
This file should **never** be commited for security reasons, and is only used for local development.
```json
{
    "@host": "ipaddress",
    "@user": "dbusername",
    "@pass": "dbuserpassword"
}
```

2. Install the packages.
```bash
$ npm install # or the alias 'npm i'
```

3. Run locally.
```bash
$ npm run dev-api
```

## Project Structure

- `api/`
  - `src/`
    - `classes/` - Classes for obtaining data
      -  `index.js` - Export, puts classes into a object
    - `routes/` - Routes for the endpoints
      - `index.js` - Export, puts all routes into an array
    - `dbconn.js` - Export, creates database connection pool
  - `index.js` - API entry point
