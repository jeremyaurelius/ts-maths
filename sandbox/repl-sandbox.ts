import * as library from '../src/ts-maths';

// assign library to global object so it can be accessed in REPL sandbox
(global as any).tsMaths = library;

declare global {
  const tsMaths: typeof library;
}
