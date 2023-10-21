# 🚀 Contributing to Illa-builder

Welcome to Illa-builder, one of Illa's vibrant open-source projects currently under active development. We're continuously striving to simplify and enhance the contribution process. This guide aims to clarify the contribution process and answer any questions you may have.

## 🌍 Open Development

At Illa-builder, all development happens directly on GitHub. 🌟 Both core team members and external contributors send pull requests, and these PRs undergo the same review process.

## 🎉 Your First Pull Request

If you're new to submitting pull requests, you can get started by watching this informative video series: [How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github).

## 📩 Sending a Pull Request

Our core team diligently monitors pull requests. We review them and will either merge, request changes, or provide a clear explanation if we decide to close a PR. For API changes, there might be a need to align with our internal systems, which could introduce some delay. Rest assured, we'll strive to keep you informed and provide feedback throughout the process.

### 🛠️ Preparing Your Pull Request

Before submitting a pull request, please ensure you've completed the following steps:

1. 🍴 Fork the repository and create your branch from the `beta` branch.
2. Execute `git submodule init && git submodule update` in the repository's root.
3. Run `pnpm install` in the repository's root.
4. If your contribution involves bug fixes or code additions that require testing, please ensure they are thoroughly tested.
5. Format your code with Prettier using `pnpm format`.
6. Confirm that your code adheres to our linting standards with `pnpm lint`.

## 🎯 Contribution Prerequisites

To contribute effectively, make sure you meet the following prerequisites:

- 🚀 Node.js installed at LTS and pnpm@8.x ([Installation Guide](https://pnpm.io/installation))
- Proficiency in using Git.
- 🌐 Illa-builder-backend running on your local machine.

## 👨‍💻 Development Workflow

Once you've cloned Illa-builder, follow these steps to get started:

1. Run `pnpm install` to fetch the project's dependencies.
2. In the `apps/builder/.env.development.local` file, add the following configuration:

```plaintext
ILLA_API_BASE_URL=localhost:9999  # This is your backend address. If this line is missing, it will use the default backend address, location.origin
ILLA_INSTANCE_ID=SELF_HOST_CLOUD
ILLA_APP_VERSION=0.0.0
ILLA_APP_ENV=development
ILLA_USE_HTTPS=false
```

Now, you can utilize several commands for different purposes:

- 🏗️ `pnpm build-self`: Generates a production version of Illa-builder.
- 🧹 `pnpm lint`: Checks the code style for compliance.
- 🎨 `pnpm format`: Formats your code using Prettier.
- 🖥️ `pnpm dev`: Allows real-time preview while coding.

For running the production version, use the following configuration in `apps/builder/env.self`:

```plaintext
ILLA_API_BASE_URL=localhost:9999  # This is your backend address. If this line is missing, it will use the default backend address, location.origin
ILLA_INSTANCE_ID=SELF_HOST_CLOUD
ILLA_APP_VERSION=0.0.0
ILLA_APP_ENV=production
```

## 🚫 No Illa-builder-backend?

If you don't have Illa-builder-backend, follow one of these approaches:

### Using Docker

#### With Rust

1. Install [illa](https://github.com/illacloud/illa), a CLI tool for hosting ILLA Builder locally.
2. Execute `illa deploy -S -p 9345` to deploy illa-builder-backend at port 9345.
3. Modify your `.env.development.local` like this:

```plaintext
ILLA_API_BASE_URL=localhost:9345
ILLA_INSTANCE_ID=SELF_HOST_CLOUD
ILLA_APP_VERSION=0.0.0
ILLA_APP_ENV=development
ILLA_USE_HTTPS=false
```

#### Without Rust

1. Use Docker to pull the image: `docker pull illasoft/illa-builder:latest`.
2. Run the image with this command: `docker run -d -p 9345:2022 illasoft/illa-builder:latest`.
3. Adjust your `.env.development.local` accordingly.

### If You Are a Go Developer

You can build [illa-builder-backend](https://github.com/illacloud/builder-backend).

We appreciate your contributions to Illa-builder and look forward to your active participation in this exciting project! 🌟🚀