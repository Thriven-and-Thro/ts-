type Test1<A, B> = A extends B ? true : false;
type TestResult1 = Test1<never, never>;

type Test3<Item extends string> = Item extends "a" ? Uppercase<Item> : Item;
type Test4<Item extends string> = "a" extends Item ? Uppercase<Item> : Item;
type Union = "b" | "a";
type Test3Result = Test3<Union>;
type Test4Result = Test4<Union>;
