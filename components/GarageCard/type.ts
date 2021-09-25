export interface Card {
  title: string,
  imgUri: string,
  uri: string,
}

export type TodoItem = {
  id: number,
  name: string,
}

export type TodoList = (TodoItem & {
  children: TodoItem[],
})[];

export default {};
