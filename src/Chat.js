import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined, InsertEmoticon, Telegram } from "@material-ui/icons"
import { useParams } from 'react-router-dom';
import { useStateValue } from "./StateProvider";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import ScrollToBottom from "react-scroll-to-bottom";
import db from './firebase';
import firebase from "firebase";
import "./Chat.css";

function Chat() {
    const [textarea, setTextarea] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [roomPic, setRoomPic] = useState("");
    const [messages, setMessages] = useState([]);
    // eslint-disable-next-line
    const [{ user }, dispatch] = useStateValue();
    let userLocal = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (roomId) {
            db
                .collection("rooms")
                .doc(roomId)
                .onSnapshot((snapshot) => {
                    if (snapshot.data().guestA !== "") {
                        if (snapshot.data().guestA === userLocal.displayName) {
                            setRoomName(snapshot.data().guestB);
                        } else {
                            setRoomName(snapshot.data().guestA);
                        }
                    } else {
                        setRoomName(snapshot.data().name);
                    }
                });
            db
                .collection("rooms")
                .doc(roomId)
                .onSnapshot((snapshot) => {
                    if (snapshot.data().picA === userLocal.photoURL) {
                        setRoomPic(snapshot.data().picB)
                    } else if (snapshot.data().picB === userLocal.photoURL) {
                        setRoomPic(snapshot.data().picA)
                    } else {
                        setRoomPic(snapshot.data().photo)
                    }
                });
            db
                .collection("rooms")
                .doc(roomId)
                .collection("messages")
                .orderBy("timestamp", "asc")
                .onSnapshot(snapshot => (setMessages(snapshot.docs.map(doc => doc.data()))));
        }
    }, 
    //eslint-disable-next-line
    [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection("rooms").doc(roomId).collection("messages").add({
            message: textarea,
            name: userLocal.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setTextarea("");
        document.querySelector("textarea").focus();
    };

    const addEmoji = (emoji, e) => {
        setTextarea(textarea + emoji.native);
        document.querySelector("textarea").focus();
    };

    const showPicker = (e) => {
        let picker = document.querySelector(".emoji-picker");
        if (picker.style.display === "none") {
            picker.style.display = "block";
        } else {
            picker.style.display = "none";
        }
    };

    let date = new Date(messages[messages.length -1]?.timestamp?.toDate()).toLocaleString("fr-FR", {hc: "h24", day:"2-digit", month:"2-digit", year: "2-digit", hour:"2-digit", minute:"2-digit"});

    return (
        <div className="chat">
            <div className="chat-header">
                <Avatar src={roomPic} />
                <div className="chat-header-info">
                    <h2>{roomName}</h2>
                    <p>{date !== "Invalid Date" ? ("Dernier message le : " + date) : ""}
                    </p>
                </div>
                <div className="chat-header-right">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <ScrollToBottom className="chat-body" style={{behavior: "smooth"}}>
                {messages.map(message => (
                    <p className={`chat-message ${message.name === userLocal.displayName && "chat-receiver"} ${message.name !== userLocal.displayName && "chat-sender"}`} style={{whiteSpace: "pre-line"}}>
                        <span className="chat-name">{message.name === userLocal.displayName ? "" : message.name}</span>
                        {message.message}
                        <span className="chat-timestamp">{new Date(message.timestamp?.toDate()).toLocaleString("fr-FR", {hc: "h24", day:"2-digit", month:"2-digit", year: "2-digit", hour:"2-digit", minute:"2-digit"})}</span>
                    </p>
                ))}
            </ScrollToBottom>
            <div className="chat-footer">
                <InsertEmoticon onClick={showPicker} />
                <div className="emoji-picker" style={{display: "none"}}>
                    <Picker
                    onClick={addEmoji}
                    set="google" 
                    theme="dark"
                    showPreview={false}
                    showSkinTones={false}
                    i18n={{ search: 'Recherche', categories: {
                        search: 'Résultats de la recherche',
                        recent: 'Fréquemment utilisés',
                        smileys: 'Smileys & Emotions',
                        people: 'Émoticônes & Personnages',
                        nature: 'Animaux & Nature',
                        foods: 'Aliments & Boissons',
                        activity: 'Activités',
                        places: 'Voyages & Lieux',
                        objects: 'Objets',
                        symbols: 'Symboles',
                        flags: 'Drapeaux'
                    } }}
                    style={{ position: 'absolute', bottom: '80px', left: '0px', paddingBottom:"15px"}}
                    />
                </div>
                <form>
                    <textarea 
                      value={textarea} 
                      onChange={(e) => setTextarea(e.target.value)} 
                      placeholder="Écrivez votre message ici et cliquez sur le bouton pour envoyer"
                      type="text"
                    />
                    <button 
                      onClick={sendMessage} 
                      type="submit"
                      aria-label="Envoyer"
                    >
                        <Telegram />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Chat;
