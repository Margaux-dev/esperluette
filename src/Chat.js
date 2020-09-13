import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined, InsertEmoticon, Telegram } from "@material-ui/icons"
import { useParams } from 'react-router-dom';
import { useStateValue } from "./StateProvider";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

import "./Chat.css";
import db from './firebase';
import firebase from "firebase";

function Chat() {
    const [seed, setSeed] = useState("");
    const [textarea, setTextarea] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    // eslint-disable-next-line
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db
                .collection("rooms")
                .doc(roomId)
                .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
            db
                .collection("rooms")
                .doc(roomId)
                .collection("messages")
                .orderBy("timestamp", "asc")
                .onSnapshot(snapshot => (setMessages(snapshot.docs.map(doc => doc.data()))));
        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("coucou" + textarea);
        db.collection("rooms").doc(roomId).collection("messages").add({
            message: textarea,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setTextarea("");
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

    return (
        <div className="chat">
            <div className="chat-header">
                <Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`} />
                <div className="chat-header-info">
                    <h2>{roomName}</h2>
                    <p>Dernière connexion : le {" "}
                    {new Date(messages[messages.length -1]?.timestamp?.toDate()).toLocaleString("fr-FR", {hc: "h24", day:"2-digit", month:"2-digit", year: "2-digit", hour:"2-digit", minute:"2-digit"})}.</p>
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
            <div className="chat-body">
                {messages.map(message => (
                    <p className={`chat-message ${message.name === user.displayName && "chat-receiver"}`}>
                        <span className="chat-name">{message.name === user.displayName ? "" : message.name}</span>
                        {message.message}
                        <span className="chat-timestamp">{new Date(message.timestamp?.toDate()).toLocaleString("fr-FR", {hc: "h24", day:"2-digit", month:"2-digit", year: "2-digit", hour:"2-digit", minute:"2-digit"})}</span>
                    </p>
                ))}
            </div>
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
                      placeholder="Écrivez votre message ici"
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
