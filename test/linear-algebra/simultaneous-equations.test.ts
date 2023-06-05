import { SimultaneousEquations, SolutionFormat } from "../../src/ts-maths";

/**
 * SimultaneousEquations test
 */
describe('SimultaneousEquations', () => {

  describe('#solve', () => {

    it('solves equations with 2 variables', () =>  {

      // 2x + y = 12
      // 6x + 5y = 40
      const equations = SimultaneousEquations.from(
        [2, 1, 12],
        [6, 5, 40],
      ).setVars('x', 'y');

      const solution = equations.solve(SolutionFormat.Array);

      expect(solution).toEqual([5, 2]);

      expect(equations.checkSolution(solution)).toEqual([true, true]);
    });

    it('solves equations with 3 variables', () =>  {

      // 2x + y + 2z = 4
      // 6x + 5y + 3z = 5
      // 6x + 5y + 5z = 2
      const equations = SimultaneousEquations.from(
        [2, 1, 2, 4],
        [6, 5, 3, 5],
        [6, 5, 5, 2],
      ).setVars('x', 'y', 'z');

      const solution = equations.solve(SolutionFormat.Array);

      expect(solution).toEqual([6.375, -5.75, -1.5]);

      expect(equations.checkSolution(solution)).toEqual([true, true, true]);
    });
  });

});
