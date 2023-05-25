import { Matrix } from '../../src/ts-maths';

/**
 * Matrix test
 */
describe('Vector', () => {

  const matrix = new Matrix([
    [1, 2],
    [3, 4],
  ]);

  const matrix2 = new Matrix([
    [2, 3],
    [4, 5],
  ]);

  const rowMatrix = new Matrix([
    [1, 2],
  ]);

  const columnMatrix = new Matrix([
    [1],
    [2],
  ]);

  const identity = new Matrix([
    [1, 0],
    [0, 1],
  ]);

  describe('#constructor', () => {

    it('constructs vector', () =>  {
      const vector = new Matrix([
        [1, 2],
        [3, 4],
      ]);
      expect(vector.rows).toEqual([
        [1, 2],
        [3, 4],
      ]);
    });

    it('throws an error if rows are not of the same length', () =>  {
      try {
        new Matrix([
          [1, 2],
          [3],
        ]);
        fail('Should have thrown an error');
      } catch (error) {
        expect((error as Error).message).toEqual('Cannot have rows of different lengths');
      }
    });

  });

  describe('#multiply(otherMatrix: Matrix)', () => {

    it ('throws an error if the number of columns in the first matrix is not equal to the number of rows in the second matrix', () => {
      try {
        matrix.multiply(new Matrix([
          [1, 2],
        ]));
        fail('Should have thrown an error');
      } catch (error) {
        expect((error as Error).message).toEqual('Cannot multiply matrices');
      }
    });

    it('multiplies two matrices together', () =>  {
      const result = matrix.multiply(matrix2);
      expect(result.rows).toEqual([
        [10, 13],
        [22, 29],
      ]);
      const result2 = matrix.multiply(columnMatrix);
      expect(result2.rows).toEqual([
        [5],
        [11],
      ]);
      const result3 = matrix.multiply(identity);
      expect(result3.rows).toEqual([
        [1, 2],
        [3, 4],
      ]);
    });

  });

  describe(('#add'), () => {

    it('throws an error if the matrices do not have the same number of rows', () =>  {
      try {
        matrix.add(rowMatrix);
        fail('Should have thrown an error');
      } catch (error) {
        expect((error as Error).message).toEqual('Cannot add matrices');
      }
    });

    it('throws an error if the matrices do not have the same number of columns', () =>  {
      try {
        matrix.add(columnMatrix);
        fail('Should have thrown an error');
      } catch (error) {
        expect((error as Error).message).toEqual('Cannot add matrices');
      }
    });
      
    it('adds two matrices together', () =>  {
      const result = matrix.add(matrix2);
      expect(result.rows).toEqual([
        [3, 5],
        [7, 9],
      ]);
    });
  
  });

  describe(('#subtract'), () => {

    it('throws an error if the matrices do not have the same number of rows', () =>  {
      try {
        matrix.subtract(rowMatrix);
        fail('Should have thrown an error');
      } catch (error) {
        expect((error as Error).message).toEqual('Cannot add matrices');
      }
    });

    it('throws an error if the matrices do not have the same number of columns', () =>  {
      try {
        matrix.subtract(columnMatrix);
        fail('Should have thrown an error');
      } catch (error) {
        expect((error as Error).message).toEqual('Cannot add matrices');
      }
    });
      
    it('subtracts two matrices', () =>  {
      const result = matrix.subtract(matrix2);
      expect(result.rows).toEqual([
        [-1, -1],
        [-1, -1],
      ]);
    });
  
  });

  describe(('#transpose'), () => {

    it('transposes a matrix', () =>  {
      const transposed = rowMatrix.transpose();
      expect(transposed.rows).toEqual([
        [1],
        [2],
      ]);
    });

  });

  describe(('#toString'), () => {

    it('returns a string representation of the matrix', () =>  {
      const string = matrix.toString();
      expect(string).toBe('1\t2\n3\t4');
    });

  });

});
