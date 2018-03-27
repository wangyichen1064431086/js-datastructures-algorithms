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