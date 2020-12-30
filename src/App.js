import React from "react";
import "./index.css";
import Folders from "./components/Folders/Folders";
import Notes from "./components/Notes/Notes";
import store from "./dummy-store";
import { Route, Link } from "react-router-dom";
import Note from "./components/Note/Note";
import AddFolder from "./components/AddFolder/AddFolder";
import AddNote from "./components/AddNote/AddNote";
import ErrorBoundary from "./components/ErrorBoundary";
import PropTypes from "prop-types";

// const MyContext = React.createContext();

// class MyProvider extends Component {}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = store;
  }

  //METHODS//
  updateName(folder) {
    this.setState({ folders: { name: folder, touched: false } });
  }
  render() {
    return (
      <div className="App">
        <header>
          <h1>
            <Link to="/">Noteful</Link>
          </h1>
        </header>
        <main>
          <aside>
            {" "}
            Folders
            <Route
              path="/"
              render={(props) => (
                <Folders {...props} folders={this.state.folders} />
              )}
            />
          </aside>
          <section>
            {" "}
            Notes
            <Route
              exact
              path={["/", "/folder/:folderid"]}
              render={(props) => <Notes {...props} notes={this.state.notes} />}
            />
            <Route
              path="/note/:noteid"
              render={(rprops) => {
                const note =
                  this.state.notes.find(
                    (n) => n.id === rprops.match.params.noteid
                  ) || {};
                return <Note {...note} {...rprops} />;
              }}
            />
            <ErrorBoundary>
              <Route path="/NewFolder" component={AddFolder} />
              <Route
                path="/NewNote"
                render={(props) => (
                  <AddNote {...props} notes={this.state.folders} />
                )}
              />{" "}
            </ErrorBoundary>
          </section>
        </main>
      </div>
    );
  }
}
