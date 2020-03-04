import ByteBuffer from 'bytebuffer';
import TypeValidationError from '../error/TypeValidationError';
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

  protected validateValue(value: any): void {
    if (!Array.isArray(value)) {
      throw new Error('Value is not an array');
    }

    value.forEach((item, i) => {
      try {
        this.itemType.validate(item);
      } catch (err) {
        if (err instanceof TypeValidationError) {
          throw TypeValidationError.from(err, [String(i)]);
        }

        throw err;
      }
    });
  }
}

export const array = <T>(itemType: SchemaType<T>) => new ArrayType(itemType);
