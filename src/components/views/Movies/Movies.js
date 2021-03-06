import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import { fetchMovies } from '../../../redux/moviesRedux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import NavLink from 'react-bootstrap/NavLink';

import styles from './Movies.module.scss';

const Component = ({className}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  },[dispatch]);

  const movies = useSelector((state) => state.movies.data);

  if (movies) {
    return (
      <Container className={styles.root}>
        <Row className="justify-content-md-center">
          {
            movies.docs.map(movie => {
              return (
                <Col key={movie._id} xl="3" lg="4" md="6" sm="12">
                  <Card className={styles.card}>
                    <Card.Body>
                      <Card.Title>
                        <i>{movie.name}</i>
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">Rotten Tomatoes score: {parseInt(movie.rottenTomatoesScore)}/100</Card.Subtitle>
                      <Card.Text>
                        <Button variant="primary" className={styles.btn} as={NavLink} href={`/movies/${movie._id}`} >Show more info</Button>
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
  Component as Movies,
  Component as MoviesComponent,
};
