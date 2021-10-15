const arrayMatches = (arr) =>
  [1, 2, 3].every((v) => arr.includes(v)) ||
  [4, 5, 6].every((v) => arr.includes(v)) ||
  [7, 8, 9].every((v) => arr.includes(v)) ||
  [1, 4, 7].every((v) => arr.includes(v)) ||
  [2, 5, 8].every((v) => arr.includes(v)) ||
  [3, 6, 9].every((v) => arr.includes(v)) ||
  [1, 5, 9].every((v) => arr.includes(v)) ||
  [3, 5, 7].every((v) => arr.includes(v));

export default arrayMatches;
