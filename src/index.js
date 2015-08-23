var has = require("has"),
    indexOf = require("index_of"),
    isNullOrUndefined = require("is_null_or_undefined"),
    arrayForEach = require("array-for_each"),
    fastBindThis = require("fast_bind_this");


var FastHashPrototype;


module.exports = FastHash;


function FastHash(key) {
    this.__key = key;
    this.__array = [];
    this.__hash = {};
}
FastHashPrototype = FastHash.prototype;

FastHashPrototype.get = function(key) {
    return this.__hash[key];
};

FastHashPrototype.has = function(key) {
    return has(this.__hash, key);
};

FastHashPrototype.size = function() {
    return this.__array.length;
};

FastHashPrototype.count = FastHashPrototype.size;

FastHashPrototype.clear = function() {
    var localHas = has,
        hash = this.__hash,
        key;

    for (key in hash) {
        if (localHas(hash, key)) {
            delete hash[key];
        }
    }
    this.__array.length = 0;

    return this;
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
    var array = _this.__array,
        hash = _this.__hash,
        key = value[_this.__key];

    if (!has(hash, key)) {
        hash[key] = value;
        array[array.length] = value;
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
    var array = _this.__array,
        hash = _this.__hash,
        key = value[_this.__key];

    if (has(hash, key)) {
        delete hash[key];
        array.splice(indexOf(value), 1);
    }
}

FastHashPrototype.forEach = function(callback, thisArg) {
    return arrayForEach(this.__array, isNullOrUndefined(thisArg) ? callback : fastBindThis(callback, thisArg, 3));
};
