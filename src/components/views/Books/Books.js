import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import { fetchBooks } from '../../../redux/globalRedux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import NavLink from 'react-bootstrap/NavLink';
import clsx from 'clsx';

import { IMAGES_URL } from '../../../config';

import styles from './Books.module.scss';

const Component = ({className}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  },[dispatch]);


  return (
    <Container className={clsx(className, styles.root)}>
      <Row className="justify-content-md-center">

      </Row>
    </Container>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};

export {
  Component as Books,
  Component as BooksComponent,
};
