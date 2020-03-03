import ByteBuffer from 'bytebuffer';
import SchemaType from './schema-type/schema-type';

export function encode(schema: SchemaType<any>, obj: any): Buffer {
  const buffer = new ByteBuffer();

  schema.write(obj, buffer);
  buffer.flip();

  return buffer.toBuffer();
}
