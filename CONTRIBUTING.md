# How to Contribute

Illa-builder is one of Illa’s open source projects that is under very active development. We’re still working out the kinks to make contributing to this project as easy and transparent as possible, but we’re not quite there yet. Hopefully this document makes the process for contributing clear and answers some questions that you may have.

## Open Development

All work on Illa-builder happens directly on GitHub. Both core team members and external contributors send pull requests which go through the same review process.

## Your First Pull Request

Working on your first Pull Request? You can learn how from this free video series:

[How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

## Sending a Pull Request

The core team is monitoring for pull requests. We will review your pull request and either merge it, request changes to it, or close it with an explanation. For API changes we may need to fix our internal uses at Illa, which could cause some delay. We’ll do our best to provide updates and feedback throughout the process.

**Before submitting a pull request**, please make sure the following is done:

1. Fork the repository and create your branch from `beta`.
2. Run `git submodule init && git submodule update` in the repository root.
3. Run `pnpm install` in the repository root.
4. If you’ve fixed a bug or added code that should be tested!
5. Format your code with prettier (pnpm format).
6. Make sure your code lints (pnpm lint).

## Contribution Prerequisites

- You have Node installed at LTS and pnpm@8.x(https://pnpm.io/installation)
- You are familiar with Git.
- You have illa-builder-backend running on your local machine.

## Development Workflow

After cloning Illa-builder, run `pnpm install`to fetch its dependencies.After this,you need input the following to `apps/builder/.env.development.local`

```
ILLA_API_BASE_URL=localhost:9999  # this is your backend address,if not has this line, it will use the default backend address,location.origin
ILLA_INSTANCE_ID=SELF_HOST_CLOUD
ILLA_APP_VERSION=0.0.0
ILLA_APP_ENV=development
ILLA_USE_HTTPS=false
```

Then, you can run several commands:

- `pnpm build-self` creates a production version with Illa-builder.
- `pnpm lint` checks the code style.
- `pnpm format` format your code with prettier
- `pnpm dev` preview in real time while coding

If you need to run the production version, you need input the following to `apps/builder/env.self`

```
ILLA_API_BASE_URL=localhost:9999  # this is your backend address,if not has this line, it will use the default backend address,location.origin
ILLA_INSTANCE_ID=SELF_HOST_CLOUD
ILLA_APP_VERSION=0.0.0
ILLA_APP_ENV=production
```

## If not have illa-builder-backend


### If you have docker

#### If you have rust

You can install [illa](https://github.com/illacloud/illa).illa is a CLI tool for hosting ILLA Builder at local. And then you can run `illa deploy -S -p 9345`,this means you will deploy illa-builder-backend at port 9345. And then you can modify your `.env.development.local` like this:

```
ILLA_API_BASE_URL=localhost:9345
ILLA_INSTANCE_ID=SELF_HOST_CLOUD
ILLA_APP_VERSION=0.0.0
ILLA_APP_ENV=development
ILLA_USE_HTTPS=false
```


#### If you not have rust

You can use Docker pull image:`docker pull illa-soft/illa-builder:latest`,and then you can run `docker run -d -p 9345:2022 illasoft/illa-builder:latest`,this means you will deploy illa-builder-backend at port 9345. And then you can modify your `.env.development.local`




### If you are go developer


you can build [illa-builder-backend](https://github.com/illacloud/builder-backend)