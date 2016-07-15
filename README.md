FastHash
=======

FastHash for indexing values by one of their keys

```javascript
var FastHash = require("@nathanfaucett/fast_hash");

function Value(id) {
    this.id = id;
}

var hash = new FastHash("id");

hash.add(new Value("1"));
hash.add(new Value("2"));

hash.get("2") // Value {id: "2"}
```
