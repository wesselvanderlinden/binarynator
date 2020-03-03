import { object } from '../../src/schema/object';
import { string } from '../../src/schema/string';
import { tableTestSchemaType } from '../test-utils';


tableTestSchemaType({
  object: {
    type: object({ something: string(), something_else: string() }),
    value: { something: 'abc', something_else: 'def' },
  },

  'optional properties - not filled': {
    type: object({ first: string(), second: string().optional(), third: string() }),
    value: { first: 'first', third: 'third' },
  },
  'optional properties - filled': {
    type: object({ first: string(), second: string().optional(), third: string() }),
    value: { first: 'first', second: 'second', third: 'third' },
  },
});
