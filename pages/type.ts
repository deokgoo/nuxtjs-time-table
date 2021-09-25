import { Card, TodoList } from '~/components/GarageCard/type';

export interface Data {
  title: string,
  cards: Card[],
  todoList: TodoList,
}
