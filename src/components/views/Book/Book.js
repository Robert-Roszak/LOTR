import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchOneBook as fetchOneBookFromAPI } from '../../../redux/booksRedux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import clsx from 'clsx';

import styles from './Book.module.scss';

const Component = ({className}) => {
  const dispatch = useDispatch();
  const {id} = useParams();

  useEffect(() => {
    dispatch(fetchOneBookFromAPI(id));
  },[dispatch, id]);

  const book = useSelector((state) => state.books.data);

  if (book) {
    return (
      <Container className={clsx(className, styles.root)}>
        <Row className="justify-content-md-center">
          <Col key={book._id}>
            <p>The book has {book.total} chapters</p>
            {
              book.docs.map((chapter, i) => {
                return (
                  <p key={chapter._id}>{i+1}. {chapter.chapterName}</p>
                );
              })
            }
          </Col>
        </Row>
      </Container>
    );
  }
  else return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};

export {
  Component as Book,
  Component as BookComponent,
};
