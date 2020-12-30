import React from "react";
import Note from "../Note/Note";
import { Link } from "react-router-dom";

export default class Notes extends React.Component {
  static defaultProps = {
    notes: [],
  };
  render() {
    //checks to see if the route id that we clicked on matches the folder id in state
    const noteList = this.props.match.params.folderid
      ? this.props.notes.filter(
          (n) => n.folderId === this.props.match.params.folderid
        )
      : this.props.notes;

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
