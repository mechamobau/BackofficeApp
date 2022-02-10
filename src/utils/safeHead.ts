function safeHead<T>(items: T[]) {
  return items[0] ?? null;
}

export default safeHead;
