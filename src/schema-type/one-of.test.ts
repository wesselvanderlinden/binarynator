import { int32 } from './number';
import { oneOf } from './one-of';
import { string } from './string';
import { tableTestSchemaType } from './test-utils';

tableTestSchemaType({
  'one of string': { type: oneOf([string(), int32()]), value: 'test' },
  'one of int32': { type: oneOf([string(), int32()]), value: 1337 },
});
