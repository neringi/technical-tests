# music-catalog
Music catalog created as a take home coding challenge for an interview. 


## Project setup

Before you begin, ensure you have the following installed:


### Installation

```bash
npx @nestjs/cli new backend
npm install -g @nestjs/cli

```

Test that it was successful by running it locally:

```bash
cd backend
npm run start:dev
```

Ensure that you have Postgres installed (use preferred method).

For MacOS, using Homebrew:

```bash
brew install postgresql@14
brew services start postgresql@14
```

Start Postgres services:

```bash
psql postgres
```

## Dependencies

Ensure to install correct packages in the right folder

### Backend

We will use TypeORM in backend.

```bash
npm install @nestjs/typeorm typeorm pg dotenv
npm install @nestjs/config
npm install @types/node --save-dev
npm install class-validator class-transformer

```

#### .env file

Will need `.env` file created in `/backend` that contains environment variables:
```
DATABASE_HOST=[host]
DATABASE_PORT=[port]
DATABASE_USER=[db_user]
DATABASE_PASSWORD=[db_password]
DATABASE_NAME=[db_name]
```

### Frontend

```bash
npm install react-icons

```

#### .env file

Will need `.env` file created in `/frontend` that contains environment variables:

```
VITE_API_URL=[API_url]

```

