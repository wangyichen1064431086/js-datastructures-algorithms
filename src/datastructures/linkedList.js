/***链表数据结构实现***/
const LinkedList = (function() {
    class Node {
        constructor(element) {
            this.element = element;
            this.next = null;
        }
    }

    let length = 0;
    let head = null;
    

    class LinkedList {

        append(element) {//从列表尾部添加元素
            const node = new Node(element);
            let current;

            if(head == null) {
                head = node;
            } else {
                current = head;
                while(current.next) {
                    current = current.next;
                }
                current.next = node;
            }
            length++;
        }

        removeAt(position) {
            if (position<0 || position>= length) {
                return null
            }

            let current;
            if (position == 0) { //需要单独考虑移除head节点的情况
                head = head.next;
            } else {
                let i = 0;
                current = head;
                let previous;
                while(i<position) {//i遍历到要移除的位置的前面一个，即i==position-1时是最后一次循环
                    previous = current;//第一次循环，就是i=1时，current为head,即previous为位置i-1的节点
                    current = current.next;//current为位置i的阶段
                    i++;
                }//循环结束后，i = position, previous为i=position-1位置的node,current为 position位置的node,此时current正是要移除的node
                previous.next = current.next;
            }
            length--;
            return current.element;
        }

        insert(position, element) {
            const node = new Node(element);
            if (position <0 || position>length) {
                return false; //插入失败
            }

            if (position == 0) {//先考虑添加到头部的情况
                node.next = head;
                head = node;
            } else {
                let current = head;
                let i=0;
                let previous;
                while(i<position) {
                    previous = current;
                    current = current.next;//每次循环执行此句后，previous更新为位置i-1的node, current更新为位置i的node。
                    i++;
                }//循环结束后，i==position, current为此位置的节点，那么就需要用node替换此位置的node。
                
                previous.next = node;
                node.next = current;//若position==length，那么循环结束后，current为null,previous为最后一个节点，那么node.next = null,逻辑依然是适用的。

            }
            length++;
            return true;//插入成功
        }

        toString() {
            let string = '';
            let current = head;
            while(current) {
                string += `${current.element}${current.next? '→' : ''}`;
                current = current.next;
            }
            return string;
        }

        indexOf(element) {
            let current = head;
            let index = 0;
            while(current) {
                if(current.element == element) {
                    return index;
                } else {
                    current = current.next;
                    index++;
                }
            }//如果一直没有跳出循环，直到current为null了，那么就返回-1
            return -1;
        }
        remove(element) {
            const removedPosition = this.indexOf(element);
            return this.removeAt(removedPosition);
        }

        isEmpty() {
            return length === 0;
        }

        size() {
            return length;
        }

        getHead() {
            return head;
        }
    }

    return LinkedList;
})();



let myLinkedList = new LinkedList();
myLinkedList.append(1);
myLinkedList.append(2);
console.log(myLinkedList.toString());
myLinkedList.insert(1,3);
console.log(myLinkedList.toString());
myLinkedList.removeAt(2);
console.log(myLinkedList.toString());
console.log(myLinkedList.size());
myLinkedList.insert(0,8);
console.log(myLinkedList.toString());
console.log(myLinkedList.remove(1));
console.log(myLinkedList.toString());
console.log(myLinkedList.isEmpty());
console.log(myLinkedList.getHead());
myLinkedList.append('lalala');
myLinkedList.insert(2, 'Tom');
console.log(myLinkedList.toString());
console.log(myLinkedList.indexOf('Tom'));

