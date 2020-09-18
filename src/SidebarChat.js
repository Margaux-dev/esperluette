import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import "./SidebarChat.css";
import firebase from "firebase"
import db from './firebase';
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider"


function SidebarChat ({ id, name, guestA, guestB, photo, picA, picB, addNewChat, addNewPrivateChat }) {

    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState("");
    // eslint-disable-next-line
    const [{ user }, dispatch] = useStateValue();
    const [usersToAdd, setUsersToAdd] = useState([]);
    let userLocal = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (id) {
            db.collection("rooms")
              .doc(id)
              .collection("messages")
              .orderBy("timestamp", "desc")
              .onSnapshot(snapshot => (
                setMessages(snapshot.docs
                    .map((doc) => doc.data()))
            ));
        }
    }, [id]);

    useEffect(() => {
        db.collection("utilisateurs").orderBy("name", "asc").onSnapshot(snapshot => 
            setUsersToAdd(snapshot.docs.map(doc => ({
                username: doc.data().name,
                photo: doc.data().photo
            }))
            ))
    }, []);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const createChat = () => {
        const roomName = prompt("Nom de la nouvelle conversation publique :");
        let docId = "";
        if (roomName) {
            db.collection("rooms").add({
              name: roomName,
              photo: `https://avatars.dicebear.com/api/jdenticon/${seed}.svg`,
              creation: firebase.firestore.FieldValue.serverTimestamp(),
              guestA: "",
              guestB: ""   
            })

            db.collection("rooms").get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const docData = Object.values(doc.data());
                    if (docData.some(name => name === roomName)) {
                        docId = doc.id;
                    }
                });
                window.location.assign(`/rooms/${docId}`);
            })

        }
    };

    const createPrivateChat = (e) => {
        e.persist();
        let existingPrivateChat = []
        let docId = "";
        db.collection("rooms").get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const docData = Object.values(doc.data());
                if ((docData.some(guestA => guestA === userLocal.displayName)
                && docData.some(guestB => guestB === e.target.name))
                || (docData.some(guestB => guestB === userLocal.displayName)
                && docData.some(guestA => guestA === e.target.name)) 
                ){
                    docId = doc.id;
                    return existingPrivateChat.push(1);
                } else {
                    return existingPrivateChat.push(0);
                }
            });
            if (existingPrivateChat.some(e => e === 1)) {
                window.location.assign(`/rooms/${docId}`)
                return
            } else {
                db.collection("rooms").add({
                    name: e.target.name + " & " + userLocal.displayName,
                    creation: firebase.firestore.FieldValue.serverTimestamp(), 
                    guestA: e.target.name,
                    guestB: userLocal.displayName,
                    picA: e.target.id,
                    picB: userLocal.photoURL
                })
                db.collection("rooms").get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        const docData = Object.values(doc.data());
                        if ((docData.some(guestA => guestA === userLocal.displayName)
                        && docData.some(guestB => guestB === e.target.name))
                        || (docData.some(guestB => guestB === userLocal.displayName)
                        && docData.some(guestA => guestA === e.target.name)) 
                        ){
                            docId = doc.id;
                        }
                    });
                    window.location.assign(`/rooms/${docId}`);
                })
            }
        });
        toggleList();
    }

    const toggleList = () => {
        let list = document.querySelector(".create-new-chat");
        if (list.style.display === "none") {
            list.style.display = "flex";
        } else {
            list.style.display = "none";
        }
    };

    const setName = () => {
        if (guestA) {
            if (guestA === userLocal.displayName) {
                return guestB
            } else {
                return guestA
            }
        } else {
            return name
        }
    }

    const setPhoto = () => {
        if (photo) {
            return photo;
        } else {
            if (picA === userLocal.photoURL) {
                return picB
            } else {
                return picA
            }
        }
    }
    
    return (!addNewChat && !addNewPrivateChat) ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebar-chat">
                <Avatar src={setPhoto()} />
                <div className="sidebar-chat-info">
                    <h3>{setName()}</h3>
                    <p>{messages[0]?.message.length > 30 ? messages[0]?.message.slice(0,30).concat("...") : messages[0]?.message}</p>
                </div>
            </div>
        </Link>
        
    ) : addNewChat ? (
        <div className="sidebar-chat" onClick={createChat}>
            <IconButton>
                <AddIcon />
            </IconButton>
            <h2>Nouvelle discussion</h2>
        </div>
    ) : (
        <div style={{position: "relative"}}>
            <div className="sidebar-chat"onClick={toggleList}>
                <IconButton>
                    <AddIcon />
                </IconButton>
                <h2>Nouvelle discussion privée</h2>
            </div>
            <div className="create-new-chat" style={{display: "none"}}>
                {usersToAdd.map(userToAdd => (
                    <form className="add-private-chat" onClick={createPrivateChat} name={userToAdd.username} id={userToAdd.photo} >
                        <Avatar src={userToAdd.photo} name={userToAdd.username} id={userToAdd.photo}/>
                        <form className="add-username" name={userToAdd.username} id={userToAdd.photo}>{userToAdd.username}</form>
                    </form>
                ))}    
            </div>    
        </div>
        
    )
}

export default SidebarChat
