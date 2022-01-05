import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import { fetchBooks } from '../../../redux/booksRedux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import NavLink from 'react-bootstrap/NavLink';

import clsx from 'clsx';

import styles from './Books.module.scss';

const Component = ({className}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  },[dispatch]);

  const books = useSelector((state) => state.books.data);

  if (books) {
    return (
      <Container className={clsx(className, styles.root)}>
        <Row className="justify-content-md-center">
          {
            books.docs.map(book => {
              return (
                <Col key={book._id} xs lg="4">
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        {book.name}
                      </Card.Title>
                      <Card.Text>
                        <Button variant="primary" className={styles.btn} as={NavLink} href={`/books/${book._id}`} >Show more info</Button>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          }
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
  Component as Books,
  Component as BooksComponent,
};
