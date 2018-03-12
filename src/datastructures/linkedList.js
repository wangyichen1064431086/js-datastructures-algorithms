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
    let current;
    class LinkedList {

        append(element) {//从列表尾部添加元素
            const node = new Node(element);
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
    }

    return LinkedList;
})();