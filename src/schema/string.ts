import ByteBuffer from 'bytebuffer';
import SchemaType from './schema-type';

class StringType extends SchemaType<string> {
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

export const string = () => new StringType();
