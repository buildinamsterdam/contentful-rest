# Setup

This document outlines the steps to get started when creating a new package.

## Important things to do

When setting up a new package, make sure to do the following:

- [ ] Setup the repo (see below).
- [ ] Update the package name, description, and keywords (see below).
- [ ] Read through 'What to do next' below.
- [ ] Try out the package locally before publishing (see below). This is important to ensure that the package is working as expected.
- [ ] Replace the contents of this file (`README.md`) with the contents of the `README.example.md` file — make sure to adapt it to your project's specific needs. Finally, delete the old `README.example.md` file.
- [ ] Read through 'Publishing' below before publishing.

## Getting started

Clone the repository. Then normalize Node / NPM version (if you haven't got NVM installed, follow instructions [here](https://github.com/nvm-sh/nvm)):

```bash
nvm use
```

Install dependencies:

```bash
npm ci
```

## Setting up the repo

Following is a list of [settings](https://github.com/buildinamsterdam/PACKAGE-NAME/settings) we configure in Github for each new package:

### General

In `general` then under `Pull Requests`, we configure the following:

- [ &#10008; ] Allow merge commits
- [&#10004;] Allow squash merging
- [ &#10008; ] Allow rebase merging
- [&#10004;] Always suggest updating pull request branches

### Branches

In `branches` then under `Branch protection rules`, click `Add branch protection rule` and configure the following:

- **Branch name pattern**: `*`

- Under **Protect matching branches**, only enable the following:

  - [&#10004;] Require a pull request before merging
    - [&#10004;] Require approvals
    - [&#10004;] Dismiss stale pull request approvals when new commits are pushed
    - [&#10004;] Require review from Code Owners
  - [&#10004;] Require status checks to pass before merging
    - [&#10004;] Require branches to be up to date before merging
    - [&#10004;] Require conversation resolution before merging

- Click `Create`.

## Updating package name, description, keywords and codeowners

When getting started you'll want to globally find and replace the following:

- `PACKAGE-NAME` - The name of the package, e.g. `use-hook`.
- `PACKAGE-DESCRIPTION` - A short one-liner description of the package.

Then, update the list of `keywords` inside `package.json` with relevant keywords. These should match those defined as package `Topics` on GitHub.

You'll also want to update the `CODEOWNERS` file with the relevant team.

## Testing

To run tests locally, run:

```bash
npm run test
```

To watch for changes while developing the tests, run:

```bash
npm run test:watch
```

To get a coverage report, run:

```bash
npm run test:coverage
```

## What to do next

This template is designed to be a starting point for a package. You can change anything you want, but there are a few things you should keep in mind:

- Versioning is based on [Semantic Versioning](https://semver.org/). It's super important to follow this, as it makes it clear to users what changes they can expect when upgrading.
- Feel free to add new linting rules, testing frameworks, remove packages you don't need, etc. This template is a starting point and a demo for React hooks, but of course you can use it for other things too.
- A good `README.md` is super important. It's the first thing people will see when they come to our package, so make sure it's clear and easy to understand. Don't leave anything up to the imagination, make it as easy as possible for people to use your package.
- Only what you export inside `index.ts` will be available to users of your package. So make sure to export everything a user might need. Especially any types. If you don't export something, it won't be available via import.
- Inside `package.json` you'll see `peerDependencies` and the more common `devDependencies`. Peer dependencies are the libraries this package requires to work. By default the only requirement is React 18+, everything else inside dev dependencies is just used for development and won't be installed when people use this library. If you add a package that is required for the package to work, it should be a peer dependency. If you add a package that is only used for development, it should be a dev dependency.
- When setting up new packages it can sometimes be difficult to get started. If you're having trouble, look at other packages for inspiration. NPM has many other great libraries, so it's a great place for inspiration.

## Trying out the package locally before publishing

To try out the package locally, we can use [npm link](https://docs.npmjs.com/cli/v9/commands/npm-link) to install the package onto a local project. It's a super easy way to test out any package before publishing in a real project.

If the package has a build script (not all do), first run it:

```bash
npm run build
```

**Note**: If build doesn't work, and you get the error `tsc: command not found`, you'll need to install TypeScript globally. Run `npm install -g typescript`. Then build should work!

To link, run:

```bash
npm link
```

Then in the project you want to test it in, run:

```bash
npm link @buildinams/PACKAGE-NAME
```

Once done testing, you can unlink the package by running:

```bash
npm unlink --no-save @buildinams/PACKAGE-NAME
```

Couple things to **Note**:

- When running `npm link` the package-name is taken from `package.json` and <u>not</u> from the directory name. So in our case it'll always be prefixed with `@buildinams/` and then the name of the package, such as `@buildinams/use-hook`.
- You can _only_ link if both the linked package and the project you're testing it in are using the same version of Node. If they're not, you'll get an error. You can see what version of node you're using by running `node -v` in the terminal.
- Link is based on the built package, so every time you make a change to the package, you'll need to rebuild it (if a build script is used). But you don't need to re-link it.
- If you're having issues linking, you may need to do a clean package install in both the package and the project you're testing it in. To do this; delete `node_modules` and run `npm i` in both then try linking again.
- You can confirm link worked by checking if the linked package is found in the `node_modules` directory of the project you're testing it in. It'll be inside a module called `@buildinams` and then the name of the package.
- You can only install one linked package at a time. If you try to link multiple to a project it'll overwrite any previous one with the new link.
- Install resets any links, so if you re-install on the package linked, you'll have to re-link the package.

### Removing all links

If you want to see a list of what packages are linked, you can run:

```bash
npm list -g --link=true
```

To then remove any links, run:

```bash
npm unlink -g @buildinams/PACKAGE-NAME
```

## Linting

To lint the package, run:

```bash
npm run lint
```

To lint the package and fix any issues, run:

```bash
npm run fix
```

## Publishing

### Setting up 'NPM_TOKEN'

To publish the package, you'll first have to generate an NPM secret. This is the secret that is used to authenticate with NPM when publishing. It's a one-time thing, so you'll only need to do it once.

Steps to generate token:

1. Go to [NPM](https://www.npmjs.com/) and log in. **Note**: You'll need to be added to the `@buildinams` organization on NPM to be able to publish packages.
2. Then go to Access Tokens in your profile.
3. Click `Generate New Token` then `Classic Token`.
4. Give it a name if you want (it's optional), select `Automation` option and click `Generate Token`.
5. Copy the token and save it somewhere safe. You'll only be able to see it once.

Steps to publish:

1. Go to the projects settings on Github at [GitHub](https://github.com/buildinamsterdam/PACKAGE-NAME/settings).
2. Under `Secrets` open `Secrets and variables`, then go to `Actions` (or go directly [here](https://github.com/buildinamsterdam/PACKAGE-NAME/settings/secrets/actions)).
3. Click `New repository secret` and set the title as `NPM_TOKEN` and the value as the token you generated in the previous steps.

Now you're ready to publish!

### Creating a new release

Steps to publish a new version:

1. First, make sure you have bumped the package version inside `package.json` and ran `npm i` (bumped version needs to be included in the `package-lock.json` for publish to work). Also, make sure to follow versioning rules, as mentioned above.

2. Then, to publish go to [releases/new](https://github.com/buildinamsterdam/PACKAGE-NAME/releases/new). And add the following information:

- **Tag**: This should be the same version as the one in `package.json`. For example, `0.0.1`. To create a new tag start writing the version number and it'll show up as an option - `Create a new tag: ... on publish`.
- **Release title**: This should be the same as the tag, i.e. `0.0.1`.
- **Describe this release**: This is where you can add a description of the changes in this release. We usually follow the following structure:
  - For first release: `Initial release`.
  - For subsequent releases: Include `Changes:` followed by a list of changes. Each change should start with a `-` and be written in present tense. For example:
    - `Changes:`
    - `- Add new feature`
    - `- Fix bug`
    - `- Update dependencies`

3. Click `Publish release`!

The release will then be automatically published to NPM once `publish-npm.yml` actions pass!
