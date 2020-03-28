import React, { useEffect } from "react";
import { fetchCharacters } from "../redux/actions";
import CharacterCard from "../components/CharacterCard/";
import { useDispatch, useSelector } from "react-redux";
import { DebounceInput } from "react-debounce-input";
import Loader from "../components/Loader";
const HomePage = ({ characters, isFetching, handleSearchFunc, search }) => {
  return (
    <div className="App">
      {isFetching ? (
        <Loader />
      ) : (
        <section>
          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <DebounceInput
                  value={search}
                  minLength={3}
                  className="form-control"
                  placeholder="search for character"
                  debounceTimeout={100}
                  onChange={(event) => handleSearchFunc(event)}
                />
              </div>
            </div>
          </div>
          {characters && characters.length ? (
            <div className="row pt-3">
              {characters.map((character) => (
                <div className="col-xl-3 col-12 mb-3" key={character.id}>
                  <CharacterCard
                    id={character.id}
                    thumbnail={character.thumbnail}
                    name={character.name}
                    description={character.description}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="container">No characters found!</div>
          )}
        </section>
      )}
    </div>
  );
};
const ConnectedHomePage = (props) => {
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState("");

  useEffect(() => {
    dispatch(fetchCharacters());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const characters = useSelector((state) => state.characters);

  const handleSearchFunc = (event) => {
    let search_text = event.target.value.toLowerCase();
    setSearch(search_text);
  };
  let filter_characters;

  if (characters) {
    filter_characters = characters.filter((character) => {
      return character.name.toLowerCase().includes(search);
    });
  }

  const isFetching = useSelector((state) => state.isFetching);

  return (
    <HomePage
      characters={filter_characters}
      search={search}
      handleSearchFunc={handleSearchFunc}
      isFetching={isFetching}
    />
  );
};
export default ConnectedHomePage;
