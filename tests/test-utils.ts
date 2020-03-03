import ByteBuffer from 'bytebuffer';
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

class MockSchemaType extends SchemaType<string> {
  protected writeValue(value: string, buffer: ByteBuffer): void {
    buffer.writeVString(value);
  }

  protected readValue(buffer: ByteBuffer): string {
    return buffer.readVString();
  }

  public test(value: any): boolean {
    return typeof value === 'string';
  }
}

export const mockType = () => new MockSchemaType();
