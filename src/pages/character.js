import React, { useEffect, useState } from "react";
import {
  fetchSingleCharacter,
  publishUpdatedCharacter,
} from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import CharacterCard from "../components/CharacterCard";
import Modal from "../components/Modal";
import { base64 } from "../helpers/shared";
import Loader from "../components/Loader";
const CharacterPage = (props) => {
  const {
    character,
    isFetching,
    id,
    updateCharacter,
    openModal,
    closeModal,
    handleNameInputChanges,
    handleImageChange,
  } = props;
  return (
    <div className="container">
      {isFetching || !character ? (
        <Loader />
      ) : (
        <div>
          <CharacterCard
            id={id}
            name={character.name}
            thumbnail={character.thumbnail}
            description={character.description}
            stories={character.stories}
            series={character.series}
            events={character.events}
            details={character.urls}
            openModal={openModal}
          />

          <Modal
            name={character.name}
            saveChanges={updateCharacter}
            handleNameInputChanges={handleNameInputChanges}
            handleImageChange={handleImageChange}
            closeModal={closeModal}
          />
        </div>
      )}
    </div>
  );
};

const ConnectedCharacterPage = (props) => {
  const {
    match: {
      params: { id },
    },
  } = props;
  const dispatch = useDispatch();
  const [updatedName, updateName] = useState("");
  const [updateImage, setImage] = useState({});

  useEffect(() => {
    dispatch(fetchSingleCharacter(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const character = useSelector((state) =>
    state.characters.find((character) => character.id === parseInt(id))
  );

  const updateCharacter = (e) => {
    e.preventDefault();
    if (updatedName) {
      character.name = updatedName;
    }
    if (updateImage.path) {
      character.thumbnail = updateImage;
    }

    dispatch(publishUpdatedCharacter(character));
    closeModal(e);
  };
  const openModal = (e) => {
    e.preventDefault();
    document.body.classList.add("modal-open");
    document.getElementById("exampleModal").classList.add("show");
    document.getElementById("exampleModal").style.display = "block";
  };
  const closeModal = (e) => {
    e.preventDefault();
    document.body.classList.remove("modal-open");
    document.getElementById("exampleModal").classList.remove("show");
    document.getElementById("exampleModal").style.display = "none";
  };
  const handleNameInputChanges = (name) => {
    updateName(name);
  };

  const handleImageChange = (file) => {
    base64(file.target.files[0], (result) => {
      setImage({ path: result, extension: "" });
    });
  };
  const isFetching = useSelector((state) => state.isFetching);
  return (
    <CharacterPage
      character={character}
      id={id}
      isFetching={isFetching}
      handleNameInputChanges={handleNameInputChanges}
      openModal={openModal}
      handleImageChange={handleImageChange}
      closeModal={closeModal}
      updateCharacter={updateCharacter}
    />
  );
};
export default ConnectedCharacterPage;
