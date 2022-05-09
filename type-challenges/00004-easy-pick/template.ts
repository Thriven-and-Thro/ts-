// type MyPick<Obj extends object, T extends string | number | symbol> = {
//   [Key in keyof Obj as Key extends T ? Key : never]: Obj[Key];
// };

type MyPick<T, K extends keyof T> = { [P in K]: T[P] };

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type test = MyPick<Todo, "title" | "completed">;
