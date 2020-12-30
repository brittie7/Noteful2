import React from "react";

export default class AddFolder extends React.Component {
  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <section>
        <form
          className="add-folder"
          action="/folders"
          method="post"
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <h2>Create New Folder</h2>
          <label htmlFor="name">Folder Name</label>
          <input
            type="text"
            className="newFolder"
            name="name"
            ref={this.nameInput}
            defaultValue="New Folder"
            onChange={(e) => this.updateName(e.target.value)}
          ></input>
          <button type="submit" className="new__button">
            Add New Folder
          </button>
        </form>
      </section>
    );
  }
}
