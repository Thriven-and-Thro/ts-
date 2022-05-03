type BuildArray<
  Length extends number,
  Ele = unknown,
  Count extends unknown[] = []
> = Count["length"] extends Length
  ? Count
  : BuildArray<Length, Ele, [...Count, Ele]>;

// Add
type Add<Num1 extends number, Num2 extends number> = [
  ...BuildArray<Num1>,
  ...BuildArray<Num2>
]["length"];
type AddResult = Add<10, 20>;

// Subtract
type Subtract<
  Num1 extends number,
  Num2 extends number
> = BuildArray<Num1> extends [...BuildArray<Num2>, ...infer Rest]
  ? Rest["length"]
  : never;
type SubtractResult = Subtract<50, 15>;

// Multiply
type Multiply<
  Num1 extends number,
  Num2 extends number,
  Count extends unknown[] = []
> = Num2 extends 0
  ? Count["length"]
  : Multiply<Num1, Subtract<Num2, 1>, [...Count, ...BuildArray<Num1>]>;
type MultiplyResult = Multiply<4, 3>;

// Divide
type Divide<
  Num1 extends number,
  Num2 extends number,
  Count extends unknown[] = []
> = Num1 extends 0
  ? Count["length"]
  : Divide<Subtract<Num1, Num2>, Num2, [...Count, unknown]>;
type DivideResult = Divide<15, 5>;

// StrLen
type StrLen<
  Str extends string,
  Count extends unknown[] = []
> = Str extends `${string}${infer Rest}`
  ? StrLen<Rest, [...Count, unknown]>
  : Count["length"];
type StrLenResult = StrLen<"skufh sa">;

// GreaterThan
type GreaterThan<
  Num1 extends number,
  Num2 extends number,
  CountArr extends unknown[] = []
> = Num1 extends Num2
  ? false
  : Num2 extends CountArr["length"]
  ? true
  : Num1 extends CountArr["length"]
  ? false
  : GreaterThan<Num1, Num2, [...CountArr, unknown]>;
type GreaterThanResult = GreaterThan<10, 25>;

// Fibonacci
type Fibonacci<
  Num extends number,
  PreArr extends unknown[] = [1],
  CurArr extends unknown[] = [],
  Index extends unknown[] = []
> = Num extends Index["length"]
  ? CurArr["length"]
  : Fibonacci<Num, CurArr, [...PreArr, ...CurArr], [...Index, unknown]>;
type FibonacciResult = Fibonacci<1>;
