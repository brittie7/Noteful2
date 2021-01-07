import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default class Note extends React.Component {
  static defaultProps = {
    content: "Test Content",
    name: "Test Name",
    modified: "2020-01-01",
  };
  render() {
    return (
      <div className="Note">
        {this.props.match.params.noteid ? (
          <>
            <h2>{this.props.name}</h2>
            <p>{this.props.content}</p>
            <p>{this.props.modified}</p>
          </>
        ) : (
          <p>
            <Link to={`/note/${this.props.id}`}>{this.props.name}</Link>
          </p>
        )}
      </div>
    );
  }
}

Note.propTypes = {
  content: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  modified: PropTypes.string.isRequired,
};
