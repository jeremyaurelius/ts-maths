import { SimulataneousEquations } from "./simultaneous-equations";

const solution = SimulataneousEquations.from([
  [2, 1],
  [2, 4],
], [2, 6], ['x', 'y']).getSolution();

console.log('solution', solution);

