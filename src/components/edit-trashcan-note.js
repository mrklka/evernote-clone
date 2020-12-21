import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import TrashListPopulated from './sidebar-trash-list'
import ExpandMenuIcon from '@material-ui/icons/MoreVert';
import Navbar from "./navbar"



export default class EditTrashcanNote extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.deleteNote = this.deleteNote.bind(this);


        this.state = {
            username: '',
            title: '',
            body: '',
            date: new Date(),
            users: []
        }
    }


    componentDidMount() {
        const token = localStorage.getItem('authToken')

        axios.get('http://localhost:5000/trash/' + this.props.match.params.id,
        {
            headers:{Authorization: token}
        })
        
            .then(response => {
                this.setState({
                    username: response.data.username,
                    title: response.data.title,
                    body: response.data.body,
                    date: new Date(response.data.date)
                })
            })
            .catch(function (error) {
                console.log(error);
            })



    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
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

        const trash = {
            username: this.state.username,
            title: this.state.title,
            body: this.state.body,
            date: this.state.date
        }

        console.log(trash);
        const token = localStorage.getItem('authToken')

        axios.post('http://localhost:5000/trash/update/' + this.props.match.params.id, trash, 
        {
            headers:{Authorization: token}
        })
            .then(res => console.log(res.data));

        window.location = '/';
    }

    deleteNote() {
        const token = localStorage.getItem('authToken')

        axios.delete('http://localhost:5000/trash/' + this.props.match.params.id, 
        {
            headers:{Authorization: token}
        })
            .then(response => { console.log(response.data) });


        window.location = '/trash';

    }

    render() {
        return (
            <div>
                <Navbar/>
                <TrashListPopulated />

                <div id="active-note-wrapper">
                    <div id="active-note-containter">

                        <div id="active-note-titlebar">
                            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                    <li className="nav-item">
                                        <button type="button" className="btn btn-danger btn-sm" disabled>Note in Trash</button>

                                    </li>

                                </ul>
                                <form className="form-inline my-2 my-lg-0" onSubmit={this.onSubmit}>
                                    <a id="full-screen-button" className="nav-link" href="# ">Only you</a>

                                    <div className="btn-group dropleft">
                                        <div data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <ExpandMenuIcon fontSize="default" />
                                        </div>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a className="dropdown-item" href="# " onClick={this.deleteNote}>Delete Note Permanently</a>
                                        </div>
                                    </div>
                                </form>




                            </nav>
                        </div>

                        <div id="active-note-titlebar-layertwo">
                            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">

                                    {/* <li className="nav-item">
                                        <p id="navbar-two-date">Last edited on {this.state.date}</p>
                                    </li> */}
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

