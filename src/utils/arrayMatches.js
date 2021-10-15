const arrayMatches = (arr1, arr2) => {
  if (
    [1, 2, 3].every((v) => arr1.includes(v)) ||
    [4, 5, 6].every((v) => arr1.includes(v)) ||
    [7, 8, 9].every((v) => arr1.includes(v)) ||
    [1, 4, 7].every((v) => arr1.includes(v)) ||
    [2, 5, 8].every((v) => arr1.includes(v)) ||
    [3, 6, 9].every((v) => arr1.includes(v)) ||
    [1, 5, 9].every((v) => arr1.includes(v)) ||
    [3, 5, 7].every((v) => arr1.includes(v))
  ) {
    return 1;
  } else if (
    [1, 2, 3].every((v) => arr2.includes(v)) ||
    [4, 5, 6].every((v) => arr2.includes(v)) ||
    [7, 8, 9].every((v) => arr2.includes(v)) ||
    [1, 4, 7].every((v) => arr2.includes(v)) ||
    [2, 5, 8].every((v) => arr2.includes(v)) ||
    [3, 6, 9].every((v) => arr2.includes(v)) ||
    [1, 5, 9].every((v) => arr2.includes(v)) ||
    [3, 5, 7].every((v) => arr2.includes(v))
  ) {
    return 2;
  } else {
    return 0;
  }
};

export default arrayMatches;
