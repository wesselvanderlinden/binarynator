import ByteBuffer from 'bytebuffer';
import SchemaType from './schema/schema-type';

export function decode(
  schema: SchemaType,
  encoded: ByteBuffer | Buffer | ArrayBuffer | Uint8Array | string,
): any {
  const buffer = ByteBuffer.wrap(encoded);

  return schema.read(buffer);
}
