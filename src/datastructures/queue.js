/*** 队列数据结构JavaScript实现 ****/
const Queue = (function() {
    const items = new WeakMap();

    class Queue {
        constructor() {
            items.set(this,[]);
        }
        enqueue() {
            const  q = items.get(this);
            q.push(...arguments);
        }
        dequeue() {
            const q = items.get(this);
            const r = q.shift();
            return r;
        }
        font() {
            const q = items.get(this);
            if(q.length>0) {
                return q[0];
            } else {
                return undefined;
            }
        }
        isEmpty() {
            const q = items.get(this);
            return q.length == 0;
        }
        size() {
            const q = items.get(this);
            return q.length;
        }
        print() {
            const q = items.get(this);
            console.log(q.toString());
        }
    }
    return Queue;
})();

const myQueue = new Queue();
console.log(myQueue.isEmpty());
myQueue.enqueue(1,2,3);
console.log(myQueue.isEmpty());
myQueue.print();
console.log(myQueue.size());
console.log(myQueue.font());
myQueue.dequeue();

/********栈数据结构应用********/
///优先队列

const PriorityQueue = (function() {
    const items = new WeakMap();

    class QueueElement {
        constructor (element, priority) {
            this.element = element;
            this.priority = priority;
        }
    }
    
    class PriorityQueue {
        constructor() {
            items.set(this,[]);
        }

        enqueue(element, priority) {//这个一次只进一个
            const  quequeElement = new QueueElement(element,priority);
            let added = false;
            const q = items.get(this);
            for(let i=0,len = q.length;i<len;i++) {
                if(quequeElement.priority > q[i].priority) {//原队列优先级从大到小排列，当待插入项从前往后找到比自己优先级小的那一项时，插入这一项的前面
                    q.splice(i,0,quequeElement);
                    added = true;
                    break;
                }
            }
            if (!added) {//没有找到优先级比自己小的项，自己是最小，直接加到最后面
                q.push(quequeElement);
            }
        }

        print() {
            console.log(items.get(this));
        }

    }

    return PriorityQueue;
})();
const myPriorityQueue = new PriorityQueue();
myPriorityQueue.enqueue('old',12);
myPriorityQueue.enqueue('young',4);
myPriorityQueue.enqueue('normal',8);
myPriorityQueue.print();

///循环队列——击鼓传花: P68 func hotPotato
function drumAndPass(playerList, num) {
    const playerQueue = new Queue();
    playerQueue.enqueue(...playerList);

    while(playerQueue.size()>1) {
        for (let i=0;i<num;i++) {
            playerQueue.enqueue(playerQueue.dequeue());//将队列的第一项弹出，并添加到最后一项
        }
        const eliminated = playerQueue.dequeue();
        console.log('Eliminate:',eliminated);
    }
    return playerQueue.dequeue();
}

console.log(drumAndPass(['Tom','Lulu','Eve','Lily','Ben'],7));

export default Queue;
