var has = require("has"),
    indexOf = require("index_of"),
    forEach = require("for_each");


module.exports = FastHash;


function FastHash(key) {
    this.__key = key;
    this.__array = [];
    this.__hash = {};
}

FastHash.prototype.get = function(key) {
    return this.__hash[key];
};

FastHash.prototype.has = function(key) {
    return has(this.__hash, key);
};

FastHash.prototype.count = function() {
    return this.__array.length;
};

FastHash.prototype.clear = function() {
    var hash = this.__hash,
        key;

    for (key in hash) {
        if (has(hash, key)) {
            delete hash[key];
        }
    }
    this.__array.length = 0;

    return this;
};

FastHash.prototype.add = function() {
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

FastHash.prototype.remove = function() {
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

FastHash.prototype.forEach = function(callback, thisArg) {
    return forEach(this.__array, callback, thisArg);
};
