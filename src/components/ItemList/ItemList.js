import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Item from '../Item/Item';
import styles from './ItemList.module.css';

const ItemList = ({ items, onClickDone, onClickDelete}) => {
  if (items.length === 0) {
    return (
      <div className={styles.noItem}></div>
    )
  } else {
      return (
        <Droppable droppableId={'itemlist'}>
          {(provided) => (
            <ul 
              className={styles.wrap}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {items.map((item, index) =>
                <Draggable 
                  draggableId={'item-' + item.id} 
                  index={index} 
                  key={item.id}
                >
                  {(provided) => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <Item 
                        value={item.value} 
                        isDone={item.isDone}
                        id={item.id}
                        onClickDone={onClickDone}
                        onClickDelete={onClickDelete}
                      />
                    </li>
                  )}
                </Draggable>
              )}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
    )
  }
};

export default ItemList;