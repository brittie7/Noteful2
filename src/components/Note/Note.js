import React from "react";
import { Link } from "react-router-dom";

export default class Note extends React.Component {
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
