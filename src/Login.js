import React from 'react';
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";
import "./Login.css";
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Login() {
    // eslint-disable-next-line
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth
        .signInWithPopup(provider)
        .then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            })
        })
        .catch((error) => alert(error.message));
    };

    return (
        <div className="login">
            <div className="login-container">
                <h1>Bienvenue !</h1>
                <img src="../logo.png" alt="Logo Esperluette" />
                <div className="login-text">
                    <h2>Esperluette</h2>
                    <p>Messagerie instantanée</p>
                </div>
                <Button variant="outlined" color="primary" onClick={signIn}>Connexion via Google</Button>
            </div>
        </div>
    );
}

export default Login;
