import TypeValidationError from '../error/TypeValidationError';

enum StateByte {
  UNDEFINED = 0,
  NULL = 1,
  DEFINED = 2,
}

export default abstract class SchemaType<T = any> {
  private isOptional = false;

  private isNullable = false;

  public optional(optional?: boolean): this {
    this.isOptional = optional || true;

    return this;
  }

  public nullable(nullable?: boolean): this {
    this.isNullable = nullable || true;

    return this;
  }

  protected abstract writeValue(value: T, buffer: ByteBuffer): void;

  protected abstract readValue(buffer: ByteBuffer): T;

  protected abstract validateValue(value: any): void;

  public test(value: any): boolean {
    try {
      this.validate(value);

      return true;
    } catch {
      return false;
    }
  }

  public validate(value: T): void {
    if (typeof value === 'undefined') {
      if (!this.isOptional) {
        throw new TypeValidationError('Value is undefined but not optional');
      }

      return;
    } if (value === null) {
      if (!this.isNullable) {
        throw new TypeValidationError('Value is null but not nullable');
      }

      return;
    }

    this.validateValue(value);
  }

  public write(value: T, buffer: ByteBuffer): void {
    const state = this.determineStateByte(value);

    if (this.hasStateByte()) {
      buffer.writeByte(state);
    }

    if (state !== StateByte.DEFINED) {
      return;
    }

    this.writeValue(value, buffer);
  }

  public read(buffer: ByteBuffer): T | undefined | null {
    if (this.hasStateByte()) {
      const state: StateByte = buffer.readByte();

      if (state === StateByte.UNDEFINED) {
        return undefined;
      }

      if (state === StateByte.NULL) {
        return null;
      }
    }

    return this.readValue(buffer);
  }

  private determineStateByte(value: T): StateByte {
    if (typeof value === 'undefined') {
      return StateByte.UNDEFINED;
    }

    if (value === null) {
      return StateByte.NULL;
    }

    return StateByte.DEFINED;
  }

  private hasStateByte(): boolean {
    return this.isOptional || this.isNullable;
  }
}
