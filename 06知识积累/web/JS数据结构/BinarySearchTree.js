class BinarySearchTree {
    constructor() {
        this.Node = new Node;
        this.root = null;
        // 实例方法
        this.insert = (key) => {
            let newNode = new Node(key);
            if (this.root === null) {
                root = newNode;
            } else {
                insertNode(root, newNode);
            }
        }
    }
    // 实例方法 单不会被继承到子类
    insert1(key) {
        let newNode = new Node(key);
    }
    // 静态方法
    static insert2(key) {
        let newNode = new Node(key);
    }
}
class BinarySearchTreeSon extends BinarySearchTree {}


class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

function insertNode(node, newNode) {
    if (newNode.key < node.key) {
        if (node.left === null) {
            node.left = newNode;
        } else {
            insertNode(node.left, newNode);
        }
    }
}