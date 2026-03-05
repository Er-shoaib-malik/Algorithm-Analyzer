export function mergesort(arr) {
  const animations = [];
  const a = [...arr];

  function merge(l, m, r) {
    let left = a.slice(l, m + 1);
    let right = a.slice(m + 1, r + 1);

    let i = 0;
    let j = 0;
    let k = l;

    while (i < left.length && j < right.length) {
      animations.push({
        type: "compare",
        indices: [l + i, m + 1 + j],
      });

      if (left[i] <= right[j]) {
        animations.push({
          type: "overwrite",
          index: k,
          value: left[i],
        });

        a[k] = left[i];
        i++;
      } else {
        animations.push({
          type: "overwrite",
          index: k,
          value: right[j],
        });

        a[k] = right[j];
        j++;
      }

      k++;
    }

    while (i < left.length) {
      animations.push({
        type: "overwrite",
        index: k,
        value: left[i],
      });

      a[k++] = left[i++];
    }

    while (j < right.length) {
      animations.push({
        type: "overwrite",
        index: k,
        value: right[j],
      });

      a[k++] = right[j++];
    }
  }

  function mergeSort(l, r) {
    if (l >= r) return;

    let m = Math.floor((l + r) / 2);

    mergeSort(l, m);
    mergeSort(m + 1, r);
    merge(l, m, r);
  }

  mergeSort(0, a.length - 1);

  return { animations };
}