/*****双向链表数据结构实现****/
const DoublyLinkedList = (function() {
    class Node {
        constructor(element) {
            this.element = element;
            this.prev = null;
            this.next = null;
        }
    }

    let length = 0;
    let head = null;
    let tail = null;

    class DoublyLinkedList {
        append(element) {
            const node = new Node(element);
            if (!head) {
                head = node;
                tail = node;
            } else {
                tail.next = node;
                node.prev = tail;
                tail = node;
            }
            length++;
        }
        insert(position, element) {
            if (position < 0 || position > length) {
                return false;
            }
            const node = new Node(element);
            let current;
            if (position === 0) {
                if(!head) {//NOTE:该情况遗漏掉！！！
                    head = node;
                    tail = node;
                } else {
                    current = head;
                    node.next = current;
                    current.prev = node;//NOTE:易漏！
                    head = node;//NOTE：这三句中的后两句交换位置效果是相等的，因为js的obj是引用类型，let a=b,b.x=1,那么a.x也=1
                }
               
            } else if (position === length) {
                current = tail;
                node.prev = current;
                current.next = node;//NOTE:易漏！
                tail = node;
            } else {
                let i;
                let previous;
                if (position<=length/2) {//从头部开始迭代
                    current = head;
                    i = 0;
                    while(i<position) {
                        previous = current;
                        current = current.next;
                        i++;
                    }
                    previous.next = node;
                    node.next = current;
    
                    node.prev = previous;
                    current.prev = node;
                } else {//这时，从尾部开始迭代，迭代次数更少
                    current = tail;
                    i = length-1;
                    while(i>position-1) {
                        previous = current;
                        current = current.prev;
                        i--;
                    }//注意，最后previous指向position,current指向position-1
                    current.next = node;
                    node.next = previous;

                    previous.prev = node;
                    node.prev = current;

                }
   

            }
            length++;
            return true;
        }

        removeAt(position) {
            if (position<0 || position>=length) {
                return null;
            }
            let current;
            if (position === 0) {
                current = head;
                if(head === tail) {
                    head = null;
                    tail = null;
                } else {
                    head = head.next;
                    head.prev = null;
                }
            } else if (position === length) {
                current = tail;
                tail = tail.prev;
                tail.next = null;
            } else {
                if (position<length/2) {
                    let previous;
                    current = head;
                    let i = 0;
                    while(i<position) {
                        previous = current;
                        current = current.next;
                        i++;
                    }
                    previous.next = current.next;
                    current.next.prev = previous;
                } else {
                    let nextnode;
                    let i = length-1;
                    current = tail;

                    while(i > position) {
                        nextnode = current;
                        current = current.prev;
                        i--;
                    }
                    nextnode.prev = current.prev;
                    current.prev.next = nextnode;
                }
                
            }
            length--;
            return current.element;
        }

        toString() {
            let str = '';
            let current = head;
            while(current) {
                str += current.prev ? '<-' : '';
                str += current.element;
                str += current.next ? '->' : '';
                current = current.next;
            }
            return str;
        }

        indexOf(element) {
            let index = 0;
            let current = head;
            while(current) {
                if (current.element === element) {
                    return index;
                } else {
                    index++ ;
                    current = current.next;
                }
            }
            return -1;
        }

        remove(element) {
            const position = this.indexOf(element);
            return this.removeAt(position);
        }
        
        size() {
            return length;
        }
        getHead() {
            return head;
        }
        getTail() {
            return tail;
        }
    }
    return DoublyLinkedList;
})();

export default LinkedList;

const myDoublyLinkedList = new DoublyLinkedList();
myDoublyLinkedList.append(1);
myDoublyLinkedList.append(3);
console.log(myDoublyLinkedList.toString());
myDoublyLinkedList.insert(1, 2);
myDoublyLinkedList.insert(2, 4);
console.log(myDoublyLinkedList.toString());console.log(myDoublyLinkedList.removeAt(2));
myDoublyLinkedList.remove(1);
console.log(myDoublyLinkedList.toString());
console.log(myDoublyLinkedList.getHead());
console.log(myDoublyLinkedList.getTail());
console.log(myDoublyLinkedList.size());
//TODO: move to test file

