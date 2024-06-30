
![GitHub last commit](https://img.shields.io/github/last-commit/libreconnect/backend)
![GitHub closed issues](https://img.shields.io/github/issues-closed/libreconnect/backend)
![GitHub contributors](https://img.shields.io/github/contributors/libreconnect/backend)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/libreconnect/backend)

# Backend

This project is a backend application written in NodeJS that provides an interface for interacting with the API.


## Installation

### Quick Start

```sh
$ c .env.example .env
$ pnpm i
$ pnpm run dev
```

### Configuration
| Variable                 | Description                                   | Exemple                            |
|--------------------------|-----------------------------------------------|------------------------------------|
| `TZ`                     | time zone                                     | `UTC`                              |
| `PORT`                   | Port on which the application is listening    | `3333`                             |
| `HOST`                   | Host of the application                       | `localhost`                        |
| `APP_KEY`                | Key of app                                    | `a9sof1uUjuSEpCeFDsoQKfMXuJnZUvAW` |
| `NODE_ENV`               | Type of environment                           | `prod`                             |
| `LOG_LEVEL`              | Level of log                                  | `info`                             |
| `DB_PASSWORD`            | Database password                             | `postgres`                         |
| `DB_HOST`                | Database connection URL                       | `localhost`                        |
| `DB_USER`                | Database user                                 | `postgres`                         |
| `DB_DATABASE`            | Name of Database                              | `backend`                          |
| `DB_PORT`                | Database port                                 | `5432`                             |


## Documentation

Checkout our [documentation api](https://api.libreconnect.bonnal.cloud/docs).