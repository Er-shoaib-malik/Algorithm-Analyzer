export function quicksort(arr) {
  const animations = [];
  const a = [...arr];

  function partition(l, h) {
    let pivot = a[l];
    let i = l + 1;
    let j = h;

    animations.push({ type: "pivot", index: l });

    while (true) {
      while (i <= h && a[i] < pivot) {
        animations.push({ type: "compare", indices: [i, l] });
        i++;
      }

      while (j >= l && a[j] > pivot) {
        animations.push({ type: "compare", indices: [j, l] });
        j--;
      }

      if (i >= j) break;

      animations.push({ type: "swap", indices: [i, j] });
      [a[i], a[j]] = [a[j], a[i]];
      i++;
      j--;
    }

    animations.push({ type: "swap", indices: [l, j] });
    [a[l], a[j]] = [a[j], a[l]];

    animations.push({ type: "sorted", index: j });

    return j;
  }

  function quicksort(l, h) {
    if (l < h) {
      let pi = partition(l, h);
      quicksort(l, pi - 1);
      quicksort(pi + 1, h);
    }
  }

  quicksort(0, a.length - 1);

  return { animations };
}