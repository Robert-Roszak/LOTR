import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchRandomQuote } from '../../../redux/quotesRedux';

import styles from './Quote.module.scss';

const Component = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRandomQuote());
  }, [dispatch]);

  const quote = useSelector((state) => state.quotes.data);

  if (quote) {
    return (
      <div className={styles.root}>
        <blockquote>{quote.quote}</blockquote>
        <cite>- {quote.character}, {quote.movie}</cite>
      </div>
    );
  }
  else {
    return (
      <></>
    );
  }
};

export {
  Component as Quote,
  Component as QuoteComponent,
};
