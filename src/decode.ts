import ByteBuffer from 'bytebuffer';
import SchemaType from './schema/schema-type';
import { InferType } from './types';

export function decode<T extends SchemaType>(
  schema: T,
  encoded: ByteBuffer | Buffer | ArrayBuffer | Uint8Array | string,
): InferType<T> {
  const buffer = ByteBuffer.wrap(encoded);
  const value = schema.read(buffer);

  schema.validate(value);

  return value;
}
