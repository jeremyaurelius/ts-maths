import { Vector } from './vector';
import { range } from 'lodash';

/**
 * TODO: memoise some of the calculations (especially re: matrix of minors)
 */
export class Matrix {

  /**
   * 
   * Constructs an n x m matrix, where n is the number of rows and m is the number of columns
   * 
   * @example matrix = new Matrix([
   *  [1, 0],
   *  [0, 1],
   * ])
   * This represents the identity matrix:
   * 1 0
   * 0 1
   */
  constructor(
    /**
     * Two dimensional array, representing matrix contents.
     * This indexed by rows first, then by columns
     * [rowIndex][columnIndex]
     */
    readonly rows: Readonly<number[][]>,
    /**
     * Skip validation of matrix contents. Only use for private methods inside Matrix class.
     */
    skipValidation?: boolean,
  ) {

    if (skipValidation) {
      return;
    }

    // filter out empty rows, e.g. [[]] becomes []
    // this prevents inconsistencies where an empty Matrix might be represented as either [] or [[]].
    // In the second case, the number of rows will be mistakenly reported as 1!
    // This is necessary when removing columns (e.g. in getSubMatrix()) or when building a Matrix from scratch
    this.rows = rows.filter((row) => row.length);

    const rowLength = this.rows[0]?.length || 0; // if matrix has rows (is not empty matrix), rowLength = length of first row. else rowLength = 0
    const anomalousRow = this.rows.find(row => row.length !== rowLength);
    if (anomalousRow) {
      throw new Error('Cannot have rows of different lengths');
    }
  }

  /**
   * Creates a matrix from a list of row parameters.
   * 
   * Note that unlike the constructor, here we pass multiple arrays as parameters instead of a two dimensional array as a single parameter
   * 
   * @param rows rows of the matrix to build
   * @example This creates the identity 2x2 matrix:
   * Matrix.from(
   *   [1, 0],
   *   [0, 1],
   * )
   */
  static from(...rows: Readonly<number[][]>) {
    return new Matrix(rows);
  }

  static empty() {
    return new Matrix([], true);
  }

  /**
   * Creates an n x n identity matrix
   * @param n number of rows and (number of columns) to use
   * @returns an n x n identity matrix
   */
  static identity(n: number) {
    const rows = range(n).map((rowIndex) => {
      return range(n).map((columnIndex) => {
        return rowIndex == columnIndex ? 1 : 0;
      });
    });
    return new Matrix(rows, true);
  }

  add(otherMatrix: Matrix): Matrix {
    if (this.getNumRows() !== otherMatrix.getNumRows()) {
      throw new Error('Cannot add matrices');
    }
    if (this.getNumCols() !== otherMatrix.getNumCols()) {
      throw new Error('Cannot add matrices');
    }
    const result = this.rows.map((row, rowIndex) => {
      const otherRow = otherMatrix.rows[rowIndex];
      return row.map((number, columnIndex) => {
        const otherNumber = otherRow[columnIndex];
        return number + otherNumber;
      });
    });
    return new Matrix(result, true);
  }

  subtract(otherMatrix: Matrix): Matrix {
    if (!this.hasSameDimensions(otherMatrix)) {
      throw new Error('Cannot add matrices');
    }
    const result = this.rows.map((row, rowIndex) => {
      const otherRow = otherMatrix.rows[rowIndex];
      return row.map((number, columnIndex) => {
        const otherNumber = otherRow[columnIndex];
        return number - otherNumber;
      });
    });
    return new Matrix(result, true);
  }

  hasSameDimensions(otherMatrix: Matrix): boolean {
    return this.getNumRows() === otherMatrix.getNumRows() && this.getNumCols() === otherMatrix.getNumCols()
  }

  multiply(scalar: number): Matrix
  /**
   * Multiplies matrix with otherMatrix.
   * 
   * The dimensions of the resulting matrix = matrix.getNumRows() x otherMatrix.getNumCols()
   *
   * @param otherMatrix matrix to multiply with
   * @returns result of multiplication
   */
  multiply(otherMatrix: Matrix): Matrix
  multiply(operand: number | Matrix): Matrix {
    if (typeof operand === 'number') {
      return this.multiplyWithScalar(operand);
    } else {
      return this.multiplyWithMatrix(operand);
    }
  }

