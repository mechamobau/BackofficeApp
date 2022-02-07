import findMissingNumbersInASequence from './findMissingNumbersInASequence';

describe('findMissingNumbersInASequence | function | unit test', () => {
  it('find multiple numbers in a sequence', () => {
    expect(findMissingNumbersInASequence([1, 2, 3, 5])).toStrictEqual([4, 6]);
    expect(findMissingNumbersInASequence([1, 2, 3, 6, 8])).toStrictEqual([
      4, 5, 7, 9,
    ]);
    expect(findMissingNumbersInASequence([1, 4])).toStrictEqual([2, 3, 5]);
  });
  it('find next number in a single item', () => {
    expect(findMissingNumbersInASequence([1])).toStrictEqual([2]);
    expect(findMissingNumbersInASequence([100])).toStrictEqual([101]);
  });
  it('returns empty array in the of a empty array is passed', () => {
    expect(findMissingNumbersInASequence([])).toStrictEqual([]);
  });
});
