# RISTEK Web Dev Task

This is a profile and personal blog site made to satisfy the requirements of the RISTEK Web Development Task. The frontend and backend is combined into one repo thanks to Next.js' API Routes and Prisma.

# Installing

Below are the things need to be done to set it up properly

## Requirements

You only need to have Docker installed on your local machine

## Setup

1. Clone this repository
2. Copy the contents of `.env.example` to your own `.env` (make sure to place it on the root of this repository)
3. To test on a development environment, run `make dev`

```bash
make dev

# If that doesn't work, run it manually
docker compose -f docker-compose.dev.yml up -d
```

and to test on a production environment, run `make prod`

```bash
make prod

# If that doesn't work, run it manually
docker compose up -d
```

`make dev` and `make prod` are shorteners I used using the Makefile. If your machine doesn't support Makefiles, run the `docker compose` manually.

4. Congrats! The app is now up and running

# Notes

To access the create a post feature, make sure you login/register using an account with the same username and email as `SUPER_USER` and `SUPER_EMAIL` on your `.env` file.
