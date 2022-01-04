import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Homepage.module.scss';

const Component = ({className}) => {

  return (
    <div className={clsx(className, styles.root)}>
      <h2>Homepage</h2>
      <Container>
        <Row className="g-4">
          <a href='/books'>show books</a>
        </Row>
      </Container>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};

export {
  Component as Homepage,
  Component as HomepageComponent,
};
