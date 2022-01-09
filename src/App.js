import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './redux/store';

import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { Homepage } from './components/views/Homepage/Homepage';
import { Books } from './components/views/Books/Books';
import { Book } from './components/views/Book/Book';
import { Movies } from './components/views/Movies/Movies';
import { Movie } from './components/views/Movie/Movie';
import { Characters } from './components/views/Characters/Characters';
import { NotFound } from './components/views/NotFound/NotFound';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <MainLayout>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/books' component={Books} />
          <Route exact path='/books/:id' component={Book} />
          <Route exact path='/movies' component={Movies} />
          <Route exact path='/movies/:id' component={Movie} />
          <Route exact path='/characters' component={Characters} />
          <Route path='*' component={NotFound} />
        </Switch>
      </MainLayout>
    </BrowserRouter>
  </Provider>
);

export { App };
