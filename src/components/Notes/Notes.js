import React from "react";
import Note from "../Note/Note";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import NotefulContext from "../../NotefulContext";

export default class Notes extends React.Component {
  static contextType = NotefulContext;

  static defaultProps = {
    folderid: "",
  };
  render() {
    const noteList = this.props.match.params.folderid
      ? this.context.notes.filter(
          (n) => n.folderId === this.props.match.params.folderid
        )
      : this.context.notes;

    return (
      <div className="Notes">
        <ul>
          {noteList.map((note) => (
            <li key={note.id}>
              <Note {...this.props} {...note} />
            </li>
          ))}
        </ul>
        <Link to="/NewNote" className="AddButton">
          New Note
        </Link>
      </div>
    );
  }
}

Notes.propTypes = {
  folderid: PropTypes.string.isRequired,
};
