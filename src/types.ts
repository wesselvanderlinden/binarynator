import SchemaType from './schema/schema-type';

export type InferType<T> = T extends SchemaType<infer P> ? InnerInferType<P>: never;

type InnerInferType<T> = T extends Array<infer P> ? P[] : { [K in keyof T]: T[K] };
