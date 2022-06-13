import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import InputItem from '../InputItem/InputItem';
import ItemList from '../ItemList/ItemList';
import Control from '../Control/Control';
import styles from './Todo.module.css';
import { DragDropContext } from 'react-beautiful-dnd';

const Todo = () => {

  let task = JSON.parse(localStorage.getItem('items') || '');

  const initialState = {
    items: task.length > 0
      ? task
      : [
        { "date": "07.06.2022", "value": "Задача 1", "isDone": false, "id": 1 },
        { "date": "17.06.2022", "value": "Задача 2", "isDone": false, "id": 2 },
      ],
    filter: 'all',
  };

  const [items, setItems] = useState(initialState.items);
  const [filter, setFilter] = useState(initialState.filter);

  // берёт значение состояния из items, преобразовывает в строку и добавляет в localStorage
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  // берёт значение из localStorage, преобразовывает в объект JSON и добавляет в состояние
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items') || '');
    if (items) {
      setItems(items);
    }
  }, []);

  const onClickDone = id => {
    const newItemList = items.map(item => {
      const newItem = { ...item };

      if (item.id === id) {
        newItem.isDone = !item.isDone;
      }

      return newItem;
    });

    setItems(newItemList);
  };

  const onClickDelete = id => {
    const newItemList = items.filter(item => item.id !== id);

    setItems(newItemList);
  };

  // удаление всех задач
  const onClickDeleteAll = () => { setItems([]) };

  const onClickAdd = value => {

    // текущая дата + 1 неделя
    const today = new Date();
    today.setDate(today.getDate() + 7);

    setItems([
      ...items,
      {
        date: today.toLocaleDateString('ru-RU'),
        value,
        isDone: false,
        id: Date.now()
      }
    ]);
  };

  const onClickFilter = filter => {
    setFilter(filter)
  };

  let filteredTasks = [];
  switch (filter) {
    case 'active':
      filteredTasks = items.filter(item => !item.isDone);
      break;
    case 'done':
      filteredTasks = items.filter(item => item.isDone);
      break;
    case 'all':
      filteredTasks = items;
      break;
    default:
      filteredTasks = items;
  };

  const onDragEnd = result => {
    const { destination, source } = result;
    if (!destination) return;

    const newItemList = [...items];
    const [deletedItem] = newItemList.splice(source.index, 1);
    newItemList.splice(destination.index, 0, deletedItem);

    setItems([...newItemList]);
  };

  return (
    <Card className={styles.wrap}>
      <DragDropContext onDragEnd={onDragEnd}>
        <header className={styles.header}>
          <h1 className={styles.title}>Список моих дел</h1>
          <Control
            items={items}
            filter={filter}
            onClickFilter={onClickFilter} />
        </header>
        <div className={styles.btn_wrap} >
          <button className={styles.btn} onClick={() => onClickDeleteAll()}>Очистить список</button>
        </div>
        <div className={styles.items_section}>
          <ItemList
            items={filteredTasks}
            onClickDone={onClickDone}
            onClickDelete={onClickDelete} />
          <InputItem
            items={items}
            onClickAdd={onClickAdd} />
        </div>
      </DragDropContext>
    </Card>);
};

export default Todo;