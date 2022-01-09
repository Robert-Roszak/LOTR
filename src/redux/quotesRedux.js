import Axios from 'axios';

/* action name creator */
const reducerName = 'quotes';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

/* thunk creators */
export const fetchRandomQuote = () => {
  return (dispatch, getState) => {
    Axios
      .get('http://localhost:8000/api/quotes/random')
      .then(res => {
        console.log('res.data: ', res.data);
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};
/*
export const fetchProducts = () => {
  return (dispatch, getState) => {
    const { products } = getState();
    if (products.data.length === 0 && products.loading.active === false) {
      dispatch(fetchStarted());
      Axios
        .get('http://localhost:8000/api/products')
        .then(res => {
          dispatch(fetchSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchError(err.message || true));
        });
    }
  };
};

export const fetchOneProductFromAPI = (_id) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    Axios.get(`http://localhost:8000/api/products/${_id}`)
      .then((res) => {
        dispatch(fetchOneProduct(res.data));
      })
      .catch((err) => {
        dispatch(fetchError(err.message || true));
      });
  };
};
 */
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
    default:
      return statePart;
  }
};
