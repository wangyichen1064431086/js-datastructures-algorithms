/*** 栈数据结构JavaScript实现 ****/
const Stack = (function() {
    const items = new WeakMap();

    class Stack {
        constructor () {
            items.set(this, []);
        }
        push() {
            let s = items.get(this);
            s.push(...arguments);
        }
        pop() {
            let s = items.get(this);
            let r = s.pop();
            return r;
        }
        peek() {//返回栈顶元素
            let s = items.get(this);
            return s[s.length-1];
        }
        clear() {
            items.set(this,[]);
        }
        size() {
            let s = items.get(this);
            return s.length;
        }
        isEmpty() {
            let s = items.get(this);
            return s.length == 0;
        }
        print() {
            let s = items.get(this);
            console.log(s.toString());

        }
    }
    return Stack;
}) ();

const myStack = new Stack();
myStack.push(1,2,3);
myStack.print();
myStack.pop();
myStack.print();

/********栈数据结构应用********/
///1.进制转换问题
/**
 * 将10进制数据转换为二进制数
 * @param {Number} decNum 10进制数据
 */
function transformDToB(decNum) { 
    let binaryStr= '';
    const remStack = new Stack();
    while (decNum>0) {
        const rem = decNum % 2;
        remStack.push(rem);
        decNum = Math.floor(decNum/2);
    }
    while (!remStack.isEmpty()) {
        const binary = remStack.pop();
        binaryStr += binary;
    }
    return binaryStr;
}
console.log(transformDToB(10));

/**
 * 将10进制数据转换成任意进制数据
 * @param {Number} decNum 要转换的数
 * @param {Number} base 要转换的进制基数
 */
function transformDToAny (decNum, base) {
    let resultStr = '';
    const remStack = new Stack();
    const digitsList = '0123456789ABCDE';

    while(decNum > 0) {
        const rem = digitsList[decNum % base];
        remStack.push(rem);
        decNum = Math.floor(decNum / base);
    }
    while(!remStack.isEmpty()) {
        resultStr += remStack.pop()
    }
    return resultStr;
}

console.log(transformDToAny(10,16));
console.log(transformDToAny(10,2));
console.log(transformDToAny(100,16));

/// 2.平衡圆括号问题
// TODO：参见示例代码

/// 3. 汉诺塔问题
// TODO：参见示例代码

export default Stack;