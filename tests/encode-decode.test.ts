import { array, int32, object, string } from '../src/schema';
import { tableTestSchemaType } from './test-utils';


tableTestSchemaType({
  test: {
    type: object({
      word: string(),
      number: int32(),
      optional_word: string().optional(),
      optional_number: int32().optional(),
      nested: object({
        child: string(),
      }),
      array: array(int32()),
    }),

    value: {
      word: 'some word',
      number: 1337,
      optional_word: 'HENK',
      optional_number: 1234,
      nested: { child: 'huh' },
      array: [1, 2, 3, 4],
    },
  },

  'nested array with objects': {
    type: object({
      array: array(object({
        nested: object({
          child: array(int32()),
        }),
      })),
    }),
    value: {
      array: [
        { nested: { child: [1, 2, 3] } },
        { nested: { child: [4, 5, 6] } },
      ],
    },
  },
});
