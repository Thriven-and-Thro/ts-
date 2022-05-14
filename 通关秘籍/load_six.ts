type IsAny<T> = 1 extends 2 & T ? true : false;
type IsAnyReult1 = IsAny<any>;
type IsAnyReult2 = IsAny<unknown>;

type IsNever<T> = [T] extends [never] ? true : false;
type IsNeverResult = IsNever<never>;

type TestAny<T> = T extends number ? 1 : 2;
type TestAnyResult = TestAny<any>;

type IsEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B
  ? 1
  : 2
  ? true
  : false;
type IsEqualResult1 = IsEqual<any, unknown>;
type IsEqualResult2 = IsEqual<1, 1>;

type IsTuple<T> = T extends readonly [...infer Ele]
  ? IsEqual<Ele["length"], number> extends true
    ? false
    : true
  : false;
type IsTupleResult1 = IsTuple<[1, 2]>;
type IsTupleResult2 = IsTuple<number[]>;

type UnionToIntersection<U> = (
  U extends U ? (X: U) => unknown : never
) extends (X: infer R) => unknown
  ? R
  : never;
// 需要对象的联合类型
type UnionToIntersectionResult = UnionToIntersection<{ 1: "a" } | { 2: "b" }>;

type GetOptional<Obj extends Record<string, any>> = {
  [Key in keyof Obj as {} extends Pick<Obj, Key> ? Key : never]: Obj[Key];
};
type GetOptionalReult = GetOptional<{ name: string; age?: number }>;

type GetRequired<Obj extends Record<string, any>> = {
  [Key in keyof Obj as {} extends Pick<Obj, Key> ? never : Key]: Obj[Key];
};
type GetRequiredResult = GetRequired<{ name: string; age?: number }>;

type RemoveIndexSignature<Obj extends Record<string, any>> = {
  [Key in keyof Obj as Key extends `${infer Str}` ? Str : never]: Obj[Key];
};
type RemoveIndexSignatureResult = RemoveIndexSignature<{
  [key: string]: any;
  sleep(): void;
}>;

class Person {
  public name: string;
  protected age: number;
  private hobbies: any[];
}
type ClassPublicProps<Obj extends Record<string, any>> = {
  [Key in keyof Obj]: Obj[Key];
};
type ClassPublicPropsResult = ClassPublicProps<Person>;
