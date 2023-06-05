import { keyBy, memoize } from "lodash";
import { Matrix } from "./matrix";

export class SimulataneousEquations {
  
  constructor(
    readonly leftMatrix: Matrix,
    readonly rightMatrix: Matrix,
    readonly variables: string[],
    skipValidation?: boolean,
  ) {
    if (skipValidation) {
      return;
    }
    if (this.leftMatrix.getNumCols() !== this.rightMatrix.getNumRows()) {
      throw new Error('left matrix has a different number of columns to right matrix');
    }
  }

  static from(
    leftRows: Readonly<number[][]>,
    rightColumn: number[],
    variables: string[] = rightColumn.map((_, i) => 'x' + (i + 1)),
  ) {
    return new SimulataneousEquations(
      new Matrix(leftRows),
      new Matrix(rightColumn.map(x => [x])),
      variables,
    );
  }

  getSolutionArray = memoize(() => {
    try {
      const leftInverse = this.leftMatrix.invert();
      const solutionMatrix = leftInverse.multiply(this.rightMatrix);
      return solutionMatrix.getColumns()[0];
    } catch (e) {
      throw new Error('The equations have no solution');
    }
  });

  getSolutionDictionary() {
    const solutions = this.getSolutionArray();
    let index = 0;
    return keyBy(solutions, (_) => {
      return this.variables[index++];
    });
  }

  getSolution() {
    const solutions = this.getSolutionArray();
    return new Map(solutions.map((solution, index) => {
      const variable = this.variables[index];
      return [variable, solution];
    }));
  }

}
