# @raj-ds/babel-preset

Automatically load the css for the @raj-ds design system.

## Installation

```sh
npm i --save-dev @raj-ds/babel-preset
# or
yarn add -D @raj-ds/babel-preset
```

## Usage

.babelrc:

```json
{
  "presets": ["@raj-ds/babel-preset"]
}
```

## Example

Input:

```js
import Card from '@raj-ds/card';
```

Output:

```js
import Card from '@raj-ds/card';
import '@raj-ds/card/dist/main.css';
```
