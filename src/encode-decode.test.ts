import { decode } from './decode';
import { encode } from './encode';
import { array, int32, object, string } from './schema-type';
import SchemaType from './schema-type/schema-type';

interface TestCase {
  schema: SchemaType<any>;
  input: any;
}

const tests: Record<string, TestCase> = {
  test: {
    schema: object({
      word: string(),
      number: int32(),
      optional_word: string().optional(),
      optional_number: int32().optional(),
      nested: object({
        child: string(),
      }),
      array: array(int32()),
    }),

    input: {
      word: 'some word',
      number: 1337,
      optional_word: 'HENK',
      optional_number: 1234,
      nested: { child: 'huh' },
      array: [1, 2, 3, 4],
    },
  },

  'nested array with objects': {
    schema: object({
      array: array(object({
        nested: object({
          child: array(int32()),
        }),
      })),
    }),
    input: {
      array: [
        { nested: { child: [1, 2, 3] } },
        { nested: { child: [4, 5, 6] } },
      ],
    },
  },
};

Object.keys(tests).forEach((name) => {
  const { schema, input } = tests[name];

  test(name, () => {
    const encoded = encode(schema, input);
    const decoded = decode(schema, encoded);

    expect(decoded).toEqual(input);
  });
});
