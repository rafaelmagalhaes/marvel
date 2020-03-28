import React from "react";

const Index = ({
  saveChanges,
  closeModal,
  handleNameInputChanges,
  name,
  handleImageChange,
}) => {
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit Character
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <input
              onChange={(e) => handleNameInputChanges(e.target.value)}
              type="text"
              placeholder="Name"
              defaultValue={name}
            />
            <input
              type="file"
              accept="image/x-png,image/gif,image/jpeg"
              onChange={handleImageChange.bind(this)}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModal}
            >
              Close
            </button>
            <button
              type="button"
              onClick={saveChanges}
              className="btn btn-primary"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
