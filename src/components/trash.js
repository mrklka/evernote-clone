import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import TrashListPopulated from './sidebar-trash-list'
import Navbar from "./navbar"


export default class Trash extends Component {
    constructor(props) {
        super(props);

        this.deleteNote = this.deleteNote.bind(this);


    }


    componentDidMount() {
        const token = localStorage.getItem('authToken')

        axios.get('http://localhost:5000/trash/',{
            headers:{Authorization: token}
        })
            .then(res => {
                this.setState({ trash: res.data })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    deleteNote(id) {
        const token = localStorage.getItem('authToken')

        axios.delete('http://localhost:5000/trash/' + id,{
            headers:{Authorization: token}
        })
            .then(response => { console.log(response.data) });

        this.setState({
            trash: this.state.trash.filter(el => el._id !== id)
        })
    }



    render() {
        return (
            <div>
                <div className="maincontent">
                    <Navbar/>
                    <TrashListPopulated />

                </div>
            </div>
        )
    }
}

