import ByteBuffer from 'bytebuffer';
import SchemaType from './schema/schema-type';
import { InferType } from './types';

export function encode<T extends SchemaType>(schema: T, obj: InferType<T>): Buffer {
  const buffer = new ByteBuffer();

  schema.validate(obj);
  schema.write(obj, buffer);
  buffer.flip();

  return Buffer.from(buffer.toBuffer());
}
