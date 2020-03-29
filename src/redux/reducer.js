import {
  REQUEST_CHARACTERS,
  REQUEST_SINGLE_CHARACTER,
  RECEIVE_CHARACTERS,
  RECEIVE_SINGLE_CHARACTER,
  RECEIVE_ERROR,
  UPDATE_CHARACTER,
} from "./actions";
import { persistReducer } from "redux-persist";
import { mergeById } from "./../helpers/shared";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "characters",
  storage,
};
const characters = (
  state = {
    isFetching: false,
    results: [],
    characterUpdated: [],
  },
  action
) => {
  switch (action.type) {
    case REQUEST_CHARACTERS:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
      });
    case REQUEST_SINGLE_CHARACTER:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_CHARACTERS:
      return Object.assign({}, state, {
        isFetching: false,
        ...action.data,
        results: mergeById(action.data.results, state.results),
      });
    case UPDATE_CHARACTER:
      return Object.assign({}, state, {
        results: mergeById(state.results, [action.character]),
        characterUpdated: state.characterUpdated.length
          ? mergeById([action.character], state.characterUpdated)
          : [...state.characterUpdated, action.character],
      });
    case RECEIVE_SINGLE_CHARACTER:
      return Object.assign({}, state, {
        isFetching: false,
        results: mergeById(action.characters, state.results),
      });
    default:
      return state;
  }
};

export default persistReducer(persistConfig, characters);
