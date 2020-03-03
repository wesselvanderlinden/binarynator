import { array } from '../../src/schema/array';
import { string } from '../../src/schema/string';
import { tableTestSchemaType } from '../test-utils';


tableTestSchemaType({
  'empty array': { type: array(string()), value: [] },
  'array of types': { type: array(string()), value: ['1', '2', '3'] },
});
