export function binarysearch(arr, target) {
  const animations = [];
  let comparisons = 0;

  const a = [...arr];

  let low = 0;
  let high = a.length - 1;

  while (low <= high) {
    animations.push({
      type: "range",
      low,
      high,
    });

    const mid = Math.floor(low + (high - low) / 2);

    animations.push({
      type: "mid",
      index: mid,
    });

    animations.push({
      type: "compare",
      index: mid,
    });

    comparisons++;

    if (a[mid] === target) {
      animations.push({
        type: "found",
        index: mid,
      });

      return { animations, comparisons };
    }

    if (target < a[mid]) {
      high = mid - 1;

      animations.push({
        type: "move-left",
        newHigh: high,
      });
    } else {
      low = mid + 1;

      animations.push({
        type: "move-right",
        newLow: low,
      });
    }
  }

  animations.push({
    type: "not-found",
  });

  return { animations, comparisons };
}
