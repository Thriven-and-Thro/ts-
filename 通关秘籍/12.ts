type MyParameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;
type MyParametersResult = MyParameters<(name: string, age: number) => void>;

type MyReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : never;
type MyReturnTypeResult = MyReturnType<() => number>;

interface Person {
  new (name: string): void;
  name: string;
  age: number;
  hobbies: string[];
}

type MyConstructorParameters<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: infer A) => any ? A : never;
type MyConstructorParametersResult = MyConstructorParameters<Person>;

type MyInstanceType<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: any) => infer R ? R : never;
type MyInstanceTypeResult = MyInstanceType<Person>;

type hello = (this: Person) => void;
type MyThisParameterType<T> = T extends (this: infer U, ...args) => any
  ? U
  : never;
type MyThisParameterTypeResult = MyThisParameterType<hello>;

type MyOmitThisParameter<T> = unknown extends MyThisParameterType<T>
  ? T
  : T extends (...args: infer A) => infer R
  ? (...args: A) => R
  : T;
type MyOmitThisParameterResult = MyOmitThisParameter<hello>;
// type MyOmitThisParameterResult = () => void

type MyPartial<T> = {
  [Key in keyof T]?: T[Key];
};
type MyPartialResult = MyPartial<Person>;
// type MyPartialResult = {
//   name?: string;
// }

type MyRequired<T> = {
  [Key in keyof T]-?: T[Key];
};
type MyRequiredResult = MyRequired<MyPartialResult>;
// type MyRequiredResult = {
//   name: string;
// }

type MyReadonly<T> = {
  readonly [Key in keyof T]: T[Key];
};
type MyReadonlyResult = MyReadonly<Person>;
// type MyReadonlyResult = {
//   readonly name: string;
//   readonly age: number;
//   readonly hobbies: string[];
// }

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
type MyPickResult = MyPick<Person, "name" | "age">;
// type MyPickResult = {
//   name: string;
//   age: number;
// }

type MyRecord<K extends keyof any, V> = {
  [Key in K]: V;
};
type MyRecordResult = MyRecord<string, any>;
// type MyRecordResult = {
//   [x: string]: any;
// }

type MyExclude<T, U> = T extends U ? never : T;
type MyExcludeResult = MyExclude<"a" | "b" | "c", "a" | "b">;
// type MyExcludeResult = "c"

type MyExtract<T, U> = T extends U ? T : never;
type MyExtractResult = MyExtract<"a" | "b" | "c", "a" | "b">;
// type MyExtractResult = "a" | "b"

type MyOmit<T, U> = MyPick<T, Exclude<keyof T, U>>;
type MyOmitResult = MyOmit<Person, "name" | "age">;
// type MyOmitResult = {
//   hobbies: string[];
// }

type MyAwaited<T> = T extends null | undefined
  ? T
  : T extends { then(onfulfilled: infer F): any }
  ? F extends (res: infer V, ...args: any) => any
    ? MyAwaited<V>
    : never
  : T;
type MyAwaitedResult = MyAwaited<Promise<Promise<Promise<string>>>>;
// type MyAwaitedResult = string

type MyNonNullable<T> = T extends null | undefined ? true : false;
type MyNonNullableResult1 = MyNonNullable<null>;
type MyNonNullableResult2 = MyNonNullable<1>;

type MyUppercase<S extends string> = intrinsic;
type MyLowercase<S extends string> = intrinsic;
type MyCapitalize<S extends string> = intrinsic;
type MyUncapitalize<S extends string> = intrinsic;
