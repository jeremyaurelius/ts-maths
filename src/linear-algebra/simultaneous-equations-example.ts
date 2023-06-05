import { SimultaneousEquations } from "./simultaneous-equations";

// Solution of 2x + y = 12 and 6x + 5y = 40
const solution = SimultaneousEquations.from(
  [2, 1, 12],
  [6, 5, 40],
).setVars('x', 'y').solve();

console.log('solution', solution);
