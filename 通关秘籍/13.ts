// ParseQueryString
type ParseParam<Param extends string> =
  Param extends `${infer Key}=${infer Value}`
    ? {
        [K in Key]: Value;
      }
    : Record<string, any>;

type MergeValues<One, Other> = One extends Other
  ? One
  : Other extends unknown[]
  ? [One, ...Other]
  : [One, Other];

type MergeParams<
  OneParam extends Record<string, any>,
  OtherParam extends Record<string, any>
> = {
  readonly [Key in
    | keyof OneParam
    | keyof OtherParam]: Key extends keyof OneParam
    ? Key extends keyof OtherParam
      ? MergeValues<OneParam[Key], OtherParam[Key]>
      : OneParam[Key]
    : Key extends keyof OtherParam
    ? OtherParam[Key]
    : never;
};

type ParseQueryString<Str extends string> =
  Str extends `${infer Param}&${infer Rest}`
    ? MergeParams<ParseParam<Param>, ParseQueryString<Rest>>
    : ParseParam<Str>;

function parseQueryString<Str extends string>(
  queryStr: Str
): ParseQueryString<Str> {
  if (!queryStr || !queryStr.length) {
    return {} as any;
  }
  const queryObj = {} as any;
  const items = queryStr.split("&");
  items.forEach((item) => {
    const [key, value] = item.split("=");
    if (queryObj[key]) {
      if (Array.isArray(queryObj[key])) {
        queryObj[key].push(value);
      } else {
        queryObj[key] = [queryObj[key], value];
      }
    } else {
      queryObj[key] = value;
    }
  });
  return queryObj as any;
}

const res = parseQueryString("a=1&b=2&c=3");
// res.a
//     b
//     c

// Promise.all、Promise.race
interface PromiseConstructor {
  all<T extends readonly unknown[] | []>(
    values: T
  ): {
    -readonly [Key in keyof T]: Awaited<T[Key]>;
  };

  race<T extends unknown[] | []>(values: T): Promise<Awaited<T[number]>>;
}
const res1 = Promise.all([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
]);
// const res1: [number, number, number]
const res2 = Promise.race([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
]);
// const res2: Promise<number>

// currying
type CurriedFunc<Params, Return> = Params extends [infer Arg, ...infer Rest]
  ? (args: Arg) => CurriedFunc<Rest, Return>
  : never;
declare function currying<Func>(
  fn: Func
): Func extends (...args: infer Params) => infer Return
  ? CurriedFunc<Params, Return>
  : never;
const func = (a: string, b: number, c: boolean) => {};
const curriedFunc = currying(func);
// const curriedFunc: (args: string) => (args: number) => (args: boolean) => never
