//动态规划

///动态规划 与 分而治之 的区别:
  /// 分而治之：把问题分解成相互独立的子问题
  /// 动态规划： 将问题分解成相互依赖的子问题


// 1. 最少硬币找零问题
/**
 * @description
 * @param {Array} coins :可能的硬币面额数值组成的数组
 */
function MinCoinChange(coins) {
  const cache = {};

  /**
   * 
   * @param {Number} amount :找零的总钱数
   */
  this.makeChange = function(amount) {
    console.log('makeChange');
    if (amount <= 0) {
      return [];
    }
    if (cache[amount]) {
      return cache[amount];
    }

    let min = [];
    let newMin = [];
    for (let i=0, len = coins.length; i < len; i++) {
      console.log(`Start to try coin value:${coins[i]}`);
      const coin = coins[i];
      const newAmount = amount - coin;
      if (newAmount >= 0 ) { //对剩下的钱再进行找零计算
        newMin = this.makeChange(newAmount); // *1.
      }
      if (//如果:
        newAmount >= 0 && //剩下的钱是大于等于0的
        (newMin.length < min.length - 1 || !min.length) &&//( (对剩下的钱进行新的找零运算后需要的硬币数) 小于 (按照现有运算后需要的硬币数 -1 ) )或者 ( 现有运算后需要的硬币数还是0——即还没开始进行运算)
        (newMin.length || !newAmount) //对剩下的钱进行新的找零运算后需要的硬币数是大于0的，且 该剩下的钱不为0
      ) {
        min = [coin].concat(newMin);//该找零方法就是一个coin面额的硬币 与 剩余钱的找零方法的硬币面额数组，连成的完整数组
        console.log( ` new min array: ${min}  for ${amount}`);
      }
    }

    return (cache[amount] = min) ;
  }

}

// Test:

const myMinCoinChange = new MinCoinChange([1,3,4]);

console.log(myMinCoinChange.makeChange(6));
export default MinCoinChange;

//执行说明
/**
 * *1.首先,递归了37次.每次都是进入for循环后i=0,coin=1,newAmount每次减少1，最后到地36次递归中newAmount为0，最后再递归一次，得到newMin=[]
 */