import pokemons from "./reducer";

describe("Pokemon Reducers", () => {
  const initState = {
    isFetching: false,
    pokemons: [],
    pokemon: {},
  };

  it("returns the initial state when actions is not passed", () => {
    const reducer = pokemons(undefined, {});
    expect(reducer).toEqual(initState);
  });
  it("isFetching should be true when action REQUEST_POKEMONS is called", () => {
    const reducer = pokemons(initState, { type: "REQUEST_POKEMONS" });
    expect(reducer).toEqual({
      isFetching: true,
      pokemons: [],
      pokemon: {},
    });
  });
  it("pokemons should receive a value with an id and isFetching should be set to false when action RECEIVE_POKEMONS is called", () => {
    expect(
      pokemons(
        {},
        {
          type: "RECEIVE_POKEMONS",
          pokemons: [{ name: "test pokemon", url: "test url" }],
        }
      )
    ).toEqual({
      isFetching: false,
      pokemons: [{ name: "test pokemon", url: "test url", id: 1 }],
    });
  });
});
