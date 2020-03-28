import { API } from "./api";
import { findCharacterIndex } from "./../helpers/shared";
export const REQUEST_CHARACTERS = "REQUEST_CHARACTERS";
export const RECEIVE_CHARACTERS = "RECEIVE_CHARACTERS";
export const REQUEST_SINGLE_CHARACTER = "REQUEST_SINGLE_CHARACTER";
export const RECEIVE_SINGLE_CHARACTER = "RECEIVE_SINGLE_CHARACTER";
export const RECEIVE_ERROR = "RECEIVE_ERROR";
export const UPDATE_CHARACTER = "UPDATE_CHARACTER";

const requestCharacters = () => {
  return {
    type: REQUEST_CHARACTERS,
  };
};
const receiveError = () => {
  return { type: RECEIVE_ERROR };
};

const receiveCharacters = (data) => {
  return {
    type: RECEIVE_CHARACTERS,
    data,
  };
};

const requestSingleCharacter = () => {
  return {
    type: REQUEST_SINGLE_CHARACTER,
  };
};

const receiveSingleCharacter = (data) => {
  return {
    type: RECEIVE_SINGLE_CHARACTER,
    characters: data.results,
  };
};
const updateCharacterDetails = (data) => {
  return {
    type: UPDATE_CHARACTER,
    character: data,
  };
};

export const fetchCharacters = () => {
  return async (dispatch, getState) => {
    const characterUpdated = getState().characterUpdated;
    dispatch(requestCharacters());
    let url = API("characters");
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      if (characterUpdated && characterUpdated.length) {
        characterUpdated.map((char) => {
          const foundIndex = findCharacterIndex(
            data.data.results,
            parseInt(char.id)
          );
          data.data.results[foundIndex] = char;
        });
      }
      setTimeout(() => {
        //timeout so i can enjoy the animation of the loader
        return dispatch(receiveCharacters(data.data));
      }, 1500);
    } catch (error) {
      console.log(error);
      dispatch(receiveError());
    }
  };
};

export const publishUpdatedCharacter = (character) => {
  return (dispatch, getState) => {
    const characters = getState().characters;

    const foundIndex = findCharacterIndex(characters, parseInt(character.id));
    characters[foundIndex] = character;
    dispatch(updateCharacterDetails(characters[foundIndex]));
  };
};

export const fetchSingleCharacter = (id) => {
  return async (dispatch, getState) => {
    dispatch(requestSingleCharacter());
    let url = API(`characters/${id}`);
    const characterUpdated = getState().characterUpdated;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      if (characterUpdated && characterUpdated.length) {
        characterUpdated.map((char) => {
          const foundIndex = findCharacterIndex(
            data.data.results,
            parseInt(char.id)
          );
          data.data.results[foundIndex] = { ...char };
        });
      }
      setTimeout(() => {
        //timeout so i can enjoy the animation of the loader
        return dispatch(receiveSingleCharacter(data.data));
      }, 1500);
    } catch (error) {
      dispatch(receiveError());
      console.log(error);
    }
  };
};
