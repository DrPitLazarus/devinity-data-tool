# API

REST API backend server for devinity-data-tool. This API will only need to GET; it will not modify the database.

## Development

### Steps

Note: I recommend running commands in git bash or terminal, not cmd or powershell.

1. Set environment variables in bash so it can connect to the database when you run step 3.
```bash
$ export db=somedbname host=12.345.23.12 user=someusername pass=supersecret
```

2. Install the packages.
```bash
$ npm install # or the alias 'npm i'
```

3. Run locally. This does not auto-reload micro so you will need to CTRL+C and start again for changes. 
```bash
$ npm start
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
