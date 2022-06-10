import React from 'react';
import classnames from 'classnames';
import styles from './Item.module.css';
import deleteImg from './img/delete.svg';

const Item = ({ date, value, isDone, id, onClickDone, onClickDelete }) => {

    // если дата в задаче меньше текущей даты
    function isOverdue(date) {
        return date < new Date().toLocaleDateString('ru-RU');
    }

    return (
        <div className={styles.wrap}>
            <input
                type='checkbox'
                checked={isDone}
                className={styles.checkbox} />
            <label
                htmlFor='checkbox'
                onClick={() => onClickDone(id)}
                className={styles.checkbox_label}
            >
                <div
                    className={classnames({
                        [styles.item]: true,
                        [styles.done]: isDone
                    })}
                >
                    <span className={classnames({
                        [styles.date]: date,
                        [styles.date_danger]: isOverdue(date),
                    })}>{date}</span>
                    <span className={classnames({
                        [styles.item]: true,
                        [styles.item_danger]: isOverdue(date),
                    })}>{value}</span>
                </div>
            </label>
            <button className={styles.btn_delete} onClick={() => onClickDelete(id)}>
                <img src={deleteImg} alt='Delete' />
            </button>
        </div>
    )
}

export default Item;