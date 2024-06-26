<h1 align=center>Jest Reporter GitHub Annotations</h1>

<p align=center>
  <a href='https://www.npmjs.com/package/@wopian/jest-reporter-github-annotations'><img alt='npm' src='https://flat.badgen.net/npm/v/@wopian/jest-reporter-github-annotations'></a>
  <a href='https://www.npmjs.com/package/@wopian/jest-reporter-github-annotations'><img alt='npm' src='https://flat.badgen.net/npm/dt/@wopian/jest-reporter-github-annotations'></a>
  <a href='https://bundlephobia.com/result?p=@wopian/jest-reporter-github-annotations'><img alt='bundlephobia' src='https://flat.badgen.net/bundlephobia/minzip/@wopian/jest-reporter-github-annotations?label=library%20size'></a>
</p>

<p align=center>
  <a href='https://github.com/wopian/jest-reporter-github-annotations/actions'><img alt='checks' src='https://flat.badgen.net/github/checks/wopian/jest-reporter-github-annotations'></a>
  <a href='https://github.com/wopian/jest-reporter-github-annotations/network/dependents'><img alt='repoDependants' src='https://flat.badgen.net/github/dependents-repo/wopian/jest-reporter-github-annotations'></a>
  <a href='https://github.com/wopian/jest-reporter-github-annotations/graphs/contributors'><img alt='devDeps' src='https://flat.badgen.net/github/contributors/wopian/jest-reporter-github-annotations'></a>
  <a href='https://github.com/sponsors/wopian'><img alt='sponsor' src='https://flat.badgen.net/badge/sponsor/%E2%9D%A4/pink?icon=github'></a>
</p>

<p align=center>Report Jest test failures directly on pull requests with GitHub annotations</p>

> [!IMPORTANT]
> [Jest 28](https://jestjs.io/blog/2022/04/25/jest-28) now includes a native GitHub Actions reporter. It is recommended to switch to the official GitHub Actions reporter, but this repository and package won't go away.
>
> Check out the [Jest blog post](https://jestjs.io/blog/2022/04/25/jest-28#github-actions-reporter) on how to setup the official Github Actions reporter on your projects! 

## Install

```
yarn install -D @wopian/jest-reporter-github-annotations
```

## Usage

This reporter only outputs failing test results in GitHub's annotation format, so you must include the default Jest reporter to get human readable test results in the terminal logs.

### CLI (preferred)

Add it to your Jest script used by your GitHub Actions workflow in `package.json`:

```json
{
  "scripts": {
    "test": "jest --reporters=default --reporters=@wopian/jest-reporter-github-annotations",
  }
}
```

### Jest Configuration

Or add it to your Jest configuration in `jest.config.js`:

```js
export default {
  reporters: [
    'default',
    '@wopian/jest-reporter-github-annotations',
  ],
}
```

Or `package.json`:

```json
{
  "jest": {
    "reporters": [
      "default",
      "@wopian/jest-reporter-github-annotations",
    ],
  }
}
```
