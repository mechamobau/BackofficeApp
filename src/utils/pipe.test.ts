import pipe from './pipe';

describe('pipe | function | unit test', () => {
  it('pipe is a function', () => {
    expect(typeof pipe).toBe('function');
  });

  it('pipe compose functions in LTR direction', () => {
    const add = (x: number) => (y: number) => y + x;
    const subtract = (x: number) => (y: number) => y - x;
    const multiply = (x: number) => (y: number) => y * x;
    const divide = (x: number) => (y: number) => y / x;

    const calc = pipe(add(5), subtract(2), multiply(3), divide(2));

    expect(calc(2)).toBe(7.5);
    expect(calc(2)).not.toBe(6);
  });

  it("pipe's first function can handle more than one argument", () => {
    const getNames = (name: string, wordsToBeIgnored: string[] = []) =>
      name.split(' ').filter(word => wordsToBeIgnored.indexOf(word) === -1);

    const formatToInitials = pipe(
      getNames,
      names => names.map(name => name.charAt(0)),
      initials => initials.join('').toUpperCase(),
    );

    expect(formatToInitials('Jairo de Almeida Machado', ['de'])).toBe('JAM');
  });
});
