export function linearSearch(arr, target) {
  const animations = [];
  let comparisons = 0;

  for (let i = 0; i < arr.length; i++) {
    animations.push({
      type: "compare",
      index: i,
    });

    comparisons++;

    if (arr[i] === target) {
      animations.push({
        type: "found",
        index: i,
      });

      return { animations, comparisons };
    }
  }

  animations.push({
    type: "not-found",
  });

  return { animations, comparisons };
}