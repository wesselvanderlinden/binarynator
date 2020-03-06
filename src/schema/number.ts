import ByteBuffer from 'bytebuffer';
import TypeValidationError from '../error/TypeValidationError';
import SchemaType from './schema-type';

export class BaseNumberType extends SchemaType<number> {
  constructor(
    private writeCallback: (value: number) => void,
    private readCallback: () => number,
  ) {
    super();
  }

  protected writeValue(value: number, buffer: ByteBuffer): void {
    this.writeCallback.call(buffer, value);
  }

  protected readValue(buffer: ByteBuffer): number {
    return this.readCallback.call(buffer);
  }

  protected validateValue(value: any): void {
    if (typeof value !== 'number') {
      throw new TypeValidationError('Value is not a number');
    }
  }
}

const proto = ByteBuffer.prototype;

export const int8 = () => new BaseNumberType(proto.writeInt8, proto.readInt8);
export const uint8 = () => new BaseNumberType(proto.writeInt8, proto.readInt8);

export const int16 = () => new BaseNumberType(proto.writeInt16, proto.readInt16);
export const uint16 = () => new BaseNumberType(proto.writeInt16, proto.readInt16);

export const int32 = () => new BaseNumberType(proto.writeInt32, proto.readInt32);
export const uint32 = () => new BaseNumberType(proto.writeInt32, proto.readInt32);

export const varint32 = () => new BaseNumberType(proto.writeVarint32, proto.readVarint32);

export const float32 = () => new BaseNumberType(proto.writeFloat32, proto.readFloat32);
