import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchedOutlined from "@material-ui/icons/SearchOutlined";
import SidebarChat from "./SidebarChat";
import db from "./firebase";
import { useStateValue } from "./StateProvider"

import "./Sidebar.css";

function Sidebar() {

    const [rooms, setRooms] = useState([]);
    // eslint-disable-next-line
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        const unsubscribe = db.collection("rooms").onSnapshot(snapshot => 
            setRooms(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }))
            )
        );

        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar-header-right">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar-search">
                <div className="sidebar-search-container">
                    <SearchedOutlined />
                    <input placeholder="Chercher une discussion" type="text" />
                </div>
            </div>
            <div className="sidebar-chats">
                <SidebarChat addNewChat/>
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar;