/*****双向循环链表数据结构实现****/
//循环链表分为单向循环链表和双向循环链表
const DoublyCircleLinkedList = (function() {
    class Node {
        constructor(element) {
            this.element = element;
            this.prev = null;
            this.next = null;
        }
    }

    let length = 0;
    let head = null;
    let tail = null;
    
    class DoublyCircleLinkedList {
        append(element) {
            const node = new Node(element);
            if (!head) {
                head = node;
                tail = node;
            } else {
                tail.next = node;
                node.prev = tail;
                tail = node;
                
            }
            tail.next = head;
            head.prev = tail;
            length++;
        }
        insert(position, element) {
            if (position < 0 || position > length) {
                return false;
            }
            const node = new Node(element);
            let current;
            if (position === 0) {
                if(!head) {//NOTE:该情况遗漏掉！！！
                    head = node;
                    tail = node;
                    
                } else {
                    current = head;
                    node.next = current;
                    current.prev = node;//NOTE:易漏！
                    head = node;//NOTE：这三句中的后两句交换位置效果是相等的，因为js的obj是引用类型，let a=b,b.x=1,那么a.x也=1
                }
               
            } else if (position === length) {
                current = tail;
                node.prev = current;
                current.next = node;//NOTE:易漏！
                tail = node;
            } else {
                let i;
                let previous;
                if (position<=length/2) {//从头部开始迭代
                    current = head;
                    i = 0;
                    while(i<position) {
                        previous = current;
                        current = current.next;
                        i++;
                    }
                    previous.next = node;
                    node.next = current;
    
                    node.prev = previous;
                    current.prev = node;
                } else {//这时，从尾部开始迭代，迭代次数更少
                    current = tail;
                    i = length-1;
                    while(i>position-1) {
                        previous = current;
                        current = current.prev;
                        i--;
                    }//注意，最后previous指向position,current指向position-1
                    current.next = node;
                    node.next = previous;

                    previous.prev = node;
                    node.prev = current;

                }
   

            }
            tail.next = head;
            head.prev = tail;
            length++;
            return true;
        }

        removeAt(position) {
            if (position<0 || position>=length) {
                return null;
            }
            let current;
            if (position === 0) {
                current = head;
                if(head === tail) {
                    head = null;
                    tail = null;
                } else {
                    head = head.next;
                    head.prev = tail;
                    tail.next = head;
                }
            } else if (position === length) {
                current = tail;
                tail = tail.prev;
                tail.next = head;
                head.prev = tail;
            } else {
                if (position<length/2) {
                    let previous;
                    current = head;
                    let i = 0;
                    while(i<position) {
                        previous = current;
                        current = current.next;
                        i++;
                    }
                    previous.next = current.next;
                    current.next.prev = previous;
                } else {
                    let nextnode;
                    let i = length-1;
                    current = tail;

                    while(i > position) {
                        nextnode = current;
                        current = current.prev;
                        i--;
                    }
                    nextnode.prev = current.prev;
                    current.prev.next = nextnode;
                }
                
            }
            length--;
            return current.element;
        }

        toString() {
            let str = '';
            let current = head;
            
            while(current) {
                str += current.prev ? '<-' : '';
                str += current.element;
                str += current.next ? '->' : '';
                current = current.next;
                if(current === head) {//MARK:记得跳出，否则无限循环
                    break;
                }
            }
            return str;
        }

        indexOf(element) {
            let index = 0;
            let current = head;
            while(current) {
                if (current.element === element) {
                    return index;
                } else {
                    index++ ;
                    current = current.next;
                    if(current === head) {//MARK:记得跳出，否则无限循环
                        break;
                    }
                }
                
            }
            return -1;
        }

        remove(element) {
            const position = this.indexOf(element);
            return this.removeAt(position);
        }
        
        size() {
            return length;
        }
        getHead() {
            return head;
        }
        getTail() {
            return tail;
        }
    }
    return DoublyCircleLinkedList;
})();
const myDoublyCircleLinkedList = new DoublyCircleLinkedList();
myDoublyCircleLinkedList.append(1);
myDoublyCircleLinkedList.append(3);
console.log(myDoublyCircleLinkedList.toString());
myDoublyCircleLinkedList.insert(1, 2);
myDoublyCircleLinkedList.insert(2, 4);
console.log(myDoublyCircleLinkedList.toString());
console.log(myDoublyCircleLinkedList.removeAt(2));
myDoublyCircleLinkedList.remove(1);
console.log(myDoublyCircleLinkedList.toString());
console.log(myDoublyCircleLinkedList.getHead());
console.log(myDoublyCircleLinkedList.getTail());
console.log(myDoublyCircleLinkedList.size());
console.log(myDoublyCircleLinkedList.removeAt(0));
console.log(myDoublyCircleLinkedList.removeAt(0));
myDoublyCircleLinkedList.insert(0,1);
console.log(myDoublyCircleLinkedList.toString());
