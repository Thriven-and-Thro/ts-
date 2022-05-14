type MergeValue<One, Other> = One extends Other
  ? One
  : Other extends unknown[]
  ? [One, ...Other]
  : [One, Other];
type ParseParam<Param extends string> =
  Param extends `${infer Key}=${infer Value}` ? { [K in Key]: Value } : {};
type MergeParams<
  One extends Record<string, any>,
  Other extends Record<string, any>
> = {
  [Key in keyof One | keyof Other]: Key extends keyof One
    ? Key extends keyof Other
      ? MergeValue<One, Other>
      : One[Key]
    : Key extends keyof Other
    ? Other[Key]
    : never;
};
type ParseQueryString<Str extends string> =
  Str extends `${infer Param}&${infer Rest}`
    ? MergeParams<ParseParam<Param>, ParseQueryString<Rest>>
    : ParseParam<Str>;

type ParseQueryStringResult = ParseQueryString<"a=1&b=2&c=3">;
