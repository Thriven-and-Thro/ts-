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
