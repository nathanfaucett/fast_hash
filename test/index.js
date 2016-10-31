var tape = require("tape"),
    FastHash = require("..");


tape("FastHash #get(key) should return value with key", function(assert) {
    var hash = new FastHash("name"),
        bob = {
            name: "Bob"
        };

    hash.add(bob);

    assert.equal(hash.get("Bob"), bob);
    assert.equal(hash.get("Frank"), undefined);
    assert.end();
});

tape("FastHash #has(key) should return true if hash contains value with key", function(assert) {
    var hash = new FastHash("name"),
        bob = {
            name: "Bob"
        };

    hash.add(bob);

    assert.equal(hash.has("Bob"), true);
    assert.equal(hash.has("Frank"), false);
    assert.end();
});

tape("FastHash #add(...values) should add values to hash that contain key matching hash's key", function(assert) {
    var hash = new FastHash("name"),
        bob = {
            name: "Bob"
        },
        frank = {
            name: "Frank"
        };

    hash.add(bob, frank);

    assert.equal(hash.size(), 2);
    assert.end();
});

tape("FastHash #remove(...values) should remove values from hash that contain key matching hash's key", function(assert) {
    var hash = new FastHash("name"),
        bob = {
            name: "Bob"
        },
        frank = {
            name: "Frank"
        };

    hash.add(bob, frank);
    hash.remove(bob, frank);

    assert.equal(hash.size(), 0);
    assert.end();
});

tape("FastHash #clear() should remove all values from hash", function(assert) {
    var hash = new FastHash("name"),
        bob = {
            name: "Bob"
        },
        frank = {
            name: "Frank"
        };

    hash.add(bob, frank);
    hash.clear();

    assert.equal(hash.size(), 0);
    assert.end();
});
