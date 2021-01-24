import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import NotefulContext from "../../NotefulContext";
import { withRouter } from "react-router-dom";

class Folders extends React.Component {
  static contextType = NotefulContext;

  render() {
    const url = window.location.href;
    let indexOfFolder = url.indexOf("folder");
    let folderId = url.substring(indexOfFolder + 7, url.length);

    return (
      <div className="Folders">
        <ul>
          {this.context.folders.map((folder, index) => (
            <li
              key={index}
              onClick={this.handleClick}
              className={folder.id === folderId ? "selected" : "unselected"}
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
}
Folders.propTypes = {
  folders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

export default withRouter(Folders);
