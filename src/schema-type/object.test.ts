import { object } from './object';
import { mockType, tableTestSchemaType } from './test-utils';


tableTestSchemaType({
  object: {
    type: object({ something: mockType(), something_else: mockType() }),
    value: { something: 'abc', something_else: 'def' },
  },

  'optional properties - not filled': {
    type: object({ first: mockType(), second: mockType().optional(), third: mockType() }),
    value: { first: 'first', third: 'third' },
  },
  'optional properties - filled': {
    type: object({ first: mockType(), second: mockType().optional(), third: mockType() }),
    value: { first: 'first', second: 'second', third: 'third' },
  },
});
