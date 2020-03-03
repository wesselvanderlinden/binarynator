import { boolean } from '../../src/schema/boolean';
import { tableTestSchemaType } from '../test-utils';

tableTestSchemaType({
  'boolean true': { type: boolean(), value: true },
  'boolean false': { type: boolean(), value: false },
  'boolean without value': { type: boolean().optional(), value: undefined },
});
