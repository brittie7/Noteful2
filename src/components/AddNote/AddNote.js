import React from "react";
import ValidationError from "../ValidationError/ValidationError";
import PropTypes from "prop-types";
import NotefulContext from "../../NotefulContext";

export default class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: "",
        touched: false,
      },
      folderId: "",
    };
  }
  static contextType = NotefulContext;

  handleSubmit(event) {
    event.preventDefault();
    const name = this.state.name.value;
    const folderId = this.state.folderId;
    const noteDetail = { name, folderId };
    const options = {
      method: "POST",
      body: JSON.stringify(noteDetail),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:9090/notes", options)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later");
        }
        this.context.updateNotes(noteDetail);

        return res.json();
      })
      .catch((error) => {
        console.error({ error });
      });
    this.props.history.push("/");
  }

  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return "Name is required";
    }
  }

  updateName(name) {
    this.setState({ name: { value: name, touched: true } });
  }

  updateFolderId(id) {
    this.setState({ folderId: id });
  }

  render() {
    const folderOptions = this.context.folders;

    return (
      <section>
        <form
          className="add-note"
          action="/notes"
          method="post"
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <h2>Create New Note</h2>
          <label htmlFor="name">Add Note</label>
          <input
            type="text"
            className="newNote"
            name="name"
            ref={this.nameInput}
            defaultValue="New Note"
            onChange={(e) => this.updateName(e.target.value)}
          ></input>
          <label htmlFor="note-content">Note Content:</label>
          <textarea id="note-content" name="content"></textarea>
          <label htmlFor="folder">Choose a folder:</label>
          <select
            id="folder"
            name="folder"
            onChange={(e) => this.updateFolderId(e.target.value)}
          >
            {folderOptions.map((options) => (
              <option key={options.id} value={options.id}>
                {options.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="new__button"
            disabled={this.validateName()}
          >
            Add New Note
          </button>
        </form>
      </section>
    );
  }
}

AddNote.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      folderId: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      modified: PropTypes.string.isRequired,
    })
  ),
};
