import { Matrix } from './matrix';

const matrix1 = new Matrix([
  [1, 2],
  [3, 4],
]);

const identity = new Matrix([
  [1, 0],
  [0, 1],
]);

const result = matrix1.multiply(identity);

console.log('result\n' + result.toString());

const matrix2 = new Matrix([
  [1],
  [2],
]);

const result2 = matrix1.multiply(matrix2);

console.log('result2\n' + result2.toString());

const result3 = matrix1.multiply(matrix1);

console.log('result3\n' + result3.toString());

const matrix3 = new Matrix([[2, 2], [2, 2]]);

const result4 = matrix1.add(matrix3);

console.log('result4\n' + result4);

const result5 = matrix2.transpose();

console.log('result5\n' + result5);
