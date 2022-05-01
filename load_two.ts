// Array - Push
type Push<Arr extends unknown[], Ele> = [...Arr, Ele];
type TestPush = Push<[1, 2], 3>;

// Array - Unshift
type Unshift<Arr extends unknown[], Ele> = [Ele, ...Arr];
type TestUnshift = Unshift<[2, 3], 1>;

// Tuple - Zip
type Zip<
  One extends [unknown, unknown],
  Other extends [unknown, unknown]
> = One extends [infer OneFirst, infer OneSecond]
  ? Other extends [infer OtherFirst, infer OtherSecond]
    ? [[OneFirst, OtherFirst], [OneSecond, OtherSecond]]
    : []
  : [];
type TestZip = Zip<[1, 2], ["a", "b"]>;

// String - CapitalizeStr
type CapitalizeStr<Str extends string> =
  Str extends `${infer First}${infer Last}`
    ? `${Uppercase<First>}${Last}`
    : Str;
type TestCapitalizeStr = CapitalizeStr<"guang">;

// String - CamelCase
type CamelCase<Str extends string> =
  Str extends `${infer First}_${infer Up}${infer Rest}`
    ? `${First}${Uppercase<Up>}${CamelCase<Rest>}`
    : Str;
type TestCamelCase = CamelCase<"dong_dong_dong">;

// String - DropSubStr
type DropSubStr<
  Str extends string,
  Del extends string
> = Str extends `${infer Left}${Del}${infer Right}`
  ? DropSubStr<`${Left}${Right}`, Del>
  : Str;
type TestDropSubStr = DropSubStr<"ABC", "A">;

// Function - AppendArgument
type AppendArgument<Func extends Function, Arg> = Func extends (
  ...args: infer Args
) => infer ReturnType
  ? (...args: [...Args, Arg]) => ReturnType
  : never;
type AppendArgumentResult = AppendArgument<(name: string) => boolean, number>;

// Key - Mapping
type Mapping<Obj extends object> = {
  [Key in keyof Obj]: [Obj[Key], Obj[Key], Obj[Key]];
};
type TestMapping = Mapping<{ a: 1; b: 2 }>;

// Key - UppercaseKey
type UppercaseKey<Obj extends Record<string, any>> = {
  [Key in keyof Obj as Uppercase<Key & string>]: Obj[Key];
};
type TestUppercaseKey = UppercaseKey<{ a: 1; b: 2 }>;

// Record
type MyRecord<K extends string | number | symbol, V> = { [P in K]: V };

// Key - ToReadonly
type ToReadonly<Obj> = {
  readonly [Key in keyof Obj]: Obj[Key];
};
type TestToReadonly = ToReadonly<{ a: 1; b: 2 }>;

// Key - ToPartial
type ToPartial<Obj> = {
  [Key in keyof Obj]?: Obj[Key];
};
type TestToPartial = ToPartial<{ a: 1; b: 2 }>;

// Key - ToMutable
type ToMutable<Obj> = {
  -readonly [Key in keyof Obj]: Obj[Key];
};
type TestToMutable = ToMutable<TestToReadonly>;

// Key - ToRequired
type ToRequired<Obj> = {
  [Key in keyof Obj]-?: Obj[Key];
};
type TestToRequired = ToRequired<TestToPartial>;

// Key - FilterByValueType
type FilterByValueType<Obj extends Record<string, any>, ValueType> = {
  [Key in keyof Obj as ValueType extends Obj[Key] ? Key : never]: Obj[Key];
};
type TestFilterByValueType = FilterByValueType<
  { a: number; b: string },
  number
>;
