import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import InputItem from '../InputItem/InputItem';
import ItemList from '../ItemList/ItemList';
import Control from '../Control/Control';
import styles from './Todo.module.css';
import { DragDropContext } from 'react-beautiful-dnd';

const Todo = () => {

  const initialState = {
    items: 
    JSON.parse(localStorage.getItem('items')) || [],
    filter: 'all'
  };

  const [items, setItems] = useState(initialState.items);
  const [filter, setFilter] = useState(initialState.filter);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  });

  const onClickDone = id => {
    const newItemList = items.map(item => {
      const newItem = { ...item};

      if (item.id === id) {
        newItem.isDone =!item.isDone;
      }

      return newItem;
    });

    setItems(newItemList);
  };

  const onClickDelete = id => {
    const newItemList = items.filter(item => item.id !== id);

    setItems(newItemList);
  };

  const onClickAdd = value => {
    setItems([
      ...items,
      {
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
