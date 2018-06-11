//背包问题

/*****书上给出的动态规划方法****/
/**
 * 
 * @param {Number} capacity  背包能装入的最大重量
 * @param {Array} weights 若干种物品的单件重量
 * @param {Array} values 这些物品分别对应的单件价值
 * @param {Number} n 物品种类数量，也即weights.length,也即values.length
 */
function knapSack(capacity, weights, values, n) {
  const kS=[];
  // 创建矩阵kS：
    //其有(i+1)行，有(w+1)列;
    //矩阵中的每个值，即kS[i][w]， 表示可能包含的最大价值物品为物品i、可能的最大总质量为w的组合方案的最大总价值

  for (let i=0; i<=n; i++) {
    kS[i]=[];
  }

  for (let i=0; i<=n; i++) { 
    //i是每种组合可能包含的最大价值物品品种：
      //分别遍历考虑可能包含的最大价值物品为物品i的组合:可能包含的最大价值物品为物品物品0的组合、可能包含的最大价值物品为物品1的组合...可能包含的最大价值物品为物品n的组合；
      //可能包含的最大价值物品为物品i的组合的意思是，该组合可能包含物品0、物品1...物品i，从物品0到物品i的每种物品都可能包含也可能不包含，但一定不包含物品i+1、物品i+2...

    for (let w=0; w<=capacity;w++) { 
      //w是可能包含的最大价值物品为物品i的组合的不同的可能的最大总质量:
        //对于可能包含的最大价值物品为物品i的组合，再分别遍历考虑可能的最大总质量为w的组合：可能的最大总质量为0的组合、可能的最大总质量为1的组合...可能的最大总质量为capacity的组合;
        //可能的最大总质量为w的组合的意思是，该组合的总质量可能是0～w中的任意质量，但总质量不可能为w+1、w+2...
      
      console.log(`i:${i}`);
      console.log(`w:${w}`);

      if (i===0 || w===0) {
        //如果该组合可能包含的最大价值物品为物品0，或者该组合可能的最大总质量为0，那么总价值始终为0，即对应矩阵中的位置kS[i][w]为0：
          //因为如果组合可能包含的最大价值为物品0，由于物品0不存在，那么总价值当然也为0；
          //又因为如果组合可能的最大总质量为0，那么总价值肯定当然也为0。
        console.log('branch 0');
        kS[i][w] = 0;
        console.log(`kS[${i}][${w}]=${kS[i][w]}`);

      } //如果该组合可能包含的最大价值物品不是物品0，且可能的最大总质量也不为0，那么总价值肯定是有值的，即对应矩阵中的位置kS[i][w]也肯定不为0:
        //这种情况又分为两种情况：

        /// 1. 当物品i的质量小于等于可能的最大总质量w，那么可以考虑在该组合中包含物品i：
        else if (weights[i-1] <= w) { 
        console.log('branch 1');

        ///在这种情况下又有两种物品组合方式:

        ///方式1：组合中包含了物品i： 
          /// 物品i就是该组合中价值最大的物品; 
          /// 该组合的价值就包括了两部分:
            //// (1)物品i的价值: values[i-1]
            //// (2)可能包含的最大价值物品为物品i-1的组合 的 最大价值： 可能包含的最大价值物品为物品i-1的组合的价值最的的时候可能的最大总质量也最大，即可能的最大总质量为(w-物品i的质量)，即 (w-weights[i-1])；此组合可能包含的最大价值物品为物品i-1,此组合可能的最大总质量为 w-weights[i-1];此组合的价值在矩阵中对应的就是kS[i-1][w-weights[i-1]]
        const a = values[i-1] + kS[i-1][w-weights[i-1]];
      
        
        console.log(`a=values[${i-1}]+kS[${i-1}][${w-weights[i-1]}]=${values[i-1]}+${kS[i-1][w-weights[i-1]]}=${a}`);

        ///方式2：组合中不包含物品i:
          ///该组合的价值就等于 可能包含的最大价值物品为物品i-1、可能的最大总质量为w的组合；此组合的价值在矩阵中对应的就是 kS[i-1][w]
        const b = kS[i-1][w];
        console.log(`b=kS[${i-1}][${w}]=${b}`);
        
        ///比较组合方式1和2哪一种的总价值更大，那么最大的那个价值就可以给kS[i][w]赋值
        kS[i][w] = a > b ? a : b;
        console.log(`kS[${i}][${w}]=${kS[i][w]}`);

        
      }
        /// 2.当物品i的质量大于可能的最大总质量，那么在该组合中就不能包含物品i，那么该组合可能包含的最大价值物品就是物品i-1
        else {
        console.log('branch 2');
        kS[i][w] = kS[i-1][w];///当方案中不包括物品i时，那么方案就为可能包含的最大机制物品为(物品i-1)时的方案，该方案的总价值就为 可能包含的最大价值物品为(物品i-1)、且总质量为w的方案的总价值， 即在矩阵中的对应值kS[i-1][w]

        console.log(`kS[${i}][${w}]=kS[${i-1}][${w}]=${kS[i][w]}`)
      }
    }
  }
  return kS[n][capacity];
}

//Test
knapSack(5, [2, 3, 4], [3, 4, 5],3);


/********我自己的方法：********/
//NOTE:有点问题，这种解决办法是对于同一种物品可以放入多次，但背包问题是同一种东西最多只能放入一次
function myKnapSack(capacity, weights, values) {
  let maxValue = 0;
  let eachNumObj;
  const xWeight = weights[0];
  const yWeight = weights[1];
  const zWeight = weights[2];
  const xValue = values[0];
  const yValue = values[1];
  const zValue = values[2];
  const xMaxNum = Math.floor(capacity/xWeight);
  const yMaxNum = Math.floor(capacity/yWeight);
  const zMaxNum = Math.floor(capacity/zWeight);
  for (let xNum = 0; xNum <= xMaxNum; xNum++) {
    for (let yNum = 0; yNum <= yMaxNum; yNum++) {
      for (let zNum = 0; zNum <= zMaxNum; zNum++) {
        if ((xNum * xWeight + yNum * yWeight + zNum * zWeight) <= capacity) {
          const sumValue = xNum * xValue + yNum * yValue + zNum * zValue;
          if (sumValue > maxValue) {
            maxValue = sumValue;
            eachNumObj = {
              xNum,
              yNum,
              zNum
            }
          }
        }
      }
    }
  }

  return {
    maxValue,
    eachNumObj
  }
}

//Test
console.log(myKnapSack(5, [2, 3, 4], [3, 4, 5]));
/*
  {
    eachNumObj:{xNum: 1, yNum: 1, zNum: 0},
    maxValue:7
  }
*/

export default knapSack;