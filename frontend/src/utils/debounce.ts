export function debounce<
  T extends // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (...args: any[]) => any,
>(func: T, wait: number) {
  let timeout: NodeJS.Timeout | null = null;

  const debouncedFunc = (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };

  debouncedFunc.cancel = () => {
    if (timeout) clearTimeout(timeout);
  };

  return debouncedFunc;
}
