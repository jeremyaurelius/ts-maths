import { SimultaneousEquations } from "./simultaneous-equations";

const solution = SimultaneousEquations.from([
  [2, 1],
  [2, 4],
], [2, 6], ['x', 'y']).getSolution();

console.log('solution', solution);

