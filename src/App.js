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
/* import { Character } from './components/views/Character/Character';
import { Quotes } from './components/views/Quotes/Quotes';
import { Quote } from './components/views/Quote/Quote';
import { Chapters } from './components/views/Chapters/Chapters';
import { Chatper } from './components/views/Chatper/Chatper'; */
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
          {/* <Route exact path='/characters/:id' component={Character} />
          <Route exact path='/quotes' component={Quotes} />
          <Route exact path='/quotes/:id' component={Quote} />
          <Route exact path='/chapters' component={Chapters} />
          <Route exact path='/chapters/:id' component={Chatper} /> */}
          <Route path='*' component={NotFound} />
        </Switch>
      </MainLayout>
    </BrowserRouter>
  </Provider>
);

export { App };
