import { Vector } from '../../src/ts-maths';

/**
 * Vector test
 */
describe('Vector', () => {

  const vector = new Vector([1, 2, 3]);

  describe('#constructor', () => {
    it('constructs vector', () =>  {
      const vector = new Vector([1, 2]);
      expect(vector.values).toEqual([1, 2]);
    });
  });

  describe('#map', () => {
    it('maps values in vector', () =>  {
      const vectorPlusOne = vector.map((x) => x + 1);
      expect(vectorPlusOne.values).toEqual([2, 3, 4]);
    });
  });

  describe('#multiplyWithScalar', () => {
    it('multiplies values in vector with scalar', () =>  {
      const doubledVector = vector.multiplyWithScalar(2);
      expect(doubledVector.values).toEqual([2, 4, 6]);
    });
  });

  describe('#dotProduct', () => {
    it('performs dot product between two vectors', () =>  {
      const dotProduct = vector.dotProduct(new Vector([2, 3, 4]));
      expect(dotProduct).toEqual(20);
    });
    it('throws an error if vectors are of different lengths', () =>  {
      try {
        vector.dotProduct(new Vector([2, 3]));
        fail('Should have thrown an error');
      } catch (error) {
        expect((error as Error).message).toEqual('Cannot do dot product between vectors of different lengths');
      }
    });
  });

});
