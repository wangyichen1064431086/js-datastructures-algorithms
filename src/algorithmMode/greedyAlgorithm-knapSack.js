//贪心算法：解决分数背包问题
function knapSack(capacity, values, weights) {
  const n = values.length;
  let load = 0;
  let val = 0;

  for (let i = 0; i < n && load < capacity; i++) {
    if(weights[i] <= capacity-load) {
      val += values[i];
      load += weights[i];
    } else {
      const r = (capacity - load) / weights[i];
      val += r * values[i];
      load += r * weights[i]
    }
  }

  return val;
}

console.log(knapSack(6, [3, 4, 5], [2, 3, 4]));

//贪心算法：解决01背包问题
function knapSack01(capacity, values, weights) {
  const n = values.length;
  let load = 0;
  let val = 0;

  for (let i = 0; i < n && load < capacity; i++) {
    if(weights[i] <= capacity-load) {
      val += values[i];
      load += weights[i];
    } 
  }

  return val;
}
console.log(knapSack01(6, [3, 4, 5], [2, 3, 4])); //7,该计算结果不对，贪心算法不能解决01背包问题，01背包问题还是需要动态规划解决

export default knapSack;