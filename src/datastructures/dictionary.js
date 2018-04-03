import { LinkedList } from './linkedList.js';

/**字典数据结构的JavaScript实现***/
function Dictionary() {
    let items = {};

    this.has = function(key) {
        return key in items;
    };

    this.set = function(key,value) {
        items[key] = value;
    };

    this.delete = function(key) {
        if (this.has(key)) {
            delete items[key];
            return true;
        }
        return false;
    }

    this.get = function(key) {
        return this.has(key) ? items[key] : undefined;
    }

    this.values = function() {
        const values = [];
        for(let prop in items) {
            if (items.hasOwnProperty(prop)) {
                values.push(items[prop]);
            }
        }
        return values;
    }

    this.clear = function() {
        items = {};
    }

    this.size = function() {
        return Object.keys(items).length;
    }

    this.keys = function() {
        return Object.keys(items);
    }

    this.getItems = function() {
        return items;
    }
}

const dictionary = new Dictionary();
dictionary.set('Gandalf', 'gandalf@email.com');
dictionary.set('John', 'johnsnow@email.com');
dictionary.set('Tyrion', 'tyrion@email.com');

console.log(dictionary.has('John'));
console.log(dictionary.size());
console.log(dictionary.keys());
console.log(dictionary.get('Tyrion'));

dictionary.delete('John');
console.log(dictionary.values());
console.log(dictionary.keys());
console.log(dictionary.getItems());


/******散列表的JavaScript实现************* */
function HashTable() {
    let table = [];

    let loseloseHashCode = function(key) {
        let hash = 0;
        for(let i=0, len=key.length;i<len;i++) {
            hash += key.charCodeAt(i);//得到key中每个字符的ASCII编码
        }
        return hash % 37;
    }

    this.put = function(key, value) {
        const position = loseloseHashCode(key);
        console.log(`${position}-${key}`);
        table[position] = value;
    }

    this.get = function(key) {
        return table[loseloseHashCode(key)]
    }

    this.remove = function(key) {
        table[loseloseHashCode(key)] = undefined;
    }

    this.print = function() {
        for(let i=0,len=table.length;i<len;i++) {
            if(table[i]) {
                console.log(`${i}:${table[i]}`);
            }
        }
    }
}

// 测试代码：
const hash = new HashTable();
hash.put('Gandalf', 'gandalf@email.com');
hash.put('John', 'johnsnow@email.com');
hash.put('Tyrion', 'tyrion@email.com');
console.log(hash.get('Gandalf'));
console.log(hash.get('Loiane'));
hash.remove('Gandalf');
console.log(hash.get('Gandalf'));

hash.put('Donnie', 'donnie@email.com');
hash.put('Ana', 'ana@email.com');
hash.print();




/*********使用了分离链接的散列表*********/

function HashTable_SeparationOfLink() {
    let table = [];

    let loseloseHashCode = function(key) {
        let hash = 0;
        for(let i=0, len=key.length;i<len;i++) {
            hash += key.charCodeAt(i);//得到key中每个字符的ASCII编码
        }
        return hash % 37;
    }

    let ValuePair = function(key, value) { 
        this.key = key;
        this.value = value;
        this.toString = function() {//TO RETHINK: 打印对象的时候，会自动调用其上的toString方法
            return '[' + this.key + '-' + this.value + ']';
        }
    }
    this.put = function(key, value) {
        const position = loseloseHashCode(key);
        
        if (table[position] === undefined) {
            table[position] = new LinkedList();
            //console.log(table[position].getHead());
        }
        table[position].append(new ValuePair(key, value));//原LinkedList的方法append(element),此处element就是一个类的实例：new ValuePair(key, value)
    }

    this.get = function(key) {
        let position = loseloseHashCode(key);

        if (table[position] !== undefined) {
            let current = table[position].getHead();
            while(current) {
                if (current.element.key === key) {
                    return current.element.value;
                }

                current = current.next;
            }
        }
        return undefined;
    };

    this.remove = function(key) {
        const position = loseloseHashCode(key);

        if (table[position] !== undefined) {
            let current = table[position].getHead();

            while(current) {
                if (current.element.key === key) {
                    table[position].remove(current.element);

                    if (table[position].isEmpty()) {//如果移走元素之后该位置的链表变为空，则将该位置变为undefined
                        table[position] = undefined;
                    }
                    return true
                }
                current = current.next;
            }
        }

        return false;
    };

    this.print = function() {
        for(let i=0,len=table.length;i<len;i++) {
            if(table[i]) {
                console.log(`${i}:${table[i]}`);//这是调用的LinkedList的toString()方法（table[i].toString()可写可不写，因为这是自动调用的），然后具体到每个节点的current.element的打印，自动调用了该element(即一个ValuePair)的toString()方法
            }
        }
    }
}

