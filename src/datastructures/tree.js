/******************二叉搜索树的js实现***************/
function BinarySearchTree() {
    const Node = function(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    };
    let root = null;

    
    
    this.insert = function(key) {
        const newNode = new Node(key);
        const insertNode = function(node, newNode) {
            if (newNode.key < node.key) {
                if (node.left === null) {
                    node.left = newNode;
                } else {
                    insertNode(node.left, newNode);
                }
            } else {
                if (node.right === null) {
                    node.right = newNode;
                } else {
                    insertNode(node.right, newNode);
                }
            }
        }
        if (root === null) {
            root = newNode;
        } else {
            insertNode(root, newNode);
        }
    };

    this.inOrderTraverse = function(callback) {
        const inOrderTraverseNode = function (node, callback) {
            if (node !== null) {
                inOrderTraverseNode(node.left, callback);
                callback(node.key);
                inOrderTraverseNode(node.right, callback);
            }
        }
        inOrderTraverseNode(root, callback);
    };

    this.preOrderTraverse = function(callback) {
        const preOrderTraverseNode = function(node, callback) {
            if (node !== null) {
                callback(node.key);
                preOrderTraverseNode(node.left, callback);
                preOrderTraverseNode(node.right, callback);
            }
        }
        preOrderTraverseNode(root, callback)

    };

    this.postOrderTraverse = function(callback) {
        const postOrderTraverseNode = function(node, callback) {
            if (node !== null) {
                postOrderTraverseNode(node.left, callback);
                postOrderTraverseNode(node.right, callback);
                callback(node.key);
            }
        };
        postOrderTraverseNode(root, callback);
    };

    this.min = function () {
        const minNode = function(node) {
            if (node) {
                while (node.left !== null) {
                    node = node.left;
                }
                return node.key
            }
            return null;
        };
        return minNode(root);
    };

    this.max = function() {
        const maxNode = function(node) {
            if (node) {
                while (node.right !== null) {
                    node = node.right;
                }
                return node.key;
            }
            return null;
        };
        return maxNode(root);
    }

    this.search = function(key) {
        const searchNode = function(node, key) {
            if (node === null) {
                return false;
            }

            if (key < node.key) {
                return searchNode(node.left, key);
            } else if (key > node.key) {
                return searchNode(node.right, key);
            } else {
                return true;
            }
        }

        return searchNode(root, key);
    };

    this.remove = function(key) {//待再测试，再理解
        const findMinNode = function(node) { //与方法min中的minNode不同的是，minNode返回node.key,它返回node本身
            while (node.left !== null) {
                node = node.left;
            }
            return node;
        };
        const removeNode = function(node, key) {
            if (node === null) {
                return null;
            }

            if (key < node.key) { //这种情况需要更新node.left，然后返回更新了node.left的新的node
                node.left = removeNode(node.left, key);
                return node;
            } else if (key > node.key) { //这种情况需要更新node.right，然后返回更新了node.right的新的node
                node.right = removeNode(node.right, key);
                return node;
            } else { //这种情况需要更新node.key或者其他更新手段(包括直接将node变为null, 或更新node.right)，返回的也是更新后的node

                //情况1，被移除的是叶子节点
                if (node.left === null && node.right === null) {
                    node = null;
                    return node;
                } 

                //情况2,被移除的是只有一个子节点的节点
                if (node.left === null) { //只有右子节点
                    node = node.right;
                    return node;
                } else if (node.right === null) {//只有左子节点
                    node = node.left;
                    return node;
                }

                //情况3， 被移除的是有两个子节点的节点
                const aux = findMinNode(node.right);//找到子树中的最小节点，它肯定是一个叶子节点
                node.key = aux.key;//更新node的key

                //node.left不变
                //node.right要删除上述aux节点
                node.right = removeNode(node.right, aux.key);//更新node.right,这里其实是移除了一个以node.right为root的树的叶子节点

                return node;
            }
        };

        root = removeNode(root, key);
    };
}

//Test for BST
const tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);

function printNode(value) {
    console.log(value);
}
tree.inOrderTraverse(printNode);
tree.preOrderTraverse(printNode);
tree.postOrderTraverse(printNode);
console.log('min:', tree.min());
console.log('max:',tree.max());
console.log('search 18', tree.search(18));
console.log('search 4', tree.search(4));
console.log('search 5', tree.search(5));
console.log('search 11', tree.search(11));

tree.remove(18);
console.log('removed 18');
tree.inOrderTraverse(printNode);
export {BinarySearchTree};


function AvlTree() {
    const Node = function(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    };
    let root = null;

    this.insert = function (key) {
        const heightNode = function(node) {
            if (node === null) {
                return -1;
            } else {
                return max(heightNode(node.left), heightNode(node.right)) + 1;
            }
        }
        const insertNode = function(node, key) {
            if (node === null) {
                node = new Node(key);
            } else if (key < node.key) {
                insertNode(node.left, key);
                //如果node.left为null,那么就直接插入了这个结点到node.left这里
                if (node.left !== null) {
                    //TODO: 确认自平衡
                }
            } else if (key > node.key) {
                insertNode(node.right, key);

                if (node.right !== null) {
                    //TODO:确认自平衡
                }
            }
        }
    }
}