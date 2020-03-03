import SchemaType from './schema-type';

export type ObjectSchema<T extends object | null | undefined> = {
  [field in keyof T]: SchemaType<T[field]>;
};

class ObjectType<T extends object | null | undefined = object> extends SchemaType<T> {
  constructor(private readonly schema: ObjectSchema<T>) {
    super();
  }

  protected writeValue(value: T, buffer: ByteBuffer): void {
    Object.keys(this.schema).forEach((key) => {
      const type = (this.schema as any)[key];
      const propertyValue = (value as any)[key];

      type.write(propertyValue, buffer);
    });
  }

  protected readValue(buffer: ByteBuffer): T {
    const result: Record<string, any> = {};

    Object.keys(this.schema).forEach((key) => {
      const type = (this.schema as any)[key];
      result[key] = type.read(buffer);
    });

    return result as T;
  }

  public test(value: any): boolean {
    // todo: test properties?
    return typeof value === 'object';
  }
}

export const object = <T extends object | null | undefined>(
  schema: ObjectSchema<T>,
) => new ObjectType(schema);
