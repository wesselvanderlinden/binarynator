import { float32, int16, int32, int8, uint16, uint32, uint8, varint32 } from '../../src/schema/number';
import { tableTestSchemaType } from '../test-utils';

tableTestSchemaType({
  'int8 with value': { type: int8(), value: 57 },
  'int8 without value': { type: int8().optional(), value: undefined },
  'uint8 with value': { type: uint8(), value: 57 },
  'uint8 without value': { type: uint8().optional(), value: undefined },
  'int16 with value': { type: int16(), value: 1337 },
  'int16 without value': { type: int16().optional(), value: undefined },
  'uint16 with value': { type: uint16(), value: 1337 },
  'uint16 without value': { type: uint16().optional(), value: undefined },
  'int32 with value': { type: int32(), value: 1337 },
  'int32 without value': { type: int32().optional(), value: undefined },
  'uint32 with value': { type: uint32(), value: 1337 },
  'uint32 without value': { type: uint32().optional(), value: undefined },
  'varint32 with value': { type: varint32(), value: 500 },
  'varint32 without value': { type: varint32().optional(), value: undefined },
  // 'float32 with value': { type: float32(), value: 1337.37 }, // todo: fix precision
  'float32 without value': { type: float32().optional(), value: undefined },
});
