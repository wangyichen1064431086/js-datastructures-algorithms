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
export default Dictionary;