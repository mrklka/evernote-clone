import React, { Component } from 'react';
import 'jquery';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NotesList from "./components/note-list";
import EditNotes from "./components/edit-note";
import CreateNote from "./components/create-note";
import CreateUser from "./components/register";
import Trash from "./components/trash";
import EditTrashcanNote from "./components/edit-trashcan-note";
import Login from './components/login';
import Register from './components/register-user';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
    }

    this.onChangeSidebarsearch = this.onChangeSidebarsearch.bind(this);





  }

  onChangeSidebarsearch(search) {
    this.setState({
      searchQuery: search
    })

  }

  render() {
    const token = localStorage.getItem('authToken')

    return (
      <div>
        <Router>

        <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          {
            token ? 
            <div className="container">
            <Route path="/" exact component={() => <NotesList searchQuery={this.searchQuery} />} />


            {/* <Route path="/" exact component={NotesList} /> */}
            <Route path="/edit/:id" component={EditNotes} />
            <Route path="/trash/:id" component={EditTrashcanNote} />
            <Route path="/create" component={CreateNote} />
            <Route path="/notebooks" component={CreateUser} />
            <Route path="/trash" component={Trash} />

          </div>
          :
          <div>
            <Route path="/" component={Login} />
          </div>
          }
        </Router>
      </div>
    )
  }
}

export default App;