import React from "react";
import PropTypes from "prop-types";
import NotefulContext from "../../NotefulContext";

export default class AddNote extends React.Component {
  static contextType = NotefulContext;

  handleSubmit(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const folderId = event.target.folder.value;
    const content = event.target.content.value;
    const noteDetail = { name, folderId, content };
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
        return res.json();
      })
      .then((newNote) => {
        this.context.updateNotes(newNote);
        this.props.history.push("/");
      });
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
            aria-label="New Note Title"
            aria-required="true"
            required
          />
          <label htmlFor="note-content">Note Content:</label>
          <textarea id="note-content" name="content" required></textarea>
          <label htmlFor="folder">Choose a folder:</label>
          <select id="folder" name="folder" required>
            {folderOptions.map((options) => (
              <option key={options.id} value={options.id}>
                {options.name}
              </option>
            ))}
          </select>

          <button type="submit" className="new__button">
            Add New Note
          </button>
        </form>
      </section>
    );
  }
}

AddNote.propTypes = {
  history: PropTypes.object,
};
