function deepEqual(a: any, b: any) {
  const isObjectA = typeof a === 'object' && a != null;

  const isObjectB = typeof b === 'object' && b != null;

  const isNotObjects = !(isObjectA && isObjectB);

  if (isNotObjects) {
    return a === b;
  }

  let count = [Object.entries(a).length, Object.entries(b).length];

  if (count[0] - count[1] !== 0) {
    return false;
  }

  for (let key in a) {
    if (!(key in b) || !deepEqual(a[key], b[key])) {
      return false;
    }
  }

  for (let key in b) {
    if (!(key in a) || !deepEqual(b[key], a[key])) {
      return false;
    }
  }

  return true;
}

export default deepEqual;
