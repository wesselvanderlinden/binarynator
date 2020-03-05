# Binarynator

Just a simple "transcoder" which converts JSON structures, defined by a schema, to binary and back.

## Why?
Why not?

## Example

```javascript
import { encode, decode, object, string, int32, array } from 'binarynator';

const schema = object({
  word: string(),
  number: int32().nullable(),
  optional_number: int32().optional(),
  nested: object({
    child: string(),
  }),
  array: array(int32()),
});

const input = {
  word: 'something',
  number: null,
  optional_number: 1337,
  nested: {
    child: 'hello!',
  },
  array: [1, 2, 3, 4],
}

const encoded = encode(schema, input);
// encoded is now a Buffer, use this to write to a file or something...

const decoded = decode(schema, encoded);
// decoded is in the exact structure as defined by the schema, filled with the decoded data
```


## TODO
* include a version number of the schema in the binary
* InferType on arrays and oneOf doesn't work yet
* Improve error handling & messaging