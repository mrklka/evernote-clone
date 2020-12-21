import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../index.css"
import DeleteIcon from '@material-ui/icons/Delete';
import AllNotesIcon from '@material-ui/icons/Description';
import NewNoteIcon from '@material-ui/icons/AddCircle';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NoteBookIcon from '@material-ui/icons/Book';
import 'jquery';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

export default class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            SearchFieldValue: '',
        }

        this.sendValue = this.sendValue.bind(this);


    }

    

    sendValue(e) {
        this.props.searchbar(e.target.value)
    }

    



    // this.props.searchbar(this.value)

    render() {
        const logoutHelper = () => {
            console.log("hello");
            localStorage.clear()
            window.location = '/login';

        }

        return (

            <div id="wrapper" className="active">
                <div id="sidebar-wrapper">
                    <ul id="sidebar_menu" className="sidebar-nav">
                        <li className="sidebar-brand">
                            <span id="user_icon_container"> <AccountCircleIcon fontSize="large" /></span>
                            <DropdownButton id="dropdown-item-button" title="Account">
                                <Dropdown.Item onClick={logoutHelper} as="button">Logout</Dropdown.Item>
                            </DropdownButton>
                        </li>
                    </ul>




                    <ul id="sidebar_new_note" className="sidebar-nav">
                        <li className="sidebar-brand"><Link to="/create" >New Note<span id="add_note_container"
                        ><NewNoteIcon fontSize="large" /></span></Link></li>
                    </ul>
                    <ul className="sidebar-nav" id="sidebar">
                        <ul className="sidebar-nav" id="sidebar">
                            <li><Link to="/" >All Notes<span className="sub_icon"><AllNotesIcon /></span></Link></li>
                            <li><Link to="/notebooks" >Notebooks<span className="sub_icon"><NoteBookIcon /></span></Link></li>
                        </ul>
                        <li><a href="/trash">Trash <span className="sub_icon"><DeleteIcon /></span></a></li>




                    </ul>
                    <div id="sidebar-bottom">
                        <ul id="sidebar_help" className="sidebar-nav">
                            <li className="sidebar-brand"><a data-toggle="modal" id="menu-toggle" href="# " data-target="#helpModal">Need A little Help?<span
                                id="user_icon_container" className="glyphicon glyphicon-info-sign"></span></a></li>
                        </ul>
                    </div>
                </div>

                <div className="modal fade" id="helpModal" tabIndex="-1" role="dialog" data-backdrop="false" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalScrollableTitle">Welcome To My Evernote Clone!</h5>

                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>I created this project after the popular note taking application called evernote. This website features the same design 
                                    as well as different features such as the creation of different notebooks.

                            
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        );
    }
}