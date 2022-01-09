import React, { useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Quote } from '../../features/Quote/Quote';

import { fetchRandomQuote } from '../../../redux/quotesRedux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faFilm, faUsers } from '@fortawesome/free-solid-svg-icons';
import { IMAGES_URL } from '../../../config';

import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Homepage.module.scss';

const Component = ({className}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRandomQuote());
  }, [dispatch]);

  const quote = useSelector((state) => state.quotes.data);

  if (quote) {
    return (
      <div className={clsx(className, styles.root)}>
        <Container>
          <h1 className={styles.title}>Lord of the Rings and Hobbit database</h1>
          <Row className={styles.imageWrapper}>
            <img className={styles.image} src={`${IMAGES_URL}/homepage_image.jpg`} alt='homepage_image' />
          </Row>
          <Row className="g-4">
            <Col xs lg="4">
              <Card border="secondary">
                <Card.Body>
                  <Card.Title className={styles.cardTitle}>
                    <a href='/books'>Show books</a>
                    <div className={styles.iconWrapper}>
                      <FontAwesomeIcon className={styles.icon} icon={faBook} />
                    </div>

                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>

            <Col xs lg="4">
              <Card border="secondary">
                <Card.Body>
                  <Card.Title className={styles.cardTitle}>
                    <a href='/movies'>Show movies</a>
                    <div className={styles.iconWrapper}>
                      <FontAwesomeIcon className={styles.icon} icon={faFilm} />
                    </div>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>

            <Col xs lg="4">
              <Card border="secondary">
                <Card.Body>
                  <Card.Title className={styles.cardTitle}>
                    <a href='/characters'>Show characters</a>
                    <div className={styles.iconWrapper}>
                      <FontAwesomeIcon className={styles.icon} icon={faUsers} />
                    </div>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Quote quote={quote} />
        </Container>
      </div>
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
  Component as Homepage,
  Component as HomepageComponent,
};
