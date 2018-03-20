const Set = (function() {
    let items = {};
    
    class Set {
        has(value) {
            return items.hasOwnProperty(value);
        }
        add(value) {
            if(!this.has(value)) {
                items[value] = value;
                return true;
            } else {
                return false;
            }
        }
        remove(value) {
            if (this.has(value)) {
                delete items[value];
                return true;
            } else {
                return false;
            }
        }
        clear() {
            items = {};
        }
        size() {
            return Object.keys(items).length;
        }
        values() {
            const values = [];
            for (let key of Object.keys(items)) {
                values.push(items[key]);
            }
            return values;
        }
    }
    return Set;
})();

let set = new Set();

console.log(set.add(1));
console.log(set.values());
console.log(set.has(1));
console.log(set.size());
console.log(set.add(2));
console.log(set.values());
console.log(set.remove(1));
console.log(set.values());
set.clear();
console.log(set.values());

export default Set;