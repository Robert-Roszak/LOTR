import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters, fetchCharactersFilters } from '../../../redux/charactersRedux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

import styles from './Characters.module.scss';

const Component = ({className}) => {
  const dispatch = useDispatch();
  const [limit, setFetchLimit] = useState(10);
  const [page, setFetchPage] = useState(1);
  const [searchFilter, setSearchFilter] = useState('name');
  const [searchText, setSearchText] = useState('');
  const [searchActive, setSearch] = useState(false);

  useEffect(() => {
    if (searchActive) dispatch(fetchCharactersFilters(limit, page, searchFilter, searchText));
    else dispatch(fetchCharacters(limit,page));
  },[dispatch, limit, page, searchActive, searchFilter, searchText]);

  const characters = useSelector((state) => state.characters.data);

  const handlePages = (status) => {
    if (page > 1 && status === 'prev') setFetchPage(page-1);
    else if (page < characters.pages && status === 'next') setFetchPage(page+1);
  };

  const handlePagination = () => {
    let items = [];

    if (page <= 3) {
      let pagesCount = 5;
      if (characters.pages <= 5) pagesCount = characters.pages;
      for (let pagination = 1; pagination <= pagesCount; pagination++) {
        items.push(
          <Pagination.Item key={pagination} active={pagination === page} onClick={() => setFetchPage(pagination)} >
            {pagination}
          </Pagination.Item>
        );
      }
      return items;
    }
    else if (page > 3 && page <= characters.pages -2) {
      for (let pagination = page-2; pagination <= page + 2; pagination++) {
        items.push(
          <Pagination.Item key={pagination} active={pagination === page} onClick={() => setFetchPage(pagination)}>
            {pagination}
          </Pagination.Item>
        );
      }
      return items;
    }
    else {
      for (let pagination = characters.pages-3; pagination <= characters.pages; pagination++) {
        items.push(
          <Pagination.Item key={pagination} active={pagination === page} onClick={() => setFetchPage(pagination)}>
            {pagination}
          </Pagination.Item>
        );
      }
      return items;
    }
  };

  const runSearch = (event) => {
    event.preventDefault();
    const searchFilter = document.getElementById('searchFilters').value;
    const searchText = document.getElementById('searchText').value;
    setSearchFilter(searchFilter);
    setSearchText(searchText);
    setSearch(true);
    setFetchPage(1);
  };

  const handleFetchLimit = (event) => {
    setFetchPage(1);
    setFetchLimit(event.target.value);
  };

  if (characters) {
    return (
      <Container className={styles.root}>
        <Row className={clsx('justify-content-md-center', styles.parameters)}>
          <Col xs lg='10' className={styles.parameterCol}>
            <label>Search by: </label>
            <select name='filters' id='searchFilters'>
              <option value='name'>Name</option>
              <option value='race'>Race</option>
              <option value='gender'>Gender</option>
              <option value='birth'>Birth</option>
              <option value='death'>Death</option>
              <option value='hair'>Hair</option>
              <option value='height'>Height</option>
              <option value='realm'>Realm</option>
              <option value='spouse'>Spouse</option>
            </select>
            <input type='text' id='searchText' placeholder='Search criteria (exact match)' className={styles.searchText}/>
            <Button onClick={(event) => runSearch(event)}>Search</Button>
          </Col>
          <Col xs lg='2' className={styles.parameterCol}>
            <label>Show results: </label>
            <select name='fetchLimit' id='fetchLimit' onChange={(event) => handleFetchLimit(event)}>
              <option value='10'>10</option>
              <option value='20'>20</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
            </select>
          </Col>
        </Row>

        <Row className='justify-content-md-center'>
          <Table striped bordered hover size='sm'>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Race</th>
                <th>Gender</th>
                <th>Birth</th>
                <th>Death</th>
                <th>Hair</th>
                <th>Height</th>
                <th>Realm</th>
                <th>Spouse</th>
                <th>Wiki URL</th>
              </tr>
            </thead>
            <tbody>
              {
                characters.docs.map((character, i) => {
                  return (
                    <tr key={character._id}>
                      <td>{i+1}.</td>
                      <td>{character.name}</td>
                      <td>{character.race}</td>
                      <td>{character.gender}</td>
                      <td>{character.birth}</td>
                      <td>{character.death}</td>
                      <td>{character.hair}</td>
                      <td>{character.height}</td>
                      <td>{character.realm}</td>
                      <td>{character.spouse}</td>
                      {
                        character.wikiUrl ?
                          <td><a target='_blank' rel='noopener noreferrer' href={character.wikiUrl} >Link to Wiki</a></td>
                          :
                          <td></td>
                      }
                    </tr>
                  );
                })
              }
            </tbody>
          </Table>
          <Pagination>
            <Pagination.First onClick={() => setFetchPage(1)} disabled={page === 1}/>
            <Pagination.Prev onClick={() => handlePages('prev')} disabled={page === 1}/>
            {handlePagination()}
            <Pagination.Next onClick={() => handlePages('next')} disabled={page === characters.pages}/>
            <Pagination.Last onClick={() => setFetchPage(characters.pages)} disabled={page === characters.pages}/>
          </Pagination>
        </Row>
      </Container>
    );
  }
  else return (
    <Spinner animation='border' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};

export {
  Component as Characters,
  Component as CharactersComponent,
};
