export const uniqueBy = <T>(
  array: Array<T>,
  uniqueByFn: (value: T) => unknown,
) => {
  const map = new Map(array.map((item) => [uniqueByFn(item), item]));
  const uniques = [...map.values()];

  return uniques;
};
