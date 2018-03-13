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

            if (position == 0) { //需要单独考虑移除head节点的情况
                head = head.next;
            } else {
                let i = 1;
                let current = head;
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

        insertAt(position, element) {
            const node = new Node(element);
            if (position <0 || position>length) {
                return false; //插入失败
            }

            if (position == 0) {//先考虑添加到头部的情况
                node.next = head;
                head = node;
            } else {
                let current = head;
                let i=1;
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
                string += `${current.element}${current.next? '→' : ''}`
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