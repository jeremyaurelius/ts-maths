## Setup

Make sure `yarn` is installed globally 

```
npm install -g yarn
```

Then install dependencies with yarn

```
yarn
```

## Commands

To start a REPL

```
yarn start
```

To run a `src/**/*example.ts` file

```
yarn start src/linear-algebra/matrix-example.ts
```

To run a `src/**/*example.ts` file and watch for changes

```
yarn watch src/linear-algebra/matrix-example.ts
```

To run build

```
yarn build
```

To run build and watch for changes

```
yarn build:watch
```

To run unit tests

```
yarn test
```

To run and watch unit tests

```
yarn test:watch
```

## Configuration

### TsConfig

We need set compilerOptions.module to "commonjs" to be able to use ts-node with import/export statements.

RollupJS doesn't understand commonjs however, so the rollup config has an override for the module field.
