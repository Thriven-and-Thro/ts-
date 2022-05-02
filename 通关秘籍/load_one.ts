// Array - First
type GetArrayFirst<Arr extends unknown[]> = Arr extends [
  infer First,
  ...unknown[]
]
  ? First
  : never;
type TestGetArrayFirst = GetArrayFirst<[1, 2, 3]>;

// Array - Last
type GetArrayLast<Arr extends unknown[]> = Arr extends [
  ...unknown[],
  infer Last
]
  ? Last
  : never;
type TestGetArrayLast = GetArrayLast<[1, 2, 3]>;

// Array - PopArr
type GetPopArr<Arr extends unknown[]> = Arr extends []
  ? []
  : Arr extends [...infer Excess, unknown]
  ? Excess
  : never;
type TestPopArr1 = GetPopArr<[1, 2, 3]>;
type TestPopArr2 = GetPopArr<[]>;

// Array - ShiftArr
type GetShiftArr<Arr extends unknown[]> = Arr extends []
  ? []
  : Arr extends [unknown, ...infer Rest]
  ? Rest
  : never;
type TestShiftArr1 = GetShiftArr<[1, 2, 3]>;
type TestShiftArr2 = GetShiftArr<[]>;

// String - StartsWith
type GetStartsWith<
  Str extends string,
  Prefix extends string
> = Str extends `${Prefix}${string}` ? true : false;
type TestStartsWith1 = GetStartsWith<"$abc", "$">;
type TestStartsWith2 = GetStartsWith<"$abc", "#">;

// String - Replace
type GetReplace<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer Prefix}${From}${infer Suffix}`
  ? `${Prefix}${To}${Suffix}`
  : Str;
type TestReplace = GetReplace<"oh my god", "my", "you">;

// String - Trim
type TrimRight<Str extends string> = Str extends `${infer Rest}${
  | " "
  | "\n"
  | "\t"}`
  ? TrimRight<Rest>
  : Str;
type TrimLeft<Str extends string> = Str extends `${
  | " "
  | "\n"
  | "\t"}${infer Rest}`
  ? TrimLeft<Rest>
  : Str;
type Trim<Str extends string> = TrimRight<TrimLeft<Str>>;
type TestTrim = Trim<"  god  ">;

// Function - GetParameters
type GetParameters<Func extends Function> = Func extends (
  ...args: infer Args
) => unknown
  ? Args
  : never;
type TestGetParameters = GetParameters<(name: string, age: number) => any>;

// Function - GetReturnType
type GetReturnType<Func extends Function> = Func extends (
  ...args: any[]
) => infer Res
  ? Res
  : never;
type TestReturnType = GetReturnType<(name: string, age: number) => string>;

// Function - GetThisParameterType
type GetThisParameterType<T> = T extends (
  this: infer This,
  ...args: any[]
) => any
  ? This
  : never;

class Dong {
  name: string;

  constructor(name?: string) {
    this.name = name;
  }

  hello(this: Dong) {
    return "hello, I'm " + this.name;
  }
}
const dong = new Dong();
type TestGetThisParameterType = GetThisParameterType<typeof dong.hello>;

// constructor - GetInstanceType
type GetInstanceType<ConstructorType extends new (...arg: any[]) => any> =
  ConstructorType extends new (...arg: any[]) => infer InstanceType
    ? InstanceType
    : never;

interface PersonConstructor {
  new (...arg: string[]): any;
}
type TestGetInstanceType = GetInstanceType<PersonConstructor>;

// constructor - GetConstructorParameters
type GetConstructorParameters<
  ConstructorType extends new (...arg: any[]) => any
> = ConstructorType extends new (...arg: infer Props) => any ? Props : never;
type TestGetConstructorParameters = GetConstructorParameters<PersonConstructor>;

// GetRefProps
type GetRefProps<Props> = "ref" extends keyof Props
  ? Props extends { ref?: infer Value | undefined }
    ? Value
    : never
  : never;
type TestGetRefProps = GetRefProps<{ ref?: undefined; name: "dong" }>;
