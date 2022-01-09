import React from 'react';
import PropTypes from 'prop-types';

import styles from './Quote.module.scss';

const Component = ({quote}) => {
  return (
    <div className={styles.root}>
      <blockquote>{quote.quote}</blockquote>
      <cite>- {quote.character}, {quote.movie}</cite>
    </div>
  );
};

Component.propTypes = {
  quote: PropTypes.object,
};

export {
  Component as Quote,
  Component as QuoteComponent,
};
