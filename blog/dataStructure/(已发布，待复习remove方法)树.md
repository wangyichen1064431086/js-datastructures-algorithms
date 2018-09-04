## 一、树的相关概念
### 1.基本概念

####  子树
一个子树由一个节点和它的后代构成。

#### 节点的度
节点所拥有的子树的个数。

#### 树的度
树中各节点度的最大值

####  节点的深度
节点的深度等于祖先节点的数量

####  树的高度
树的高度等于所有节点深度的最大值

#### 森林
若干课互不相交的树的集合。任何一棵树，删去根节点就变成了森林。


### 2. 二叉树
#### 二叉树的定义
(1)二叉树中每个节点的度不大于2
(2)二叉树是有序的，其子树有左右之分，其次序不能随意颠倒

#### 二叉树的性质
- 第k层上最多有2^(k-1)个节点
- 深度为k的二叉树最多有 2^k-1 个节点

### 3. 几种特殊的二叉树

#### 满二叉树
深度为k且有2^k-1个节点的二叉树

#### 完全二叉树
有n个节点的二叉树，当且仅当其每个节点按从上到下、从左至右的顺序进行编号，其编号与满二叉树中1至n的节点编号一一对应

- 有n个节点的完全二叉树中最后一个有子节点的节点的序号：Math.floor(n/2-1)


#### 二叉搜索树
二叉树的一种，但是它只允许左子节点存储比父节点小的值，右子节点存储比父节点大的值。**这是本文要研究的数据结构**

## 二、二叉搜索树及相关方法的js实现代码

```js
function BinarySearchTree() {

  //Node类表示树中的节点
    const Node = function(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    };

    // 变量root表示根节点
    let root = null;

    
    //向树中插入一个节点
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

    //先序遍历：根左右
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

    //中序遍历: 左根右
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

    
    //后序遍历:左右根
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

    //寻找树中的最小值，并返回这个最小值
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
    
    //寻找树中的最大值，病返回这个最大值
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

    //寻找树中是否存在一个特定值，存在返回true,不存在返回false
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

    //从树中移除一个节点
    this.remove = function(key) {
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
```

## 参考资料
-《学习JavaScript数据结构和算法》Chapter8
-《数据结构(C语言版)》Chapter6