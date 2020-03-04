import ByteBuffer from 'bytebuffer';
import SchemaType from './schema/schema-type';
import { InferType } from './types';

export function decode<T extends SchemaType>(
  schema: T,
  encoded: ByteBuffer | Buffer | ArrayBuffer | Uint8Array | string,
): InferType<T> {
  const buffer = ByteBuffer.wrap(encoded);

  return schema.read(buffer);
}
