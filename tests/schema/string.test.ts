import { string } from '../../src/schema/string';
import { tableTestSchemaType } from '../test-utils';

tableTestSchemaType({
  'string with value': { type: string(), value: 'test' },
  'string without value': { type: string().optional(), value: undefined },
  'nullable string': { type: string().nullable(), value: null },
});
