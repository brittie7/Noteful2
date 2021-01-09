import React from "react";
import "./App.css";
import Folders from "./components/Folders/Folders";
import Notes from "./components/Notes/Notes";
import { Route, Link } from "react-router-dom";
import Note from "./components/Note/Note";
import AddFolder from "./components/AddFolder/AddFolder";
import AddNote from "./components/AddNote/AddNote";
import ErrorBoundary from "./components/ErrorBoundary";
import NotefulContext from "./NotefulContext";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      notes: [],
      error: null,
    };
  }

  componentDidMount() {
    fetch("http://localhost:9090/folders", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((data) => this.setState({ folders: data }))
      .catch((error) => this.setState({ error }));

    fetch("http://localhost:9090/notes", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((data) => this.setState({ notes: data }))
      .catch((error) => this.setState({ error }));
  }

  updateName(folder) {
    this.setState({ folders: { name: folder, touched: false } });
  }

  updateFolders = (newFolder) => {
    const existingFolders = this.state.folders;
    const newFolderObj = { name: newFolder };
    existingFolders.push(newFolderObj);
    this.setState({ folders: existingFolders });
  };

  updateNotes = (noteDetail) => {
    const existingNotes = this.state.notes;
    existingNotes.push(noteDetail);
    this.setState({ notes: existingNotes });
  };

  render() {
    const value = {
      folders: this.state.folders,
      notes: this.state.notes,
      updateFolders: this.updateFolders,
      updateNotes: this.updateNotes,
    };

    return (
      <NotefulContext.Provider value={value}>
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
                render={(props) => (
                  <Notes {...props} notes={this.state.notes} />
                )}
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
                    <AddNote {...props} folders={this.state.folders} />
                  )}
                />{" "}
              </ErrorBoundary>
            </section>
          </main>
        </div>
      </NotefulContext.Provider>
    );
  }
}
