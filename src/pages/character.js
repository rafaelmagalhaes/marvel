import React, { useEffect, useState } from "react";
import {
  fetchSingleCharacter,
  publishUpdatedCharacter,
} from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import CharacterDetail from "../components/CharacterDetail";
import Modal from "../components/Modal";
import { base64, getBase64Image } from "../helpers/shared";
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
          <CharacterDetail
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
  const character = useSelector((state) =>
    state.results.find((character) => character.id === parseInt(id))
  );
  useEffect(() => {
    dispatch(fetchSingleCharacter(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (character && !character.thumbnail.extension) {
      let img = document.getElementsByClassName(`character-${id}`);
      img[0].src = character.thumbnail.path;
      getBase64Image(img[0]);
    }
  }, [id]);

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

  const handleImageChange = (e) => {
    let numb = e.target.files[0].size / 1024 / 1024;
    numb = numb.toFixed(2);
    if (numb > 1) {
      alert(
        "to big, maximum image size is 1MB. Your image size is: " + numb + " MB"
      );
      e.target.value = "";
    } else {
      base64(e.target.files[0], (result) => {
        setImage({ path: result, extension: "" });
      });
    }
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
