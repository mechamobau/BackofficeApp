function findMissingNumbersInASequence(numbers: number[]): number[] {
  if (numbers.length <= 0) {
    return numbers;
  }

  const [first = 0, second] = numbers;

  if (!second) {
    return [first + 1];
  }

  const missing: number[] = [];

  const last = numbers[numbers.length - 1];

  for (let i = first as number; i <= (last as number) + 1; i = i + 1) {
    if (numbers.indexOf(i) === -1) {
      missing.push(i);
    }
  }

  return missing;
}

export default findMissingNumbersInASequence;
