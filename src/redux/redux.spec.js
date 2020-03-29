import characters from "./reducer";
import { UPDATE_CHARACTER } from "./actions";

const initState = {
  isFetching: false,
  results: [],
  characterUpdated: [],
};
const results = {
  offset: 0,
  limit: 20,
  count: 20,
  results: [],
};
describe("Characters Reducers", () => {
  it("returns the initial state when actions is not passed", () => {
    const reducer = characters(undefined, {});
    expect(reducer).toEqual(initState);
  });
  it("isFetching should be true when action REQUEST_CHARACTERS is called", () => {
    const reducer = characters(initState, { type: "REQUEST_CHARACTERS" });
    expect(reducer).toEqual({
      ...initState,
      isFetching: true,
    });
  });
  it("characters should receive a value  and isFetching should be set to false when action RECEIVE_CHARACTERS is called", () => {
    const reducer = characters(initState, {
      type: "RECEIVE_CHARACTERS",
      data: { ...results },
    });

    expect(reducer).toEqual({
      ...initState,
      isFetching: false,
      ...results,
    });
  });
  it("should update the result state with an updated value", () => {
    const reducer = characters(
      {
        ...initState,
        ...results,
        results: [{ name: "New Name", url: "test url", id: 1 }],
      },
      {
        type: UPDATE_CHARACTER,
        character: { name: "New Name", url: "test url", id: 1 },
      }
    );
    expect(reducer).toEqual({
      ...initState,
      characterUpdated: [{ name: "New Name", url: "test url", id: 1 }],
      ...results,
      results: [{ name: "New Name", url: "test url", id: 1 }],
    });
  });
});
