var has = require("@nathanfaucett/has"),
    indexOf = require("@nathanfaucett/index_of"),
    defineProperty = require("@nathanfaucett/define_property");


var FastHashPrototype;


module.exports = FastHash;


function FastHash(key) {
    this._key = key;
    this._array = [];
    this._hash = {};
}
FastHashPrototype = FastHash.prototype;

FastHashPrototype.get = function(key) {
    return this._hash[key];
};

FastHashPrototype.has = function(key) {
    return has(this._hash, key);
};

FastHashPrototype.size = function() {
    return this._array.length;
};

FastHashPrototype.count = FastHashPrototype.size;

if (defineProperty.hasGettersSetters) {
    defineProperty(FastHashPrototype, "length", {
        get: FastHashPrototype.size
    });
}

FastHashPrototype.clear = function() {
    var localHas = has,
        hash = this._hash,
        key;

    for (key in hash) {
        if (localHas(hash, key)) {
            delete hash[key];
        }
    }
    this._array.length = 0;

    return this;
};

FastHashPrototype.getArray = function() {
    return this._array;
};
FastHashPrototype.getObject = function() {
    return this._hash;
};

FastHashPrototype.add = function() {
    var i = -1,
        il = arguments.length - 1;

    while (i++ < il) {
        FastHash_add(this, arguments[i]);
    }

    return this;
};

function FastHash_add(_this, value) {
    var array = _this._array,
        hash = _this._hash,
        key = value[_this._key];

    if (!has(hash, key)) {
        hash[key] = value;
        array[array.length] = value;
    } else {
        throw new Error("trying to add duplicate keys " + key);
    }
}

FastHashPrototype.remove = function() {
    var i = -1,
        il = arguments.length - 1;

    while (i++ < il) {
        FastHash_remove(this, arguments[i]);
    }

    return this;
};

function FastHash_remove(_this, value) {
    var array = _this._array,
        hash = _this._hash,
        key = value[_this._key];

    if (has(hash, key)) {
        delete hash[key];
        array.splice(indexOf(value), 1);
    } else {
        throw new Error("trying to add duplicate keys " + key);
    }
}
