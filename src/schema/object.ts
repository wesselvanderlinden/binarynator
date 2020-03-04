import TypeValidationError from '../error/TypeValidationError';
import SchemaType from './schema-type';

export type ObjectSchema<T extends object | null | undefined> = {
  [field in keyof T]: SchemaType<T[field]>;
};

class ObjectType<T extends object | null | undefined = object> extends SchemaType<T> {
  constructor(private readonly schema: ObjectSchema<T>) {
    super();
  }

  protected writeValue(value: T, buffer: ByteBuffer): void {
    this.traverseProperties((key, type) => {
      const propertyValue = (value as any)[key];

      type.write(propertyValue, buffer);
    });
  }

  protected readValue(buffer: ByteBuffer): T {
    const result: Partial<Record<keyof T, any>> = {};

    this.traverseProperties((key, type) => {
      const value = type.read(buffer);

      if (typeof value === 'undefined') {
        return;
      }

      result[key] = value;
    });

    return result as T;
  }

  protected validateValue(value: any): void {
    if (typeof value !== 'object') {
      throw new TypeValidationError('Value is not an object');
    }

    this.traverseProperties((key, type) => {
      try {
        type.validate(value[key]);
      } catch (err) {
        if (err instanceof TypeValidationError) {
          throw TypeValidationError.from(err, [String(key)]);
        }

        throw err;
      }
    });
  }

  private traverseProperties(callback: (key: keyof T, type: SchemaType) => void): void {
    const keys = Object.keys(this.schema) as Array<keyof T>;

    keys.forEach((key) => {
      const type = this.schema[key];

      callback(key, type);
    });
  }
}

export const object = <T extends object | null | undefined>(
  schema: ObjectSchema<T>,
) => new ObjectType(schema);
