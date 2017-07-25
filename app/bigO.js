// O(n)
function reverse (arr) {
  for (let leftIdx = 0; leftIdx < arr.length / 2; leftIdx++) {
    const rightIdx = arr.length - 1 - leftIdx;
    const left = arr[leftIdx];
    const right = arr[rightIdx];
    arr[leftIdx] = right;
    arr[rightIdx] = left;
  }
  return arr;
}

//O(n * p)
function concatenate (arrA, arrB) {
  const merged = [];
  arrA.forEach(elemA => {
    merged.push(elemA);
  });
  arrB.forEach(elemB => {
    merged.push(elemB);
  });
  return merged;
}
