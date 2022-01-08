import Axios from 'axios';

/* action name creator */
const reducerName = 'characters';
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
export const fetchCharacters = (limit, page) => {
  return (dispatch, getState) => {
    const { characters } = getState();
    if (Object.keys(characters).length !== 0) {
      if ((page !== characters.data.page || limit !== characters.data.limit) && !characters.data.searchActive) {
        Axios
          .get(`http://localhost:8000/api/characters?limit=${limit}&page=${page}`)
          .then(res => {
            res.data.searchActive = false;
            dispatch(fetchSuccess(res.data));
          })
          .catch(err => {
            dispatch(fetchError(err.message || true));
          });
      }
    }
    else {
      Axios
        .get(`http://localhost:8000/api/characters?limit=${limit}&page=${page}`)
        .then(res => {
          res.data.searchActive = false;
          dispatch(fetchSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchError(err.message || true));
        });
    }

  };
};

export const fetchCharactersFilters = (limit, page, filter, searchText) => {
  return (dispatch, getState) => {
    const { characters } = getState();
    if (page === characters.data.page || limit === characters.data.limit) {
      Axios
        .get(`http://localhost:8000/api/characters/filters?limit=${limit}&page=${page}&${filter}=${searchText}`)
        .then(res => {
          res.data.searchActive = true;
          dispatch(fetchSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchError(err.message || true));
        });
    }
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
