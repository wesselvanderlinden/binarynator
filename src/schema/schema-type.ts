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

  public abstract test(value: any): boolean;

  public write(value: T, buffer: ByteBuffer): void {
    let state: StateByte;

    if (typeof value === 'undefined') {
      if (!this.isOptional) {
        throw new Error('Value is undefined but not optional');
      }

      state = StateByte.UNDEFINED;
    } else if (value === null) {
      if (!this.isNullable) {
        throw new Error('Value is null but not nullable');
      }

      state = StateByte.NULL;
    } else {
      state = StateByte.DEFINED;
    }

    if (this.hasStateByte()) {
      buffer.writeByte(state);
    }

    if (state !== StateByte.DEFINED) {
      return;
    }

    this.validate(value);
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

    const value = this.readValue(buffer);

    this.validate(value);

    return value;
  }

  private hasStateByte(): boolean {
    return this.isOptional || this.isNullable;
  }

  private validate(value: T): void {
    if (!this.test(value)) {
      throw new Error(`Invalid value: ${value}`);
    }
  }
}
