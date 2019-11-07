import React, {Component} from 'react';
import { withAuth } from '../context/AuthContext'


function StatusButton(props){
    return(
        <nav>
            {
                props.isLoggedIn ? <button onClick={props.logout}> Logout </button>
                                 : <button onClick='#'> Login </button>
            }
        </nav>
    )
}

export default withAuth(StatusButton);