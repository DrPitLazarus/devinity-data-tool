# Devinity Data Tool

Provides a REST API and an UI to get data from Devinity's database. 

## API

The REST API provides endpoints that the UI can consume to display data. 
It runs on [Node.js](https://nodejs.org) using Zeit's [micro](https://github.com/zeit/micro) web framework.

## UI

The UI provides a web frontend that users can use to browse data from the API.

## Development

### Requirements

- [Node.js](https://nodejs.org), perferably a v10 LTS release or greater.
- [Git](https://git-scm.org).
- A text editor.

### Steps

```bash
# clone the repo
$ git clone https://github.com/DrPitLazarus/devinity-data-tool.git

# change directory into project root
$ cd devinity-data-tool
```

See the `README.md` in `api` and `ui` directories for development steps.

## Deployment

This project is targeted to be deployed on [Zeit Now](https://zeit.co/now).


