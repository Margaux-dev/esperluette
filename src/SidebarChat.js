import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import "./SidebarChat.css";
import db from './firebase';
import { Link } from "react-router-dom";


function SidebarChat ({ id, name, addNewChat }) {

    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState("");

    useEffect(() => {
        if (id) {
            db.collection("rooms")
              .doc(id)
              .collection("messages")
              .orderBy("timestamp", "desc")
              .onSnapshot(snapshot => (
                setMessages(snapshot.docs.map((doc) => doc.data()))
            ));
        }
    }, [id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

const createChat = () => {
    const roomName = prompt("Entrez un nom pour cette conversation");

    if (roomName) {
        db.collection("rooms").add({
            name: roomName
        })
    }
};
    
    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebar-chat">
                <Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`} />
                <div className="sidebar-chat-info">
                    <h3>{name}</h3>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
        
    ) : (
        <div className="sidebar-chat" onClick={createChat}>
            <IconButton>
                <AddIcon />
            </IconButton>
            <h2>Nouvelle discussion</h2>
        </div>
    )
}

export default SidebarChat
