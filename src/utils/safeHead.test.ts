import safeHead from './safeHead';

describe('safeHead | function | unit test', () => {
  it("should return 'null' when an empty array is passed", () => {
    expect(safeHead([])).toBe(null);
  });

  it('should return the first item when array contains at least one item', () => {
    expect(safeHead([1, 2, 3])).toBe(1);
    expect(safeHead([123])).toBe(123);
  });
});
