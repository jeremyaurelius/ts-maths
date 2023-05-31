import { Matrix } from './matrix';

const matrix2x2 = new Matrix([
  [1, 2],
  [3, 4],
]);

const identity2x2 = new Matrix([
  [1, 0],
  [0, 1],
]);

matrix2x2.multiply(identity2x2)
  .log('result1');

const columnMatrix2x1 = new Matrix([
  [1],
  [2],
]);

matrix2x2.multiply(columnMatrix2x1)
  .log('result2');

matrix2x2.multiply(matrix2x2)
  .log('result3');

columnMatrix2x1.transpose()
  .log('result4');

(function() {
  const matrix = Matrix.from(
    [3, 0, 2],
    [2, 0, -2],
    [0, 1, 1],
  );
  matrix.invert()
    .log('inverse');
})();

