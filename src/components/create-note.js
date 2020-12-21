import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "../index.css";
import 'jquery';
import NotesListPopulated from './sidebar-notes-list'
import Navbar from "./navbar"


export default class CreateNote extends Component {
    constructor(props) {
        super(props);

        this.deleteNote = this.deleteNote.bind(this);



        this.onChangeNotebook= this.onChangeNotebook.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.watchSubmit = this.watchSubmit.bind(this);


        this.state = {
            notebook: '',
            title: '',
            body: '',
            date: new Date(),
            notebooks: [],
            notes: []
        }



    }

    componentDidMount() {

        
        const token = localStorage.getItem('authToken')

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


            axios.get('http://localhost:5000/notes/',{
                headers:{Authorization: token}
            })
                .then(res => {
                    this.setState({ notes: res.data })
                })
                .catch((err) => {
                    console.log(err)
                })

                if (this.state.notebook === '') {
                    this.setState({
                        notebook: 'Default',
                        notebooks: ['Default']
                    }) 
                }

    }

    deleteNote(id) {
        const token = localStorage.getItem('authToken')

        axios.delete('http://localhost:5000/notes/' + id, {
            headers:{Authorization: token}
        })
            .then(response => { console.log(response.data) });

        this.setState({
            notes: this.state.notes.filter(el => el._id !== id)
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

    watchSubmit() {
        this.setState = {
            notebook: '',
            title: '',
            body: '',
            date: new Date(),
            notebooks: []
        }

    }

    onSubmit(e) {
        e.preventDefault();

        if (this.state.notebook === 'Default' && this.state.notebooks.length === 1) {
            const token = localStorage.getItem('authToken')
            axios.post('http://localhost:5000/notebooks/add', 
            {
                notebook: "Default"
            }, {
                headers: { Authorization: token }
            })
                .then(res => console.log(res.data));
    
        }

        const note = {
            notebook: this.state.notebook,
            title: this.state.title,
            body: this.state.body,
            date: this.state.date
        }

        const token = localStorage.getItem('authToken')

        axios.post('http://localhost:5000/notes/add', note, {
            headers: {Authorization: token}})
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {

        
        return (
            <div className="maincontent">
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

                                    </li>
                                </ul>
                                <form className="form-inline my-2 my-lg-0" onSubmit={this.onSubmit}>
                                    <a id="full-screen-button" className="nav-link" href="# ">Only you</a>

                                    <div className="form-group">
                                        <input type="submit" id="navbar-share-button" value="Save" className="btn btn-success my-2 my-sm-0" />

                                    </div>
                                </form>

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
                                className=" form-control"
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