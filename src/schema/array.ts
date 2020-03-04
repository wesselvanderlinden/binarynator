import ByteBuffer from 'bytebuffer';
import SchemaType from './schema-type';

class ArrayType<T> extends SchemaType<T[]> {
  constructor(private itemType: SchemaType<T>) {
    super();
  }

  protected writeValue(value: T[], buffer: ByteBuffer): void {
    buffer.writeVarint32(value.length);

    value.forEach((item) => this.itemType.write(item, buffer));
  }

  protected readValue(buffer: ByteBuffer): T[] {
    const length = buffer.readVarint32();
    const items: any = [];

    for (let i = 0; i < length; i++) {
      items.push(this.itemType.read(buffer));
    }

    return items;
  }

  public test(value: any): boolean {
    return Array.isArray(value);
  }
}

export const array = <T>(itemType: SchemaType<T>) => new ArrayType(itemType);
