// CamelcaseUnion
type CamelcaseUnion<Str extends string> =
  Str extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Uppercase<Right>}${CamelcaseUnion<Rest>}`
    : Str;
type CamelcaseUnionResult = CamelcaseUnion<"aa_bb_cc" | "dd_ee">;

// IsUnion
type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never;
type IsUnionResult = IsUnion<"a" | "b">;

// BEM
type BEM<
  Block extends string,
  Element extends string[],
  Modifiers extends string[]
> = `${Block}__${Element[number]}--${Modifiers[number]}`;
type BEMResult = BEM<"guang", ["aaa", "bbb"], ["warning", "success"]>;

// Combination
type Combination<A extends string, B extends string> =
  | A
  | B
  | `${A}${B}`
  | `${B}${A}`;
type CombinationResult = Combination<"a", "b">;

// AllCombinations
type AllCombinations<A extends string, B extends string = A> = A extends A
  ? Combination<A, AllCombinations<Exclude<B, A>>>
  : never;
type AllCombinationsResult = AllCombinations<"A" | "B" | "C">;
