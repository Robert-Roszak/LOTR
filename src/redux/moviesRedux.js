import Axios from 'axios';

/* action name creator */
const reducerName = 'movies';
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const FETCH_ONE_PRODUCT = createActionName('FETCH_ONE_PRODUCT');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const fetchOneProduct = payload => ({ payload, type: FETCH_ONE_PRODUCT });

/* thunk creators */
export const fetchMovies = () => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    Axios
      .get('http://localhost:8000/api/movies')
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const fetchOneMovie = (_id) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    let one = `http://localhost:8000/api/movies/${_id}`;
    let two = `http://localhost:8000/api/movies/${_id}/quote`;

    const requestOne = Axios.get(one);
    const requestTwo = Axios.get(two);

    Axios
      .all([requestOne, requestTwo])
      .then(
        Axios.spread((...responses) => {
          let movie = {};
          console.log('responses: ', responses);
          movie.movieDetails = responses[0].data.docs;
          movie.quotes = responses[1].data.docs;
          dispatch(fetchSuccess(movie));
        })).catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case FETCH_ONE_PRODUCT: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        oneProduct: action.payload,
      };
    }
    default:
      return statePart;
  }
};
