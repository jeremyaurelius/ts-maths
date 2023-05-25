import { Vector } from "./vector";

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
     * Two dimensional array, presenting matrix contents.
     * This indexed by rows first, then by columns
     * [rowIndex][columnIndex]
     */
    readonly rows: Readonly<number[][]>,
  ) {
    const rowLength = rows[0].length;
    const anomalousRow = rows.find(row => row.length !== rowLength);
    if (anomalousRow) {
      throw new Error('Cannot have rows of different lengths');
    }
    // TODO: check if cols are of different lengths
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
    return new Matrix(result);
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
    return new Matrix(result);
  }

  hasSameDimensions(otherMatrix: Matrix): boolean {
    return this.getNumRows() === otherMatrix.getNumRows() && this.getNumCols() === otherMatrix.getNumCols()
  }

  multiply(scalar: number): Matrix
  multiply(otherMatrix: Matrix): Matrix
  multiply(operand: number | Matrix): Matrix {
    if (typeof operand === 'number') {
      return this.multiplyWithScalar(operand);
    } else {
      return this.multiplyWithMatrix(operand);
    }
  }

  multiplyWithScalar(scalar: number): Matrix {
    return this.map((n) => n * scalar);
  }

  // this may also be expressed as a multiplications of row vectors from this matrix with column vectors of otherMatrix
  multiplyWithMatrix(otherMatrix: Matrix): Matrix {
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

    return new Matrix(newMatrix);
  }

  getRow(rowIndex: number): Readonly<number[]> {
    return this.rows[rowIndex];
  }

  getNumRows() {
    return this.rows.length;
  }

  getNumCols() {
    return this.rows[0].length;
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

  canMultiply(other: Matrix): boolean {
    return this.rows[0].length === other.rows.length;
  }

  // getDeterminant() {
    
  // }

  // invert(): Matrix {

  // }

  map(transformer: (n: number) => number): Matrix {
    return new Matrix(this.rows.map((row) => row.map(transformer)));
  }

  toString() {
    return this.rows.map((row) => {
      return row.join('\t');
    }).join('\n');
  }

  print() {
    console.log(this.toString());
  }

}