// 测试代码：
const hash1 = new HashTable_SeparationOfLink();
console.log('hash1:');
hash1.put('Gandalf', 'gandalf@email.com');
hash1.put('John', 'john@email.com');
hash1.put('Tyrion', 'tyrion@email.com');
hash1.put('Aaron', 'aaron@email.com');
hash1.put('Donnie', 'donnie@email.com');
hash1.put('Ana', 'ana@email.com');

console.log(hash1.get('Donnie'));
console.log(hash1.remove('Aaron'));
console.log(hash1.get('Aaron'));
hash1.print();//没问题

/**********使用了线性探查的散列表********/
function HashTable_LinearProbing() {
    let table = [];


    let loseloseHashCode = function(key) {
        let hash = 0;
        for(let i=0, len=key.length;i<len;i++) {
            hash += key.charCodeAt(i);//得到key中每个字符的ASCII编码
        }
        return hash % 37;
    }

    let djb2HashCode = function(key) {
        let hash = 5381;
        for (let i = 0; i < key.length; i++) {
            hash = hash * 33 + key.charCodeAt(i);
        }
        return hash % 1013;//与一个比散列表大小(这里认为是1000)要大的随机指数求余
    }

    let ValuePair = function(key, value) {
        this.key = key;
        this.value = value;
        this.toString = function() {
            return '[' + this.key + '-' + this.value + ']';
        }
    }

    this.put = function(key, value) {
        let position = loseloseHashCode(key);

        if(table[position] === undefined) {
            table[position] = new ValuePair(key, value);
        } else {
            let index = position++;
            while(table[index] !== undefined) {
                index++;
            }
            table[index] = new ValuePair(key, value);
        }
    }

    this.get = function(key) {
        let position = loseloseHashCode(key);

        if (table[position] !== undefined) {
            if (table[position].key === key) {
                return table[position].value;
            } else {
                let index = position++;
                while (table[index] === undefined || table[index].key !== key) {
                    index++;
                }
                if (table[index].key === key) {//仅仅是验证一下，能走到这里这个条件肯定满足
                    return table[index].value;
                }
            }
        }
        return undefined;
    }

    this.remove = function(key) {
        let position = loseloseHashCode(key);

        if (table[position] !== undefined) {
            if (table[position].key === key) {
                table[position] = undefined;
                return true;
            } else {
                let index = position++;
                while (table[index] === undefined || table[index].key !== key) { //(1)
                    index++;
                }
                if (table[index].key === key) {//仅仅是验证一下，能走到这里这个条件肯定满足
                    table[index] = undefined;
                    return true;
                }
            }
        }

        return false;
    }

    this.print = function() {
        for(let i=0,len=table.length;i<len;i++) {
            if(table[i]) {
                console.log(`${i}:${table[i]}`);//这是调用的ValuePair的toString()方法，可以写作table[i].toString()也可以不写toString(),toString()被自动调用了
            }
        }
    }
}

// 测试代码：
const hash2 = new HashTable_LinearProbing();
console.log('hash2:');
hash2.put('Gandalf', 'gandalf@email.com');
hash2.put('John', 'john@email.com');
hash2.put('Tyrion', 'tyrion@email.com');
hash2.put('Aaron', 'aaron@email.com');
hash2.put('Donnie', 'donnie@email.com');
hash2.put('Ana', 'ana@email.com');

console.log(hash2.get('Donnie'));

console.log(hash2.remove('Aaron'));

//console.log(hash2.get('Aaron'));//TO RETHINK:hash2获取不存在的键，会导致无限循环(上述line277)

hash2.print();//没问题


/***************原生es6的Map*****************/
const map = new Map();
map.set('Gandalf', 'gandalf@email.com');
map.set('John', 'johnsnow@email.com');
map.set('Tyrion', 'tyrion@email.com');

console.log(map.has('Gandalf'));
console.log(map.size);
console.log(map.keys());
console.log(map.values());
console.log(map.get('Tyrion'));
console.log(map.delete('John'));
console.log(map.get('John'));
map.clear();
console.log(map);

/*************ES6的WeekMap************/
const weakmap = new WeakMap();
const obj1 = {name: 'Gandalf'},
      obj2 = {name: 'John'},
      obj3 = {name: 'Tyrion'};

weakmap.set(obj1, 'gandalf@email.com');
weakmap.set(obj2,'johnsnow@email.com');
weakmap.set(obj3, 'tyrion@email.com');

console.log(weakmap.has(obj1));
console.log(weakmap.get(obj3));
weakmap.delete(obj2);
export default Dictionary;