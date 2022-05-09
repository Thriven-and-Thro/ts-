type IsAny<T> = 1 extends 2 & T ? true : false;
type IsAnyResult1 = IsAny<any>;
type IsAnyResult2 = IsAny<unknown>;

type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never;
type IsUnionResult = IsUnion<"a" | "b">;

type IsNever<T> = [T] extends [never] ? true : false;
type IsNeverResult = IsNever<never>;

type TestAny<T> = T extends number ? 1 : 2;
type TestAnyResult = TestAny<any>;

type IsEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B
  ? 1
  : 2
  ? true
  : false;
type IsEqualResult = IsEqual<1, 1>;

type IsTuple<T> = T extends readonly [...infer Ele]
  ? IsEqual<Ele["length"], number> extends true
    ? false
    : true
  : false;
type IsTupleResult1 = IsTuple<[1, 2]>;
type IsTupleResult2 = IsTuple<number[]>;

type UnionToIntersection<U> = (
  U extends U ? (x: U) => unknown : never
) extends (x: infer R) => unknown
  ? R
  : never;
type UnionToIntersectionResult = UnionToIntersection<{ 1: "1" } | { 2: "2" }>;
// type UnionToIntersectionResult = {
//   1: "1";
// } & {
//     2: "2";
// }

type GetOptional<Obj extends Record<string, any>> = {
  [Key in keyof Obj as {} extends Pick<Obj, Key> ? Key : never]: Obj[Key];
};
type obj1 = {
  name: string;
  age?: number;
};
type GetOptionalResult = GetOptional<obj1>;
// type GetOptionalResult = {
//   age?: number;
// }

type GetRequired<Obj extends Record<string, any>> = {
  [Key in keyof Obj as {} extends Pick<Obj, Key> ? never : Key]: Obj[Key];
};
type GetRequiredResult = GetRequired<obj1>;

type RemoveIndexSignature<Obj extends Record<string, any>> = {
  [Key in keyof Obj as Key extends `${infer Str}` ? Str : never]: Obj[Key];
};
type obj2 = {
  [key: string]: any;
  sleep(): void;
};
type RemoveIndexSignatureResult = RemoveIndexSignature<obj2>;
// type RemoveIndexSignatureResult = {
//   sleep: () => void;
// }
