// DeepPromiseValueType
type DeepPromiseValueType<T> = T extends Promise<infer P>
  ? DeepPromiseValueType<P>
  : T;
type DeepPromiseValueTypeResult = DeepPromiseValueType<
  Promise<Promise<Promise<Record<string, any>>>>
>;

// ReverseArr
type ReverseArr<Arr extends unknown[]> = Arr extends [
  infer First,
  ...infer Rest
]
  ? [...ReverseArr<Rest>, First]
  : Arr;
type ReverseArrResult = ReverseArr<[1, 2, 3]>;

// Includes
type IsEqual<A, B> = (A extends B ? true : false) &
  (B extends A ? true : false);
type Includes<Arr extends unknown[], FindItem> = Arr extends [
  infer First,
  ...infer Rest
]
  ? IsEqual<First, FindItem> extends true
    ? true
    : Includes<Rest, FindItem>
  : false;
type IncludesResult = Includes<[1, 2, 3], 1>;

// RemoveItem
type RemoveItem<
  Arr extends unknown[],
  Del = unknown,
  Result extends unknown[] = []
> = Arr extends [infer First, ...infer Rest]
  ? IsEqual<First, Del> extends true
    ? RemoveItem<Rest, Del, Result>
    : RemoveItem<Rest, Del, [...Result, First]>
  : Result;
type RemoveItemResult = RemoveItem<[1, 2, 2, 3], 2>;

// BuildArray
type BuildArray<
  Length extends number,
  Ele = unknown,
  Result extends unknown[] = []
> = Result["length"] extends Length
  ? Result
  : BuildArray<Length, Ele, [...Result, Ele]>;
type BuildArrayResult = BuildArray<5>;

// ReplaceAll
type ReplaceAll<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer Left}${From}${infer Right}`
  ? `${Left}${To}${ReplaceAll<Right, From, To>}`
  : Str;
type ReplaceAllResult = ReplaceAll<"a is b is c", "is", "are">;

// StringToUnion
type StringToUnion<Str extends string> =
  Str extends `${infer First}${infer Rest}`
    ? First | StringToUnion<Rest>
    : never;
type StringToUnionResult = StringToUnion<"aabc">;

// ReverseStr
type ReverseStr<Str extends string> = Str extends `${infer First}${infer Rest}`
  ? `${ReverseStr<Rest>}${First}`
  : Str;
type ReverseStrResult = ReverseStr<"abcdef">;

// DeepReadonly
type DeepReadonly<Obj extends Record<string, any>> = Obj extends any
  ? {
      readonly [Key in keyof Obj]: Obj[Key] extends object
        ? Obj[Key] extends Function
          ? Obj[Key]
          : DeepReadonly<Obj[Key]>
        : Obj[Key];
    }
  : never;
type obj = {
  a: {
    b: {
      c: {
        f: () => "dong";
        d: {
          e: {
            guang: string;
          };
        };
      };
    };
  };
};
type DeepReadonlyResult = DeepReadonly<obj>;
