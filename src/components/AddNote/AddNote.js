import React from "react";
import ValidationError from "../ValidationError/ValidationError";

export default class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: "",
        touched: false,
      },
    };
  }
  handleSubmit(event) {
    event.preventDefault();
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

  render() {
    const folderOptions = this.props.notes;

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
          <label for="note-content">Note Content:</label>
          <textarea id="note-content" name="content"></textarea>
          <label for="folder">Choose a folder:</label>
          <select id="folder" name="folder">
            {folderOptions.map((options) => (
              <option value={options.name}>{options.name}</option>
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
