/**
 * 
 * @param {Number} capacity  背包能装入的最大重量
 * @param {Array} weights 若干种物品的单件重量
 * @param {Array} values 这些物品分别对应的单件价值
 * @param {Number} n 物品种类数量，也即weights.length,也即values.length
 */
function knapSack(capacity, weights, values, n) {
  const kS=[];
  for (let i=0; i<=n; i++) {
    kS[i]=[];
  }

  for (let i=0; i<=n; i++) {
    for (let w=0; w<=capacity;w++) {
      console.log(`i:${i}`);
      console.log(`w:${w}`);
      if (i==0 || w==0) {
        console.log('branch 0');
        kS[i][w] = 0;
        console.log(`kS[${i}][${w}]=${kS[i][w]}`);
      } else if (weights[i-1] <= w) {
        console.log('branch 1');

        const a = values[i-1] + kS[i-1][w-weights[i-1]];//第i个物品质量为weights[i-1], 价值为values[i-1]       
        console.log(`a=values[${i-1}]+kS[${i-1}][${w-weights[i-1]}]=${values[i-1]}+${kS[i-1][w-weights[i-1]]}=${a}`);

        const b = kS[i-1][w];
        console.log(`b=kS[${i-1}][${w}]=${b}`);

        kS[i][w] = a > b ? a : b;
        console.log(`kS[${i}][${w}]=${kS[i][w]}`);
      } else {
        console.log('branch 2');
        kS[i][w] = kS[i-1][w];
        console.log(`kS[${i}][${w}]=kS[${i-1}][${w}]=${kS[i][w]}`)
      }
    }
  }
  return kS[n][capacity];
}

//Test
knapSack(5, [2, 3, 4], [3, 4, 5],3);

let maxValue=0;
let obj={
  x:0,
  y:0,
  z:0
}
for (let x=0; x<=2;x++) {
  for (let y=0; y<=1; y++) {
    for (let z=0; z<=1; z++) {
      if( (2*x+3*y+4*z)<=5) {
        const newWeight = 3*x + 4*y + 5*z;
        if (newWeight>maxValue) {
          maxValue = newWeight;
          obj={
            x,
            y,
            z
          }
        }
      }
    }
  }
}
console.log(maxValue);
console.log(obj);
export default knapSack;