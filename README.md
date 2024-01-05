# contentful-rest

[![NPM version][npm-image]][npm-url]
[![Actions Status][ci-image]][ci-url]
[![PR Welcome][npm-downloads-image]][npm-downloads-url]

Contentful REST API

## Introduction

Package introduction, couple of paragraphs.

```typescript
import useHook from "@buildinams/contentful-rest";

const baz = useHook({
	foo: "something",
	bar: "something else",
});
```

## Installation

Install this package with `npm`.

```bash
npm i @buildinams/contentful-rest
```

## Usage

Example 1 description.

```tsx
import React from 'react';
import useHook from '@buildinams/contentful-rest';

const SomeExample = () = {
  const baz = useHook({
    foo: "something",
    bar: "something else",
  });

  return (
    <p>{baz}</p>
  );
}
```

## API

### Input

- `foo`: Required - Description of argument.
- `baz`: Optional - Description of argument.

### Input as a table

| Property | Type   | Required | Notes                    |
| -------- | ------ | -------- | ------------------------ |
| **foo**  | string | **Yes**  | Description of argument. |
| **baz**  | string | No       | Description of argument. |

### Output

- `baz`: Description of output.

## Requirements

This library requires a minimum React version of `17.0.0`.

## Requests and Contributing

Found an issue? Want a new feature? Get involved! Please contribute using our guideline [here](https://github.com/buildinamsterdam/contentful-rest/blob/main/CONTRIBUTING.md).

[npm-image]: https://img.shields.io/npm/v/@buildinams/contentful-rest.svg?style=flat-square&logo=react
[npm-url]: https://npmjs.org/package/@buildinams/contentful-rest
[ci-image]: https://github.com/buildinamsterdam/contentful-rest/actions/workflows/test.yml/badge.svg
[ci-url]: https://github.com/buildinamsterdam/contentful-rest/actions
[npm-downloads-image]: https://img.shields.io/npm/dm/@buildinams/contentful-rest.svg
[npm-downloads-url]: https://npmcharts.com/compare/@buildinams/contentful-rest?minimal=true
