import ByteBuffer from 'bytebuffer';
import SchemaType from './schema/schema-type';

export function encode(schema: SchemaType, obj: any): Buffer {
  const buffer = new ByteBuffer();

  schema.write(obj, buffer);
  buffer.flip();

  return Buffer.from(buffer.toBuffer());
}
