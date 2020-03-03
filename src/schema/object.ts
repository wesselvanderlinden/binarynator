import SchemaType from './schema-type';

class ObjectType extends SchemaType<Record<string, any>> {
  constructor(private readonly schema: Record<string, SchemaType>) {
    super();
  }

  protected writeValue(value: Record<string, any>, buffer: ByteBuffer): void {
    Object.keys(this.schema).forEach((key) => {
      const type = this.schema[key];
      const propertyValue = value[key];

      type.write(propertyValue, buffer);
    });
  }

  protected readValue(buffer: ByteBuffer): Record<string, any> {
    const result: any = {};

    Object.keys(this.schema).forEach((key) => {
      const type = this.schema[key];
      result[key] = type.read(buffer);
    });

    return result;
  }

  public test(value: any): boolean {
    // todo: test properties?
    return typeof value === 'object';
  }
}

export const object = (schema: Record<string, SchemaType>) => new ObjectType(schema);
