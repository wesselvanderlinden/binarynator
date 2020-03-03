import { int32 } from '../../src/schema/number';
import { oneOf } from '../../src/schema/one-of';
import { string } from '../../src/schema/string';
import { tableTestSchemaType } from '../test-utils';

tableTestSchemaType({
  'one of string': { type: oneOf([string(), int32()]), value: 'test' },
  'one of int32': { type: oneOf([string(), int32()]), value: 1337 },
});
