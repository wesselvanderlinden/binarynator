import ByteBuffer from 'bytebuffer';
import TypeValidationError from '../error/TypeValidationError';
import SchemaType from './schema-type';

export class BooleanType extends SchemaType<boolean> {
  protected writeValue(value: boolean, buffer: ByteBuffer): void {
    buffer.writeByte(value ? 1 : 0);
  }

  protected readValue(buffer: ByteBuffer): boolean {
    return Boolean(buffer.readByte());
  }

  protected validateValue(value: any): void {
    if (typeof value !== 'boolean') {
      throw new TypeValidationError('Value is not a boolean');
    }
  }
}

export const boolean = () => new BooleanType();