  private multiplyWithScalar(scalar: number): Matrix {
    return this.map((n) => n * scalar);
  }

  // this may also be expressed as a multiplications of row vectors from this matrix with column vectors of otherMatrix
  private multiplyWithMatrix(otherMatrix: Matrix): Matrix {
    if (!this.canMultiply(otherMatrix)) {
      throw new Error('Cannot multiply matrices');
    }

    const otherMatrixColumns = otherMatrix.getColumns();

    // 3 time complexity variables
    // R1: number of rows in matrix 1
    // C1 = R2: number of columns in matrix 1 = number of columns in matrix 2
    // C2: number of columns in matrix 2
    // Time complexity: O(R1 * C1 * C2)
    const newMatrix = this.rows.map((row) => {

      const rowVector = new Vector(row);

      return otherMatrixColumns.map((otherColumn) => {

        // perform dot product of row with otherColumn
        const columnVector = new Vector(otherColumn);
        return rowVector.dotProduct(columnVector);
        
        // return row.reduce((accumulator, number, columnIndex) => {
        //   // use columnIndex of first matrix as rowIndex of other matrix
        //   const otherNumber = otherColumn[columnIndex];
        //   return accumulator + (number * otherNumber);
        // }, 0);

      });

    });

    return new Matrix(newMatrix, true);
  }

  getRow(rowIndex: number): Readonly<number[]> {
    return this.rows[rowIndex];
  }

  getNumRows() {
    return this.rows.length;
  }

  getNumCols() {
    // if matrix has rows (is not empty matrix), rowLength = length of first row. else rowLength = 0
    return this.rows[0]?.length || 0;
  }

  // complexity is O(RC)
  getColumn(columnIndex: number): Readonly<number[]> {
    return this.rows.map((rows) => {
      // return the number at the right columnIndex for each rows
      return rows[columnIndex]
    });
  }

  /**
   * Gets a two-dimensional array of columns - [columnIndex][rowIndex]
   * This is indexed by column first, then by rows, unlike this.array, which is indexed by rows first, then by columns
   * @returns
   */
  getColumns(): Readonly<number[][]> {
    const numCols = this.getNumCols();
    const result: number[][] = [];
    for (let colIndex = 0; colIndex < numCols; colIndex++) {
      result.push(this.getColumn(colIndex) as any)
    }
    return result;
  }

  transpose() {
    const columns = this.getColumns();
    return new Matrix(columns); // use columns as rows
  }

  /**
   * Determines if this matrix can be multiplied with `other` matrix
   */
  canMultiply(other: Matrix): boolean {
    return this.rows[0].length === other.rows.length;
  }

  removeRow(rowIndex: number): Matrix {
    const rows = this.rows.filter((_, index) => index !== rowIndex)
    return new Matrix(rows, true);
  }

  removeColumn(columnIndex: number): Matrix {
    const rows = this.rows.map((row) => row.filter((_, index) => index !== columnIndex));
    return new Matrix(rows, false); // we need to validate when removing a column so that we don't end up with empty rows
  }

  /**
   * Returns determinant of this matrix if it is a square matrix. If it is not a square matrix, throws an error.
   * 
   * Internally, the method recursively uses the Laplace expansion to calculate the determinant.
   * 
   * TODO: make iterative or tail-recursive
   */
  getDeterminant(): number {
    const numRows = this.getNumRows();
    const numCols = this.getNumCols();
    if (numCols !== numRows) {
      throw new Error('Cannot get determinant of non-square matrix');
    }
    if (numRows == 0) {
      // base case
      // determinant of empty matrix is 1
      return 1;
    }
    if (numRows == 1) {
      // base case
      // determinant of 1x1 matrix is its only element
      return this.rows[0][0];
    }
    if (numRows == 2) {
      // NOTE: technically this base case is not needed as it can also be handled under the recursive case
      // base case
      // determine of 2x2 matrix
      // a b
      // c d
      // is ad - bc

      const [
        [a, b],
        [c, d],
      ] = this.rows;

      return a * d - b * c;
    }
    const firstRow = this.rows[0];
    const matrixWithoutFirstRow = this.removeRow(0);
    return firstRow.reduce((result, number, index) => {
      // submatrix is this matrix with the row and column of current `number` removed
      // therefore, remove first row and column at `index`
      const submatrix = matrixWithoutFirstRow.removeColumn(index);
      const submatrixDeterminant = submatrix.getDeterminant();
      if (index % 2 === 0) { // if index is even, we add the new value
        return result + number * submatrixDeterminant;
      } else { // if index is odd, we subtract the new value
        return result - number * submatrixDeterminant;
      }
    }, 0);
  }

