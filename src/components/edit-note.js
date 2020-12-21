import React, { Component } from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import NotesListPopulated from './sidebar-notes-list'
import ExpandMenuIcon from '@material-ui/icons/MoreVert';
import Navbar from "./navbar"



export default class EditNotes extends Component {
    constructor(props) {
        super(props);

        this.onChangeNotebook= this.onChangeNotebook.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.deleteNote = this.deleteNote.bind(this);

        this.state = {
            notebook: '',
            title: '',
            body: '',
            date: new Date(),
            notebooks: []
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('authToken')
        axios.get('http://localhost:5000/notes/' + this.props.match.params.id, {
            headers:{Authorization: token}
        })
            .then(response => {
                this.setState({
                    notebook: response.data.notebook,
                    title: response.data.title,
                    body: response.data.body,
                    date: new Date(response.data.date)
                })
            })
            .catch(function (error) {
                console.log(error);
            })

            axios.get('http://localhost:5000/notebooks/', {
                headers:{Authorization: token}
            })
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        notebooks: response.data.map(notebook => notebook.name),
                        notebook: response.data[0].name
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    onChangeNotebook(e) {
        this.setState({
            notebook: e.target.value
        })
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }

    onChangeBody(e) {
        this.setState({
            body: e.target.value
        })
    }

    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const note = {
            username: this.state.username,
            title: this.state.title,
            body: this.state.body,
            date: this.state.date
        }

        console.log(note);
        const token = localStorage.getItem('authToken')

        axios.post('http://localhost:5000/notes/update/' + this.props.match.params.id, note, 
        {
            headers:{Authorization: token}
        })
            .then(res => console.log(res.data));

        window.location = '/';
    }

    deleteNote() {
        const token = localStorage.getItem('authToken')

        axios.delete('http://localhost:5000/notes/' + this.props.match.params.id, 
        {
            headers:{Authorization: token}
        })
            .then(response => { console.log(response.data) });



        const trash = {
            notebook: this.state.notebook,
            title: this.state.title,
            body: this.state.body,
            date: this.state.date
        }

        console.log(trash);

        axios.post('http://localhost:5000/trash/add', trash,  {
            headers:{Authorization: token}
        })
            .then(res => console.log(res.data));

        window.location = '/';

    }

    render() {
        return (
            <div>
                <Navbar />
                <NotesListPopulated />

                <div id="active-note-wrapper">
                    <div id="active-note-containter">

                        <div id="active-note-titlebar">
                            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">

                                <li className="nav-item dropdown">
                                        <div className="form-group" >
                                            <select
                                                required
                                                id="notebook-dropdown"
                                                value={this.state.notebook}
                                                onChange={this.onChangeNotebook}
                                            >
                                                {
                                                    this.state.notebooks.map(function (notebook) {
                                                        return <option
                                                            key={notebook}
                                                            value={notebook}>{notebook}
                                                        </option>;
                                                    })
                                                }
                                            </select>
                                        </div>

                                    </li>                                </ul>
                                <form className="form-inline my-2 my-lg-0" onSubmit={this.onSubmit}>
                                    <a id="full-screen-button" className="nav-link" href="# ">Only you</a>

                                    <div className="form-group">
                                        <input type="submit" id="navbar-share-button" value="Save" className="btn btn-success my-2 my-sm-0" />
                                    </div>
                                </form>


                                <div className="btn-group dropleft">
                                    <div data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <ExpandMenuIcon fontSize="default" />
                                    </div>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item" href="# " onClick={this.deleteNote}>Delete Note</a>
                                    </div>
                                </div>

                            </nav>
                        </div>

                        <div id="active-note-titlebar-layertwo">
                            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                    <li className="nav-item">
                                        <p id="navbar-two-date">Last edited on
                                                   <span>   <DatePicker id="current-note-datepicker"
                                                selected={this.state.date}
                                                onChange={this.onChangeDate}
                                            /></span>
                                        </p>
                                    </li>
                                </ul>

                            </nav>
                        </div>
                        <div className="form-group">
                            <input type="text"
                                placeholder="Title"

                                id="current-note-text-title"
                                required
                                className="form-control"
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                placeholder="Start writing..."
                                id="current-note-text-body"
                                type="text"
                                rows="50"
                                className="form-control"
                                value={this.state.body}
                                onChange={this.onChangeBody}
                            />
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

