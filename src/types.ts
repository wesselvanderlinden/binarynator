import SchemaType from './schema/schema-type';

export type InferType<T> = T extends SchemaType<infer P> ? InnerInferType<P>: never;

type InnerInferType<T> = T extends any[] ? never : Id<T>;

type Id<T> = { [K in keyof T]: T[K] };
