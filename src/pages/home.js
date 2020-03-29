import React, { useEffect } from "react";
import { fetchCharacters } from "../redux/actions";
import { useHistory } from "react-router-dom";

import CharacterCard from "../components/CharacterCard/";
import { useDispatch, useSelector } from "react-redux";
import { DebounceInput } from "react-debounce-input";
import ReactPaginate from "react-paginate";
import queryString from "query-string";

import Loader from "../components/Loader";
const HomePage = ({
  characters,
  isFetching,
  handleSearchFunc,
  search,
  pageCount,
  page,
  handlePageClick,
}) => {
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
            <div className="pt-3">
              <div className="row">
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
              <div className="row">
                <div className="col">
                  <div className="d-flex justify-content-center">
                    <ReactPaginate
                      previousLabel={"previous"}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={2}
                      forcePage={page}
                      pageCount={pageCount}
                      onPageChange={handlePageClick}
                      containerClassName={"pagination"}
                      pageClassName={"page-item"}
                      pageLinkClassName={"page-link"}
                      previousClassName={"page-item"}
                      breakClassName={"page-item"}
                      breakLinkClassName={"page-link"}
                      previousLinkClassName={"page-link"}
                      nextClassName={"page-item"}
                      nextLinkClassName={"page-link"}
                      activeClassName={"active"}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="container">No characters found!</div>
          )}
        </section>
      )}
    </div>
  );
};
const ConnectedHomePage = ({ location }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState("");
  const { limit, total, results, isFetching } = useSelector((state) => state);
  const [page, setPage] = React.useState(0);
  const history = useHistory();

  let offset = queryString.parse(location.search).offset
    ? queryString.parse(location.search).offset
    : 0;

  useEffect(() => {
    dispatch(fetchCharacters(parseInt(offset)));
    if (queryString.parse(location.search).offset) {
      setPage(parseInt(offset) / limit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);
  const pageCount = Math.ceil(total / limit);
  const characters = results;

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

  const handlePageClick = ({ selected }) => {
    if (selected !== 1) {
      offset = selected * limit;
    } else if (selected === 1) {
      offset = 12;
    } else {
      offset = 0;
    }
    history.push({
      pathname: "/",
      search: `?offset=${offset}`,
    });
    setPage(selected);
  };
  return (
    <HomePage
      characters={filter_characters}
      search={search}
      handleSearchFunc={handleSearchFunc}
      isFetching={isFetching}
      pageCount={pageCount}
      page={page}
      handlePageClick={handlePageClick}
    />
  );
};
export default ConnectedHomePage;
