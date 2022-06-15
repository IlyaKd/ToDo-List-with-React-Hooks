import React, { useState } from 'react';
import classnames from 'classnames';
import styles from './InputItem.module.css';
import buttonImg from './img/button.svg';

const InputItem = ({ items, onClickAdd }) => {

    const initialstate = {
        inputValue: '',
        error: false,
        repeat: false,
    };

    const [inputValue, setInputValue] = useState(initialstate.inputValue);
    const [error, setError] = useState(initialstate.error);
    const [repeat, setRepeat] = useState(initialstate.repeat);

    const onSubmit = (event) => {
        event.preventDefault();

        if (inputValue === '') {
            setError(true);
            setRepeat(false);
        } else if (items.find(item => item.value === inputValue)) {
            setRepeat(true);
        } else {
            setInputValue('');
            setError(false);
            setRepeat(false);
            onClickAdd(inputValue);
        }
    }

    return (
        <form
            onSubmit={onSubmit}
            className={classnames({
                [styles.form]: true,
                [styles.error]: error,
                [styles.repeat]: repeat,
                [styles.maxLengthInputValue]: inputValue.length === 240,
            })}>
            <input
                type='text'
                placeholder={'Просто введите сюда название дела...'}
                maxLength={240}
                value={inputValue}
                onChange={event => setInputValue(event.target.value)}
                className={styles.input}
            />
            <button className={styles.btn}>
                <img src={buttonImg} alt='Button' />
            </button>
        </form>
    )
}

export default InputItem;