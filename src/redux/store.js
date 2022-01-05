import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { initialState } from './initialState';
import { reducer as booksReducer } from './booksRedux';
/* import { reducer as moviesReducer } from './moviesRedux';
import { reducer as charactersReducer } from './charactersRedux';
import { reducer as quotesReducer } from './quotesRedux';
import { reducer as chaptersReducer } from './chaptersRedux'; */

// define reducers
const reducers = {
  books: booksReducer,
/*   movies: moviesReducer,
  characters: charactersReducer,
  quotes: quotesReducer,
  chapters: chaptersReducer, */
};

// add blank reducers for initial state properties without reducers
Object.keys(initialState).forEach(item => {
  if (typeof reducers[item] == 'undefined') {
    reducers[item] = (statePart = null) => statePart;
  }
});

const combinedReducers = combineReducers(reducers);

// create store
export const store = createStore(
  combinedReducers,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);
