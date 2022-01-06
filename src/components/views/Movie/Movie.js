import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchOneMovie as fetchOneMovieFromAPI } from '../../../redux/moviesRedux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import clsx from 'clsx';
import styles from './Movie.module.scss';

const Component = ({className}) => {
  const dispatch = useDispatch();
  const {id} = useParams();

  useEffect(() => {
    dispatch(fetchOneMovieFromAPI(id));
  },[dispatch, id]);

  const movie = useSelector((state) => state.movies.data);
  console.log('movie: ', movie);


  if (movie) {
    const details = movie.movieDetails[0];
    const quotes = movie.quotes;
    console.log('details: ', details);
    console.log('quotes: ', quotes);
    return (
      <Container className={clsx(className, styles.root)}>
        <Row className="justify-content-md-center">
          <Col>
            <p>{details.name}</p>
            <p>Academy Award Nominations: {details.academyAwardNominations}</p>
            <p>Academy Award Wins: {details.academyAwardWins}</p>
            <p>Box Office revenue in millions: ${details.boxOfficeRevenueInMillions}</p>
            <p>Budget in millions: ${details.budgetInMillions}</p>
            <p>Rotten Tomatoes score: {parseInt(details.rottenTomatoesScore)}</p>
            <p>Total runtime: {details.runtimeInMinutes} minutes</p>
            { quotes.length !== 0 && <p className="text-muted"><i>Show random quote - comming soon</i></p>}
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
  Component as Movie,
  Component as MovieComponent,
};
