import deepEqual from './deepEqual';

describe('deepEqual | function | unit test', () => {
  it('should return true when both object are deepely equal', () => {
    const object1 = {
      name: 'John Doe',
      age: 20,
    };
    const object2 = {
      name: 'John Doe',
      age: 20,
    };
    expect(deepEqual(object1, object2)).toBe(true);
  });

  it('should return false when objects have different number of properties', () => {
    const objectWithoutProperty = {};
    const objectWithJustOneProperty = {
      name: 'John Doe',
    };
    expect(deepEqual(objectWithoutProperty, objectWithJustOneProperty)).toBe(
      false,
    );
  });

  it('should return false when both object are deepely different', () => {
    let object1 = {
      property: {
        inside: 'value',
      },
    };
    let object2 = {
      property: {
        inside: false,
      },
    };

    expect(deepEqual(object1, object2)).toBe(false);
    expect(deepEqual(object2, object1)).toBe(false);

    var obj = {here: 2};
    expect(deepEqual(obj, {here: 1})).toBe(false);
    expect(deepEqual({here: 1}, obj)).toBe(false);
  });
});
