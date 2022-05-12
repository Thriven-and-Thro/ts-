type ParseParam<Param extends string> =
  Param extends `${infer Key}=${infer Val}`
    ? {
        [K in Key]: Val;
      }
    : {};

type MergeValue<OneValue, OtherValue> = OneValue extends OtherValue
  ? OneValue
  : OtherValue extends unknown[]
  ? [OneValue, ...OtherValue]
  : [OneValue, OtherValue];

type MergeParams<
  OneParam extends Record<string, any>,
  OtherParam extends Record<string, any>
> = {
  [Key in keyof OneParam | keyof OtherParam]: Key extends keyof OneParam
    ? Key extends keyof OtherParam
      ? MergeValue<OneParam[Key], OtherParam[Key]>
      : OneParam[Key]
    : Key extends keyof OtherParam
    ? OtherParam[Key]
    : never;
};
// type ParseQueryString<Str extends string> = Str extends `${infer Param}&${infer Rest}` ? MergeParams<ParseParam<Param>> :
