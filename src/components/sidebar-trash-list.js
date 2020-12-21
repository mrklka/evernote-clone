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

        <Link to={"/trash/" + props.trash._id} onClick={() => window.location = "/trash/" + props.trash._id} >
            <div id="note-list-note">
                <h1 id="note-list-note-title">{props.trash.title}</h1>
                <div id="notes-list-note-body">
                    <h5 id="notes-list-note-body-text">{props.trash.body.slice(0, 55)}...</h5>
                    <p id="notes-list-note-body-date">{props.trash.date.substring(0, 10)}</p>
                </div>
            </div>
        </Link>
    </div>

)




export default class TrashListPopulated extends Component {
    constructor(props) {
        super(props);

        this.deleteTrashNote = this.deleteTrashNote.bind(this);

        this.state = {
            trashNotes: [],
            numNotes: 0,
            filterString: ''
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('authToken')

        axios.get('http://localhost:5000/trash/',{
            headers:{Authorization: token}
        })
            .then(res => {
                this.setState({ trashNotes: res.data })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    deleteTrashNote(id) {
        const token = localStorage.getItem('authToken')

        axios.delete('http://localhost:5000/trash/' + id,{
            headers:{Authorization: token}
        })
            .then(response => { console.log(response.data) });

        this.setState({
            trashNotes: this.state.trashNotes.filter(el => el._id !== id)
        })
    }


    trashNoteListPopulate(notesReady) {
        return notesReady.map(currentTrashNote => {

            return <NoteListStyle trash={currentTrashNote} deleteNote={this.deleteNote} key={currentTrashNote._id} />;
        })
    }

    render() {
        const numRows = this.state.trashNotes.length

        let notesReady = this.state.trashNotes ? this.state.trashNotes.filter(notes =>
            notes.title.toLowerCase().includes(
                this.state.filterString.toLowerCase())) : []

        return (
            <div className="maincontent">
                <div>
                    <div id="notes-wrapper" className='scroll'>
                        <div id="notes-containter">
                            <div id="note-list-titlebar">
                                <h1 id="note-list-titlebar-title">Trash</h1>
                                <SearchBar onTextChange={text => this.setState({ filterString: text })} />

                                <div id="notes-list-titlebar-count">
                                    <p id="notes-list-titlebar-count-text">{numRows} notes</p>

                                </div>
                            </div>

                            {this.trashNoteListPopulate(notesReady)}


                        </div>
                    </div>




                </div>
            </div>
        )
    }
}