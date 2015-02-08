var assert = require("assert"),
    FastHash = require("../src/index");


describe("FastHash", function() {
    describe("#get(key)", function() {
        it("should return value with key", function() {
            var hash = new FastHash("name"),
                bob = {
                    name: "Bob"
                };

            hash.add(bob);

            assert.equal(hash.get("Bob"), bob);
            assert.equal(hash.get("Frank"), undefined);
        });
    });
    describe("#has(key)", function() {
        it("should return true if hash contains value with key", function() {
            var hash = new FastHash("name"),
                bob = {
                    name: "Bob"
                };

            hash.add(bob);

            assert.equal(hash.has("Bob"), true);
            assert.equal(hash.has("Frank"), false);
        });
    });
    describe("#add(...values)", function() {
        it("should add values to hash that contain key matching hash's key", function() {
            var hash = new FastHash("name"),
                bob = {
                    name: "Bob"
                },
                frank = {
                    name: "Frank"
                };

            hash.add(bob, frank);

            assert.equal(hash.__array.length, 2);
        });
    });
    describe("#remove(...values)", function() {
        it("should remove values from hash that contain key matching hash's key", function() {
            var hash = new FastHash("name"),
                bob = {
                    name: "Bob"
                },
                frank = {
                    name: "Frank"
                };

            hash.add(bob, frank);
            hash.remove(bob, frank);

            assert.equal(hash.__array.length, 0);
        });
    });
    describe("#clear()", function() {
        it("should remove all values from hash", function() {
            var hash = new FastHash("name"),
                bob = {
                    name: "Bob"
                },
                frank = {
                    name: "Frank"
                };

            hash.add(bob, frank);
            hash.clear();

            assert.equal(hash.__array.length, 0);
        });
    });
});
