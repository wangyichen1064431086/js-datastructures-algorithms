//贪心算法：解决最少找零问题
function MinCoinChange(coins) {
  
  this.makeChange = function(mount) {
    const change = [];
    let total = 0;
    for (let i = coins.length; i >= 0; i--) {
      const coin = coins[i];
      while(total + coin <= mount) {
        change.push(coin);
        total += coin;
      }
    }
    return change;
  }
}

//test
const minCoinChange = new MinCoinChange([1, 5, 10, 25]);

console.log(minCoinChange.makeChange(36));//[25,10,1]


export default MinCoinChange;