//最长公共子序列
/**********书上给出的动态规划方法*********/
function lcs(wordX, wordY) { //此算法和背包问题的算法knapSack非常相似
  const xLen = wordX.length;
  const yLen = wordY.length;

  const l = [];
  //创建矩阵l:
   //其有xLen+1行， 有yLen+1列
   //其中l[i][j]表示wordX的前i项，与wordY的前j项中最长公共子序列的长度

  const solution = [];//存储结果矩阵
  for (let i = 0; i <= xLen; i++) {
    l[i] = [];
    solution[i]=[];
    for (let j = 0; j <= yLen; j++) {
      l[i][j] = 0;
      solution[i][j] = '0';
    }
  }
  let n = 0;//记录找到了多少个相同项
  for (let i = 0; i <= xLen; i++) {
    for (let j = 0; j <= yLen; j++) {
      if (i === 0 || j === 0) {//如果wordX的第0项，wordY的第0项肯定是没有字符的，这里是按照wordX和wordY都是从第1项开始有值，即wordX[1-1]和wordY[1-1]
        l[i][j] = 0;
      } else if (wordX[i-1] === wordY[j-1]) {//如果wordX的第i项和wordY的第j项相同，那么wordX的前i项和wordY的前j项的最长公共子序列的长度 就可以在 wordX的前i-1项和wordY的前j-1项的最长公共子序列的长度 的基础上 加1。
        console.log(`n:${++n}`);
        console.log(`i:${wordX[i-1]}`);
        console.log(`j:${wordY[j-1]}`);
        l[i][j] = l[i-1][j-1] + 1;
        solution[i][j] = 'diagonal';//表示此处是wordX[i-1]和wordY[j-1]相同
        //注意：此处的值，即wordX[i-1]也即wordY[i-1]，可能并不一定是最长公共子串中应该新出现的值，因为公共子串中可能有重复出现的值

      } else { //如果wordX的第i项和wordY的第j项不相同，那么wordX的前i项与wordY的前j项的最长公共子序列的长度 肯定和如下两种情况的最长公共子序列中值大的一个相同：
        //(1)和 wordX的前i-1项与wordY的前j项的最长公共子序列
        //(2)和 wordX的前i项与wordY的前j-1项的最长公共子序列
        const a = l[i-1][j];
        const b = l[i][j-1];
        l[i][j] = a > b ? a : b;
        solution[i][j] = (a > b) ? 'top' : 'left';
        //为top表示：和 wordX的前i-1项 与 wordY的前j项的 最长公共子序列相同；
        //为left表示： 和 wordX的前i项 与 wordY的前i-1项的最长公共子序列相同
      }
    }
  }
  const solutionResult = getSolution(solution, l, wordX, wordY, xLen, yLen);
  console.log('l matrix:');
  console.log(l);
  console.log('solution matrix:');
  console.log(solution);
  return {
    len: l[xLen][yLen],
    solutionResult
  };
}

function getSolution(solution, l, wordX, wordY, xLen, yLen) {
  let answer = '';
  let i = xLen;
  let j = yLen;
  let valueOfSolution = solution[i][j];

  while(valueOfSolution !== '0') {
    if (solution[i][j] === 'diagonal') { //只认wordX[i]和wordY[j]相同的时候的值，此时值为wordX[i-1],也即为wordY[j-1]
      answer = wordX[i - 1] + answer;
      console.log(`i:${i}`);
      console.log(`j:${j}`);
      console.log(`wordX[i-1]:${wordX[i-1]}`);
      console.log(`wordY[j-1]:${wordY[j-1]}`);
      i--;
      j--;
    } else if (solution[i][j] === 'left') { //如果为'left'，那么表示值为'diagonal'的位置在其左边，即i不用变化，j需要递减
      j--;
    } else if (solution[i][j] === 'top') { //如果为'top',那么表示值为'diagonal'的位置在其上边，即j不用变化
      i--;
    }
    valueOfSolution = solution[i][j];
  }

  return answer;
}
// test
//console.log(lcs('abcadf', 'acbaed'));
console.log(lcs('xabcadf','xacbaed'));

/*******我自己修改后的更好理解的动态规划办法*****/
function lcsNew(wordX, wordY) {
  const xLen = wordX.length;
  const yLen = wordY.length;
  const l = [];

  const solution = [];//存储结果矩阵

  for (let i = 0; i < xLen; i++) { //矩阵长度只为xLen就好，不必把wordX第0项和wordY第0项认为为没有值，而是直接把wordX[0]、wordY[0]作为各自的第0项

    l[i]=[]; //只初始化一维就好，第二维可以直接添加
    solution[i]=[];
  }

  for (let i = 0; i < xLen; i++) {
    for (let j = 0; j < yLen; j++) {
      if (wordX[i] === wordY[j]) {
        if (i === 0 || j === 0) {
          l[i][j] = 1;
        } else {
          l[i][j] = l[i-1][j-1] + 1;
        }
        solution[i][j] = 'diagonal';
        //只有i、j都变化了
      } else {
        if (i === 0 && j === 0) {
          l[i][j] = 0;
          solution[i][j] = '0';
        } else if (i === 0) {
          l[i][j] = l[0][j-1];
          solution[i][j] = 'left';
        } else if (j === 0) {
          l[i][j] = l[i-1][j]; 
          solution[i][j] = 'top';
        } //从以上对i，j为0的情况的考虑还是有点复杂的，这也是为什么书里推荐把wordX[0]、wordY[0]作为矩阵行和列中的第1项而不是第0项
          else {
          const newiUseless = l[i-1][j];
          const newjUseless = l[i][j-1];
          l[i][j] = newiUseless > newjUseless ? newiUseless : newjUseless;
          solution[i][j] = newiUseless > newjUseless ? 'top' : 'left';
        }
      }
    }
  }
  console.log('l matrix:');
  console.log(l);
  console.log('solution matrix:');
  console.log(solution);
  return l[xLen-1][yLen-1];
}
// test:
console.log(`lcsNew:${lcsNew('acbaed', 'abcadf')}`);
console.log(`lcsNew:${lcsNew('xabcadf','xacbaed')}`);

/*******我自己的非矩阵思想的方法:待思考******* */

function lcsMy(wordX, wordY) {
  const xLen = wordX.length;
  const yLen = wordY.length;
  let lcsLen = 0;
  for (let i = 0; i < xLen; i++) {
    for (let j = 0; j < yLen; j++) {
      if (wordX[i] === wordY[j]) {
        //两个的子串分别从第i,和第j开始计算
        let l = 0;
        let subi = i;
        let subj = j;
        
        while(subi < xLen) {
          while(subj < yLen) {
            if (wordX[subi] === wordY[subj]) {
              l++;
              subi++;
              subj++;
            } else {
              subj++;
            }
          }
          subi++
        }        
        console.log(`l:${l}`);
        if (l > lcsLen) {
          lcsLen = l;
        }
        
      }
      
    }
  }
  return lcsLen;
}

console.log(`lcsMy:${lcsMy('xabcadf','xacbaed')}`)
export default lcs;