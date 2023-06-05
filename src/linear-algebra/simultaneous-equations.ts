import { keyBy, memoize } from "lodash";
import { Matrix } from "./matrix";

export class SimultaneousEquations {
  
  constructor(
    /**
     * Matrix of the coefficients of the variables for each equation
     */
    readonly coefficientMatrix: Matrix,
    /**
     * Matrix of the constants after the = sign for each equation
     */
    readonly constantMatrix: Matrix,
    /**
     * Array of variables
     * @example ['x', 'y']
     */
    readonly variables?: Readonly<string[]>,
    skipValidation?: boolean,
  ) {
    if (skipValidation) {
      return;
    }
    if (this.coefficientMatrix.getNumCols() !== this.constantMatrix.getNumRows()) {
      throw new Error('coefficient matrix has a different number of columns to constant matrix');
    }
  }

  /**
   * @example // To find the solution of 2x + y = 12 and 6x + 5y = 40
   * SimultaneousEquations.from(
   *  [2, 1],
   *  [6, 5],
   * ).setVars('x', 'y').solve();
   */
  static from(
    ...equationRows: Readonly<number[][]>
  ) {
    const coefficientMatrix = new Matrix(
      equationRows.map((row) => row.slice(0, row.length - 1))
    );
    const constantMatrix = new Matrix(
      equationRows.map((row) => row.slice(row.length - 1, row.length)) // create an array of arrays with the last items of each equation row
    );
    return new SimultaneousEquations(coefficientMatrix, constantMatrix);
  }

  setVars(...variables: string[]) {
    return new SimultaneousEquations(this.coefficientMatrix, this.constantMatrix, variables, true);
  }

  getSolutionArray = memoize(() => {
    try {
      const coefficientInverse = this.coefficientMatrix.invert();
      const solutionMatrix = coefficientInverse.multiply(this.constantMatrix);
      return solutionMatrix.getColumns()[0];
    } catch (e) {
      throw new Error('The equations have no solution');
    }
  });

  solve(format = SolutionFormat.Map) {
    const solutions = this.getSolutionArray();
    const variables = this.variables || solutions.map((_, index) => 'x' + index);

    switch (format) {
      case SolutionFormat.Map:
        return new Map(solutions.map((solution, index) => {
          const variable = variables[index];
          return [variable, solution];
        }));
      case SolutionFormat.Dictionary:
        let index = 0;
        return keyBy(solutions, (_) => {
          return variables[index++];
        });
      default: // format === SolutionFormat.Array
        return solutions;
    }
  }

}

export enum SolutionFormat {
  Map = 'MAP',
  Array = 'ARRAY',
  Dictionary = 'DICTIONARY',
}
