import ByteBuffer from 'bytebuffer';
import SchemaType from './schema-type';

class BooleanType extends SchemaType<boolean> {
  protected writeValue(value: boolean, buffer: ByteBuffer): void {
    buffer.writeByte(value ? 1 : 0);
  }

  protected readValue(buffer: ByteBuffer): boolean {
    return Boolean(buffer.readByte());
  }

  public test(value: any): boolean {
    return typeof value === 'boolean';
  }
}

export const boolean = () => new BooleanType();
