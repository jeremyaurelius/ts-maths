export class Vector {
  constructor(
    readonly values: Readonly<number[]>,
  ) {}

  map(transformer: (value: number) => number) {
    return new Vector(this.values.map(transformer));
  }

  multiplyWithScalar(scalar: number) {
    return this.map((value) => value * scalar);
  }

  canDoDotProduct(otherVector: Vector): boolean {
    return this.values.length === otherVector.values.length;
  }

  dotProduct(otherVector: Vector): number {
    if (!this.canDoDotProduct(otherVector)) {
      throw new Error("Cannot do dot product between vectors of different lengths");
    }
    const otherValues = otherVector.values;
    return this.values.reduce((accumulator, number, index) => {
      const otherNumber = otherValues[index];
      return accumulator + (number * otherNumber);
    }, 0);
  }

}
