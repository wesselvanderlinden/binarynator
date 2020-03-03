import ByteBuffer from 'bytebuffer';
import SchemaType from './schema-type';

interface TestCase {
  type: SchemaType<any>,
  value: any;
}

export function tableTestSchemaType(tests: Record<string, TestCase>) {
  Object.keys(tests).forEach((name) => {
    const { type, value } = tests[name];

    test(name, () => testSchemaType(type, value));
  });
}

function testSchemaType(type: SchemaType<any>, value: any) {
  const encoded = writeSchemaType(type, value);
  const decoded = readSchemaType(type, encoded);

  expect(decoded).toEqual(value);
}

function writeSchemaType(type: SchemaType<any>, value: any): string {
  const buffer = new ByteBuffer();

  type.write(value, buffer);
  buffer.flip();

  return buffer.toBuffer().toString();
}

function readSchemaType(type: SchemaType<any>, raw: string): any {
  const readBuffer = ByteBuffer.fromBinary(raw);

  return type.read(readBuffer);
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
