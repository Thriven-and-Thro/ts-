type ParseParam<Param extends string> =
  Param extends `${infer Key}=${infer Val}`
    ? {
        [K in Key]: Val;
      }
    : {};
type ParseQueryString<Str extends string> = Str extends `${infer Param}&${infer Rest}` ? Merge
