import { decode } from '../src/decode';
import { encode } from '../src/encode';
import SchemaType from '../src/schema/schema-type';

interface TestCase {
  type: SchemaType,
  value: any;
}

export function tableTestSchemaType(tests: Record<string, TestCase>) {
  Object.keys(tests).forEach((name) => {
    const { type, value } = tests[name];

    test(name, () => testSchemaType(type, value));
  });
}

function testSchemaType(type: SchemaType, value: any) {
  const encoded = encode(type, value);
  const decoded = decode(type, encoded);

  expect(decoded).toEqual(value);
}
