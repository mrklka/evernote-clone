import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

class SearchBar extends Component {
    render() {
        return (
            <div>
                <input id="sidebar-search" class="form-control" type="text" placeholder="Search" aria-label="Search" onChange={event => this.props.onTextChange(event.target.value)}></input>
            </div>
        )
    }
}



const NoteListStyle = props => (
    <div>

        <Link to={"/edit/" + props.note._id} onClick={() => window.location = "/edit/" + props.note._id} >
            <div id="note-list-note">
                <h1 id="note-list-note-title">{props.note.title}</h1>
                <div id="notes-list-note-body">
                    <h5 id="notes-list-note-body-text">{props.note.body.slice(0, 55)}...</h5>
                    <p id="notes-list-note-body-date">{props.note.date.substring(0, 10)}</p>
                </div>
            </div>
        </Link>
    </div>

)





export default class NotesListPopulated extends Component {
    constructor(props) {
        super(props);

        this.deleteNote = this.deleteNote.bind(this);
        this.state = {
            notes: [],
            numNotes: 0,
            filterString: '',
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('authToken')

        axios.get('http://localhost:5000/notes/', {
            headers:{Authorization: token}
        })
            .then(res => {
                this.setState({ notes: res.data })
            })
            .catch((err) => {
                console.log(err)
            })

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




    noteListPopulate(notesReady) {
        return notesReady.reverse().map(currentnote => {

            return <NoteListStyle note={currentnote} deleteNote={this.deleteNote} key={currentnote._id} />;
        })
    }

    render() {

        const numRows = this.state.notes.length

        let notesReady = this.state.notes ? this.state.notes.filter(notes =>
            notes.title.toLowerCase().includes(
                this.state.filterString.toLowerCase())) : []

        return (

            <div>
                <div className="maincontent">
                    <div>
                        <div id="notes-wrapper" className='scroll'>
                            <div id="notes-containter">
                                <div id="note-list-titlebar">
                                    <h1 id="note-list-titlebar-title">All Notes</h1>
                                    <SearchBar onTextChange={text => this.setState({ filterString: text })} />


                                    <div id="notes-list-titlebar-count">
                                        <p id="notes-list-titlebar-count-text">{numRows} notes</p>
                                    </div>
                                </div>

                                {this.noteListPopulate(notesReady)}


                            </div>
                        </div>




                    </div>
                </div>
            </div>
        )
    }
}