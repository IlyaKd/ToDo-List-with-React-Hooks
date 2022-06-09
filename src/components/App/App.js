import React from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import Todo from '../Todo/Todo';
import About from '../About/About';
import styles from './App.module.css';

const App = () => {
  return (
    <Router>
      <div className={styles.wrap}>
        <header className={styles.header}>
          <NavLink 
            to='/todo'
            exact
            className={styles.header__link} 
            activeClassName={styles.header__link_active}>
              Дела
          </NavLink>
          <NavLink 
            to='/'
            exact
            className={styles.header__link}
            activeClassName={styles.header__link_active}>
              Обо мне
            </NavLink>
        </header>
        <div className={styles.content}>
          <Route path='/todo' component={Todo} />
          <Route path='/' exact component={About} />
        </div>
      </div>
    </Router>
  );  
};

export default App;

