# How to Contribute

Illa-builder is one of Illa’s open source projects that is  under very active development. We’re still working out the kinks to make contributing to this project as easy and transparent as possible, but we’re not quite there yet. Hopefully this document makes the process for contributing clear and answers some questions that you may have.

## Open Development

All work on Illa-builder happens directly on GitHub. Both core team members and external contributors send pull requests which go through the same review process.

## Your First Pull Request

Working on your first Pull Request? You can learn how from this free video series:

[How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

## Sending a Pull Request

The core team is monitoring for pull requests. We will review your pull request and either merge it, request changes to it, or close it with an explanation. For API changes we may need to fix our internal uses at Illa, which could cause some delay. We’ll do our best to provide updates and feedback throughout the process.

**Before submitting a pull request**, please make sure the following is done:

1. Fork the repository and create your branch from develop.
2. Run `git submodule init && git submodule update` in the repository root.
3. Run pnpm in the repository root.
4. If you’ve fixed a bug or added code that should be tested!
5. Format your code with prettier (pnpm prettier).
6. Make sure your code lints (pnpm lint).

## Contribution Prerequisites

- You have Node installed at LTS and pnpm
- You are familiar with Git.

## Development Workflow

After cloning Illa-builder, run pnpm to fetch its dependencies. Then, you can run several commands:

- `pnpm build-cloud` creates a production version with Illa-builder.
- `pnpm lint` checks the code style.
- `pnpm format` format your code with prettier
- `pnpm dev`  preview in real time while coding
