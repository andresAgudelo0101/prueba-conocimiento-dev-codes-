
// TYPES
const START_CODIGO_MATRICULA = "[USER]/START_CODIGO_MATRICULA";

const initialState = {
  matricula:"",
};

// REDUCER
export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case START_CODIGO_MATRICULA:
      return {
        ...state,
        matricula: action.payload.matricula,
      };
    default:
      return state;
  }
}

// SELECTORS
export const getCodigoMatricula = (state) => state.user?.matricula;


// ACTIONS
export const startCodigoMatricula = (payload) => ({ type: START_CODIGO_MATRICULA, payload });