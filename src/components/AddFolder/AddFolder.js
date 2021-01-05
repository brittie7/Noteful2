import React from "react";
import NotefulContext from "../../NotefulContext";

export default class AddFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: "",
        touched: false,
      },
    };
  }
  static contextType = NotefulContext;

  handleSubmit(event) {
    event.preventDefault();
    const name = this.state.name.value;
    const options = {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:9090/folders", options)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later");
        }
        this.context.updateFolders(name);
        return res.json();
      })
      .catch((error) => {
        console.error({ error });
      });
    this.props.history.push("/");
  }

  updateName = (name) => {
    let updatedName = this.state.name;
    updatedName.value = name;
    this.setState({ name: updatedName });
  };

  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return "Name is required";
    }
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
          <button
            type="submit"
            className="new__button"
            disabled={this.validateName()}
          >
            Add New Folder
          </button>
        </form>
      </section>
    );
  }
}