  /**
   * Returns the matrix of minors
   * 
   * This operation is a step in finding the inverse of the matrix
   * 
   * @returns matrix of minors
   */
  getMatrixOfMinors() {
    const rows = this.rows.map((row, rowIndex) => {
      const matrixWithoutCurrentRow = this.removeRow(rowIndex);
      return row.map((_, colIndex) => {
        // get matrix that doesn't contain current row and current column
        const submatrix = matrixWithoutCurrentRow.removeColumn(colIndex);
        // get determinant of submatrix
        return submatrix.getDeterminant();
      });
    });
    return new Matrix(rows, true);
  }

  /**
   * 
   * Gets the matrix of cofactors from the matrix of minors. This operation is applied an intermediate step in finding the inverse of the matrix.
   * 
   * Flips the sign of each element if:
   * 1) Its row index is odd and its column index is even, or
   * 2) Its row index is even and its column index is odd
   * Otherwise the sign stays unchanged
   * 
   * @returns matrix with signs of relevant elements flipped
   */
  getCofactorsFromMinors() {
    const rows = this.rows.map((row, rowIndex) => {
      return row.map((number, colIndex) => {
        // if both rowIndex and colIndex are odd, or both rowIndex and colIndex are even, the sumOfIndices is even and the result is +ve
        // else, sumOfIndices is odd and the result is negative
        const sumOfIndices = rowIndex + colIndex;
        const isOdd = sumOfIndices % 2 === 1;
        return isOdd ? -number : number;
      });
    });
    return new Matrix(rows, true);
  }

  /**
   * Gets adjugate matrix from matrix of cofactors. This is a step in finding the inverse of the matrix.
   * 
   * Swaps all elements on the matrix such that their rowIndex becomes their columnIndex and vice versa. (Elements on the diagonal where row index === column index remain unchanged.)
   * @returns 
   */
  getAdjugateFromCofactors() {
    return this.transpose();
  }

  invert(): Matrix {
    // if dimensions are 2x2, we may also use invert2x2Matrix()
    const determinant = this.getDeterminant();
    if (determinant === 0) {
      throw new Error('No inverse exists for matrix whose determinant is 0');
    }
    // console.log('determinant', determinant);
    return this.getMatrixOfMinors()
      // .log('matrix of minors')
      .getCofactorsFromMinors()
      // .log('matrix of cofactors')
      .getAdjugateFromCofactors()
      // .log('adjugate')
      .map((x) => x / determinant); // divide every number by determinant
      // .multiplyWithScalar(1 / determinant); // we can also use this
      // .log('inverse');
  }

  /**
   * This is an alternative method to invert() for 2x2 matrices only
   */
  invert2x2Matrix(): Matrix {
    if (this.getNumCols() !== 2 && this.getNumRows() !== 2) {
      throw new Error('This method only works for 2x2 matrices');
    }

    const determinant = this.getDeterminant();
    if (determinant === 0) {
      throw new Error('No inverse exists for matrix whose determinant is 0');
    }

    const [
      [a, b],
      [c, d],
    ] = this.rows;

    const adjugate = new Matrix([
      [d, -b],
      [-c, a],
    ], true);

    return adjugate.map((x) => x / determinant);

  }

  /**
   * Applies transformer function to each element in the matrix
   * @param transformer transformer function to apply
   * @returns Matrix containing result of each element transformation
   */
  map(transformer: (n: number) => number): Matrix {
    return new Matrix(this.rows.map((row) => row.map(transformer)), true);
  }

  /**
   * Converts the matrix to an easy to read string of its contents
   * @returns 
   */
  toString() {
    return this.rows.map((row) => {
      return row.join('\t');
    }).join('\n');
  }

  /**
   * Logs the contents of the matrix with a tag before it
   * @param tag tag to print before the matrix
   */
  log(tag: string) {
    console.log(`${tag}\n${this.toString()}`);
    return this;
  }

}
