# How to contribute

We always welcome contributions to the project. This document outlines the steps to get started.

## Getting started

Clone the repository. Then normalize Node / NPM version (if you haven't got NVM installed, follow instructions [here](https://github.com/nvm-sh/nvm)):

```bash
nvm use
```

Install dependencies:

```bash
npm ci
```

Then implement your changes!

## Testing

All tests are performed using `jest` on Node v16 and v18. For a PR to be considered all these environments need to pass. Testing is automated using GitHu Actions CI.

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

## Submitting changes

Please open a pull request with a clear overview of what you've changed. When you send a pull request, please make sure you've covered off all the points in the predefined template, and any other relevant information.

When creating a new PR, don't worry about too much about the commit history, we'll squash-and-merge your changes into the main branch. So please feel free to commit as often as you like.

Lastly, don't worry about the version number, we'll bump that ourselves when we release a new version.
