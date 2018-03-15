function quicksort(arr) {
  if (!arr.length) {
    return [];
  }

  const [pivot, ...rest] = arr;

  return [
    ...quicksort(rest.filter(x => x < pivot)),
    pivot,
    ...quicksort(rest.filter(x => x >= pivot))
  ];
}