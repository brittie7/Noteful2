import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default class Folders extends React.Component {
  static defaultProps = {
    folders: [],
  };

  render() {
    return (
      <div className="Folders">
        <ul>
          {this.props.folders.map((folder) => (
            <li
              key={folder.id}
              onClick={this.handleClick}
              className={
                folder.id === this.props.match.params.folderid
                  ? "selected"
                  : "unselected"
              }
            >
              <Link to={`/folder/${folder.id}`}>{folder.name}</Link>
            </li>
          ))}
        </ul>
        <Link to="/NewFolder" className="AddButton">
          New Folder
        </Link>
      </div>
    );
  }
  // Folders.propTypes = {
  //   value: PropTypes.array
  // }
}
