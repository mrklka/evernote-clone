import React, { Component } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import "../index.css";
import 'jquery';
import Navbar from "./navbar"

const NotebookList = props => (
    <tr>
        <td>{props.note.name}</td>
        <td>{props.note.email}</td>
        <td>-</td>
        <td>
            <a href="# " onClick={() => { props.deleteNotebook(props.note._id) }}>delete</a>
        </td>
    </tr>
)


export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.deleteNotebook = this.deleteNotebook.bind(this);

        this.onChangeNotebook = this.onChangeNotebook.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            notebook: '',
            notebooks: [],

        }
    }

    componentDidMount() {
        const token = localStorage.getItem('authToken')

        axios.get('http://localhost:5000/notebooks/', {
            headers: { Authorization: token }
        })
            .then(res => {
                this.setState({ notebooks: res.data })
            })
            .catch((err) => {
                console.log(err)
            })
    }


    deleteNotebook(id) {
        const token = localStorage.getItem('authToken')

        axios.delete('http://localhost:5000/notebooks/' + id, {
            headers: { Authorization: token }
        })
            .then(response => { console.log(response.data) });

        this.setState({
            notebooks: this.state.notebooks.filter(el => el._id !== id)
        })
    }

    noteBookListPopulate() {
        return this.state.notebooks.map(notebook => {
            return <NotebookList note={notebook} deleteNotebook={this.deleteNotebook} key={notebook._id} />;
        })
    }

    onChangeNotebook(e) {
        this.setState({
            notebook: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const notebook = {
            notebook: this.state.notebook
        }
        const token = localStorage.getItem('authToken')


        axios.post('http://localhost:5000/notebooks/add', notebook, {
            headers: { Authorization: token }
        })
            .then(res => console.log(res.data));

        this.setState({
            notebook: ''
        })

        window.location = '/notebooks';
    }



    render() {
        return (

            <div>
                <Navbar />

                <div className="notebooks-page-container">


                    <nav className="navbar justify-content-between">
                        <h4 id="create-notebook-main_title">Notebooks</h4>
                        <a href="# " className="navbar-brand"> </a>
                    </nav>
                    <nav className="navbar justify-content-between">
                        <h4>My Notebook List</h4>
                        <a href="# " className="navbar-brand" disabled> </a>
                        <button type="button" data-toggle="modal" className="btn btn-outline-success my-2 my-sm-0" data-target="#newNotebookModal">New Notebook</button>
                    </nav>

                    <div className="modal fade" id="newNotebookModal" tabindex="-1" role="dialog" data-backdrop="false" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">Create new notebook</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form onSubmit={this.onSubmit}>
                                    <div className="modal-body">

                                        <div className="form-group">
                                            <label>Name </label>
                                            <input type="text"
                                                required
                                                className="form-control"
                                                value={this.state.notebook}
                                                onChange={this.onChangeNotebook}
                                            />
                                        </div>

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                        <button type="submit" className="btn btn-success">Continue</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div>
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th>TITLE</th>
                                    <th>CREATED BY</th>
                                    <th>SHARED WITH</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.noteBookListPopulate()}

                            </tbody>
                        </table>
                    </div>
                </div>



            </div>
        )
    }
}