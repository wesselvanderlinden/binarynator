import { array } from '../../src/schema/array';
import { mockType, tableTestSchemaType } from '../test-utils';


tableTestSchemaType({
  'empty array': { type: array(mockType()), value: [] },
  'array of types': { type: array(mockType()), value: ['1', '2', '3'] },
});
