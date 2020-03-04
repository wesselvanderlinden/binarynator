import ByteBuffer from 'bytebuffer';
import TypeValidationError from '../error/TypeValidationError';
import SchemaType from './schema-type';

class StringType extends SchemaType<string> {
  protected writeValue(value: string, buffer: ByteBuffer): void {
    buffer.writeVString(value);
  }

  protected readValue(buffer: ByteBuffer): string {
    return buffer.readVString();
  }

  protected validateValue(value: any): void {
    if (typeof value !== 'string') {
      throw new TypeValidationError('Value is not a string');
    }
  }
}

export const string = () => new StringType();
