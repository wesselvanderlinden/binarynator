import ByteBuffer from 'bytebuffer';
import SchemaType from './schema-type';

class OneOfType extends SchemaType {
  constructor(private types: SchemaType[]) {
    super();

    if (this.types.length >= 128) {
      throw new Error('No more than 128 types are allowed in OneOf');
    }
  }

  protected writeValue(value: any, buffer: ByteBuffer): void {
    const found = this.types.find((type) => type.test(value));

    if (!found) {
      throw new Error('Unexpected type');
    }

    const index = this.types.indexOf(found);

    buffer.writeUint8(index);
    found.write(value, buffer);
  }

  protected readValue(buffer: ByteBuffer): any {
    const index = buffer.readUint8();
    const type = this.types[index];

    if (!type) {
      throw new Error('No type found for value');
    }

    return type.read(buffer);
  }

  public test(value: any): boolean {
    return Boolean(this.types.find((type) => type.test(value)));
  }
}

export const oneOf = (types: SchemaType[]) => new OneOfType(types);
