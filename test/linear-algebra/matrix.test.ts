import { Matrix } from '../../src/ts-maths';

/**
 * Matrix test
 */
describe('Matrix', () => {

  const empty = Matrix.empty();

  const matrix1x1 = Matrix.from([2]);

  const identity1x1 = Matrix.identity(1);

  const matrix2x2 = Matrix.from(
    [1, 2],
    [3, 4],
  );

  const matrix2x2b = Matrix.from(
    [2, -3],
    [-4, 5],
  );

  const rowMatrix1x2 = Matrix.from(
    [1, 2],
  );

  const columnMatrix2x1 = Matrix.from(
    [1],
    [2],
  );
  
  const identity2x2 = Matrix.identity(2);

  const matrix3x3 = Matrix.from(
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  );

  const matrix3x3b = Matrix.from(
    [3, 0, 2],
    [2, -1, 4],
    [3, 2, -5],
  );

  const rowMatrix1x3 = Matrix.from(
    [1, 2, 3],
  );

  const columnMatrix3x1 = Matrix.from(
    [1],
    [2],
    [3],
  );

  const identity3x3 = Matrix.identity(3);

  const matrix4x4 = Matrix.from(
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  );

  const matrix4x4b = Matrix.from(
    [4, 0, 2, -2],
    [2, -5, 2, 1],
    [5, 2, -5, 7],
    [-1, 4, 0, -2],
  );

  describe('#constructor', () => {

    it('constructs matrix', () =>  {
      const matrix = new Matrix([
        [1, 2],
        [3, 4],
      ]);
      expect(matrix.rows).toEqual([
        [1, 2],
        [3, 4],
      ]);
    });

    it('removes empty rows', () =>  {
      const matrix = new Matrix([
        [1, 2],
        [],
      ]);
      expect(matrix.rows).toEqual([
        [1, 2],
      ]);
      const matrix2 = new Matrix([
        [],
      ]);
      expect(matrix2.rows).toEqual([]);
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

  describe('#empty', () => {
    it('creates an empty matrix', () => {
      const empty = Matrix.empty();
      expect(empty.rows).toEqual([]);
      expect(empty.getNumRows()).toBe(0);
      expect(empty.getNumCols()).toBe(0);
    });
  });

  describe('#identity', () => {
    
    it('creates an empty matrix', () => {
      const empty = Matrix.identity(0);
      expect(empty.rows).toEqual([]);
    });

    it('creates an n x n identity matrix', () => {
      const identity1x1 = Matrix.identity(1);
      expect(identity1x1.rows).toEqual([
        [1],
      ]);
      const identity2x2 = Matrix.identity(2);
      expect(identity2x2.rows).toEqual([
        [1, 0],
        [0, 1],
      ]);
      const identity3x3 = Matrix.identity(3);
      expect(identity3x3.rows).toEqual([
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ]);
      const identity5x5 = Matrix.identity(5);
      expect(identity5x5.rows).toEqual([
        [1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1],
      ]);
    });

  });

  describe(('#add'), () => {

    it('throws an error if the matrices do not have the same number of rows', () =>  {
      try {
        matrix2x2.add(rowMatrix1x2);
        fail('Should have thrown an error');
      } catch (error) {
        expect((error as Error).message).toEqual('Cannot add matrices');
      }
    });

    it('throws an error if the matrices do not have the same number of columns', () =>  {
      try {
        matrix2x2.add(columnMatrix2x1);
        fail('Should have thrown an error');
      } catch (error) {
        expect((error as Error).message).toEqual('Cannot add matrices');
      }
    });
      
    it('adds two matrices together', () =>  {
      const result = matrix2x2.add(matrix2x2b);
      expect(result.rows).toEqual([
        [3, -1],
        [-1, 9],
      ]);
    });
  
  });

  describe(('#subtract'), () => {

    it('throws an error if the matrices do not have the same number of rows', () =>  {
      try {
        matrix2x2.subtract(rowMatrix1x2);
        fail('Should have thrown an error');
      } catch (error) {
        expect((error as Error).message).toEqual('Cannot add matrices');
      }
    });

    it('throws an error if the matrices do not have the same number of columns', () =>  {
      try {
        matrix2x2.subtract(columnMatrix2x1);
        fail('Should have thrown an error');
      } catch (error) {
        expect((error as Error).message).toEqual('Cannot add matrices');
      }
    });
      
    it('subtracts two matrices', () =>  {
      const result = matrix2x2.subtract(matrix2x2b);
      expect(result.rows).toEqual([
        [-1, 5],
        [7, -1],
      ]);
    });
  
  });

  describe('#multiply(scalar: number)', () => {
    it('multiplies matrix and scalar', () =>  {
      const result = matrix2x2.multiply(3);
      expect(result.rows).toEqual([
        [3, 6],
        [9, 12],
      ]);
    });
  });

  describe('#multiply(otherMatrix: Matrix)', () => {

    it ('throws an error if the number of columns in the first matrix is not equal to the number of rows in the second matrix', () => {
      try {
        matrix2x2.multiply(rowMatrix1x2);
        fail('Should have thrown an error');
      } catch (error) {
        expect((error as Error).message).toEqual('Cannot multiply matrices');
      }
      try {
        matrix3x3.multiply(matrix2x2);
        fail('Should have thrown an error');
      } catch (error) {
        expect((error as Error).message).toEqual('Cannot multiply matrices');
      }
    });

    it('multiplies two matrices together', () =>  {
      const result = matrix2x2.multiply(matrix2x2b);
      expect(result.rows).toEqual([
        [-6, 7],
        [-10, 11],
      ]);
      const result2 = matrix2x2.multiply(columnMatrix2x1);
      expect(result2.rows).toEqual([
        [5],
        [11],
      ]);
      const result3 = matrix3x3.multiply(matrix3x3b);
      expect(result3.rows).toEqual([
        [16, 4, -5],
        [40, 7, -2],
        [64, 10, 1],
      ]);
      const result4 = matrix3x3.multiply(columnMatrix3x1);
      expect(result4.rows).toEqual([
        [14],
        [32],
        [50],
      ]);
    });

    it('returns the same matrix when multiplying with the identity', () =>  {
      const result = matrix1x1.multiply(identity1x1);
      expect(result.rows).toEqual(matrix1x1.rows);
      const result2 = matrix2x2.multiply(identity2x2);
      expect(result2.rows).toEqual(matrix2x2.rows);
      const result3 = matrix3x3.multiply(identity3x3);
      expect(result3.rows).toEqual(matrix3x3.rows);
    });

  });

  describe('#removeRow', () => {
    
    it('excludes a row', () => {
      const result = matrix2x2.removeRow(0);
      expect(result.rows).toEqual([
        [3, 4],
      ]);
      const result2 = matrix2x2.removeRow(1);
      expect(result2.rows).toEqual([
        [1, 2],
      ]);
      const result3 = matrix3x3.removeRow(0);
      expect(result3.rows).toEqual([
        [4, 5, 6],
        [7, 8, 9],
      ]);
      const result4 = matrix3x3.removeRow(1);
      expect(result4.rows).toEqual([
        [1, 2, 3],
        [7, 8, 9],
      ]);
    });

    it('throws no error when the row index does not exist', () => {
      const result = matrix2x2.removeRow(2);
      // only column is removed since row index does not exist
      expect(result.rows).toEqual(matrix2x2.rows);
    });

  });

  describe('#removeColumn', () => {
    
    it('removes a column', () => {
      const result = rowMatrix1x2.removeColumn(0);
      expect(result.rows).toEqual([
        [2],
      ]);
      const result2 = rowMatrix1x2.removeColumn(1);
      expect(result2.rows).toEqual([
        [1],
      ]);
      const result3 = rowMatrix1x3.removeColumn(0);
      expect(result3.rows).toEqual([
        [2, 3],
      ]);
      const result4 = rowMatrix1x3.removeColumn(1);
      expect(result4.rows).toEqual([
        [1, 3],
      ]);
    });

    it('removes a column after removing a row', () => {
      const result = matrix3x3.removeRow(0).removeColumn(1);
      expect(result.rows).toEqual([
        [4, 6],
        [7, 9],
      ]);
    });

    it('returns an empty matrix when removing the only row', () => {
      const result = columnMatrix2x1.removeColumn(0);
      expect(result.rows).toEqual([]);
    });

    it('throws no error when the column index does not exist', () => {
      const result = matrix2x2.removeColumn(2);
      // only row is removed since column index does not exist
      expect(result.rows).toEqual(matrix2x2.rows);
    });

  });

  describe('#getDeterminant', () => {
    
    it('calculates the determinant of an empty matrix', () => {
      expect(empty.getDeterminant()).toBe(1);
    });

    it('calculates the determinant of a 1x1 matrix', () => {
      expect(matrix1x1.getDeterminant()).toBe(2);
    });

    it('calculates the determinant of a 2x2 matrix', () => {
      expect(matrix2x2.getDeterminant()).toBe(-2);
    });

    it('calculates the determinant of a 3x3 matrix', () => {
      expect(matrix3x3b.getDeterminant()).toBe(5);
    });

    it('calculates the determinant of a 4x4 matrix', () => {
      expect(matrix4x4b.getDeterminant()).toBe(140);
    });

    it('throws an error on a non-square matrix', () => {
      try {
        rowMatrix1x2.getDeterminant();
        fail('Should have thrown an error');
      } catch (error) {
        expect((error as Error).message).toEqual('Cannot get determinant of non-square matrix');
      }
    });

  });

  describe(('#getMatrixOfMinors'), () => {

    it('returns the matrix of minors', () =>  {
      const matrix = Matrix.from(
        [3, 0, 2],
        [2, 0, -2],
        [0, 1, 1],
      );
      const result = matrix.getMatrixOfMinors()
        .map((x) => x === 0 ? 0 : x); // we need write to convert -0 to 0 since toEqual treats signed 0s differently
      expect(result.rows).toEqual([
        [2, 2, 2],
        [-2, 3, 3],
        [0, -10, 0], 
      ]);
    });

  });

  describe(('#getCofactorsFromMinors'), () => {

    it('gets matrix of cofactors from matrix of minors', () =>  {
      const matrix = Matrix.from(
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      );
      const result = matrix.getCofactorsFromMinors();
      expect(result.rows).toEqual([
        [1, -1, 1],
        [-1, 1, -1],
        [1, -1, 1],
      ]);
      const matrix2 = Matrix.from(
        [2, 2, 2],
        [-2, 3, 3],
        [0, -10, 0],
      );
      const result2 = matrix2.getCofactorsFromMinors();
      expect(result2.rows).toEqual([
        [2, -2, 2],
        [2, 3, -3],
        [0, 10, 0],
      ]);
    });

  });

  describe(('#getAdjugateFromCofactors'), () => {

    it('gets adjugate matrix from matrix of cofactors', () =>  {
      const matrix = Matrix.from(
        [2, -2, 2],
        [2, 3, -3],
        [0, 10, 0],
      );
      const result = matrix.getAdjugateFromCofactors();
      expect(result.rows).toEqual([
        [2, 2, 0],
        [-2, 3, 10],
        [2, -3, 0],
      ]);
    });

  });

  describe(('#invert'), () => {

    it('gets the inverse of a 2x2 matrix', () =>  {
      const matrix = Matrix.from(
        [1, 2],
        [3, 4],
      );
      const result = matrix.invert()
        .map((x) => Math.round(x * 100) / 100) // round to 2dp
        .map((x) => x === 0 ? 0 : x); // we need write to convert -0 to 0 since toEqual treats signed 0s differently
      expect(result.rows).toEqual([
        [-2, 1],
        [1.5, -0.5],
      ]);
    });

    it('gets the inverse of a 3x3 matrix', () =>  {
      const matrix = Matrix.from(
        [3, 0, 2],
        [2, 0, -2],
        [0, 1, 1],
      );
      const result = matrix.invert()
        .map((x) => Math.round(x * 100) / 100) // round to 2dp
        .map((x) => x === 0 ? 0 : x); // we need write to convert -0 to 0 since toEqual treats signed 0s differently
      expect(result.rows).toEqual([
        [0.2, 0.2, 0],
        [-0.2, 0.3, 1],
        [0.2, -0.3, 0],
      ]);
    });

    it('throws an error if the matrix is singular (determinant 0)', () =>  {
      try {
        const matrix = Matrix.from(
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        );
        matrix.invert();
        fail('Should have thrown an error');
      } catch (error) {
        expect((error as Error).message).toEqual('No inverse exists for matrix whose determinant is 0');
      }
    });

  });

  describe(('#invert2x2Matrix'), () => {

    it('gets the inverse of a 2x2 matrix', () =>  {
      const matrix = Matrix.from(
        [1, 2],
        [3, 4],
      );
      const result = matrix.invert2x2Matrix()
        .map((x) => Math.round(x * 100) / 100) // round to 2dp
        .map((x) => x === 0 ? 0 : x); // we need write to convert -0 to 0 since toEqual treats signed 0s differently
      expect(result.rows).toEqual([
        [-2, 1],
        [1.5, -0.5],
      ]);
    });

    it('throws an error if the matrix is not 2x2', () =>  {
      try {
        const matrix = Matrix.from(
          [3, 0, 2],
          [2, 0, -2],
          [0, 1, 1],
        );
        matrix.invert2x2Matrix();
        fail('Should have thrown an error');
      } catch (error) {
        expect((error as Error).message).toEqual('This method only works for 2x2 matrices');
      }
    });

    it('throws an error if the matrix is singular (determinant 0)', () =>  {
      try {
        const matrix = Matrix.from(
          [1, 2],
          [2, 4],
        );
        matrix.invert2x2Matrix();
        fail('Should have thrown an error');
      } catch (error) {
        expect((error as Error).message).toEqual('No inverse exists for matrix whose determinant is 0');
      }
    });

  });

  describe(('#transpose'), () => {

    it('transposes a matrix', () =>  {
      const transposed = rowMatrix1x2.transpose();
      expect(transposed.rows).toEqual([
        [1],
        [2],
      ]);
      const transposed2 = columnMatrix3x1.transpose();
      expect(transposed2.rows).toEqual([
        [1, 2, 3],
      ]);
    });

  });

  describe(('#toString'), () => {

    it('returns a string representation of the matrix', () =>  {
      const string = matrix2x2.toString();
      expect(string).toBe('1\t2\n3\t4');
    });

  });

});
