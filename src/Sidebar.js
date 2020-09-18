import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from "@material-ui/core";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchedOutlined from "@material-ui/icons/SearchOutlined";
import CloseIcon from '@material-ui/icons/Close';
import SidebarChat from "./SidebarChat";
import db from "./firebase";
import { useStateValue } from "./StateProvider"

import "./Sidebar.css";

function Sidebar() {

    const [rooms, setRooms] = useState([]);
    // eslint-disable-next-line
    const [{ user }, dispatch] = useStateValue();
    let userLocal = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const unsubscribe = db.collection("rooms").orderBy("creation", "desc").onSnapshot(snapshot => 
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
    
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    const handleClose = () => {
        setAnchorEl(null);
      };
    
    const openTheme = (e) => {
        document.querySelector(".theme-picker").style.display = "flex";
        handleClose();
    
    };

    const choseColor = (e) => {
        const firstColor = [
            "#031c38",
            "rgb(207, 46, 81)",
            "rgb(38, 34, 77)",
            "rgb(255, 176, 72)",
            "rgb(248, 248, 248)",
            "rgb(0, 77, 87)"
        ];
        const secondColor = [
            "#0e2947",
            "rgb(223, 60, 95)",
            "rgb(29, 25, 63)",
            "rgb(255, 145, 0)",
            "rgb(234, 255, 233)",
            "rgb(12, 110, 122)"
        ];
        const borderColor = [
            "rgb(98, 135, 184)",
            "rgb(255, 172, 211)",
            "rgb(192, 185, 255)",
            "rgb(255, 196, 118)",
            "rgb(0, 126, 10)",
            "rgb(63, 216, 208)"
        ];
        const titleColor = [
            "rgb(206, 225, 251)",
            "rgb(255, 247, 249)",
            "rgb(209, 196, 245)",
            "rgb(253, 233, 200)",
            "rgb(19, 70, 10)",
            "rgb(218, 255, 247)"
        ];
        const pColor = [
            "rgb(182, 184, 187)",
            "rgb(246, 238, 242)",
            "rgb(139, 126, 153)",
            "rgb(255, 244, 227)",
            "rgb(12, 61, 12)",
            "rgb(183, 253, 247)"
        ];
        const buttonColor = [
            "#143457",
            "rgb(245, 117, 145)",
            "rgb(105, 83, 165)",
            "rgb(255, 167, 51)",
            "rgb(255, 255, 255)",
            "rgb(44, 151, 165)"
        ];
        const sidebarSearchColor = [
            "#79a3d1 !important",
            "rgb(245, 117, 145) !important",
            "rgb(181, 173, 246) !important",
            "rgb(223, 108, 0) !important",
            "rgb(0, 126, 10) !important",
            "rgb(33, 136, 149) !important"
        ];
        const messageColor = [
            "rgb(27, 99, 158)",
            "rgb(223, 60, 95)",
            "rgb(95, 83, 165)",
            "rgb(255, 145, 0)",
            "rgb(0, 126, 10)",
            "rgb(0, 77, 87)"
        ];
        const messageSentColor = [
            "rgb(162, 208, 246)",
            "rgb(253, 207, 217)",
            "rgb(218, 211, 255)",
            "rgb(255, 234, 206)",
            "rgb(223, 255, 213)",
            "rgb(170, 255, 251)"
        ];
        const sendColor = [
            "#2c5386",
            "rgb(245, 117, 145)",
            "rgb(105, 83, 165)",
            "rgb(255, 167, 51)",
            "#fff",
            "rgb(44, 151, 165)"
        ];

        document.querySelector(".color-active").classList.remove("color-active");
        e.target.classList.add("color-active");
        
        document.documentElement.style.setProperty('--firstColor', firstColor[e.target.id]);
        document.documentElement.style.setProperty('--secondColor', secondColor[e.target.id]);
        document.documentElement.style.setProperty('--borderColor', borderColor[e.target.id]);
        document.documentElement.style.setProperty('--titleColor', titleColor[e.target.id]);
        document.documentElement.style.setProperty('--pColor', pColor[e.target.id]);
        document.documentElement.style.setProperty('--buttonColor', buttonColor[e.target.id]);
        document.documentElement.style.setProperty('--sidebarSearchColor', sidebarSearchColor[e.target.idlor]);
        document.documentElement.style.setProperty('--messageColor', messageColor[e.target.id]);
        document.documentElement.style.setProperty('--messageSentColor', messageSentColor[e.target.id]);
        document.documentElement.style.setProperty('--sendColor', sendColor[e.target.id]);
    }

    const choseBackground = (e) => {
        const backgroundImage = [
            'url("https://i.pinimg.com/originals/08/2e/c9/082ec9adbd13b438ee3f9964ebf1a066.jpg")', 
            'url("https://topazscarvesandfashion.com/wp-content/uploads/2015/10/LIGHT-RED-BACKGROUND.jpg")', 
            'url("https://www.muralswallpaper.com/app/uploads/Blue-Illustrated-Landscape-Mountains-Wallpaper-Mural.jpg")', 
            'url("https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/pf-misctexture01-beer-000_5.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=c1552a7bdc2ea7b6e17d8d0d893c15be")', 
            'url("https://www.getpiping.com/content/uploads/2014/11/yellow-background-12.jpg")',
            'url("https://i.imgur.com/jUNkjBE.jpg")',
            'url("https://24wallpapers.com/Content/Images/WallpaperImages/wi4015e2b52b2-f5aa-427f-bc08-7d4354ca73311.jpg")', 
            'url("https://img4.goodfon.com/wallpaper/nbig/8/2b/vector-flower-seamless-pattern-background-texture-wallpapers.jpg")',
            'url("https://i.pinimg.com/originals/3b/8a/d2/3b8ad2c7b1be2caf24321c852103598a.jpg")',
            'url("https://i.redd.it/iibrptucse951.png")',
            'url("https://ubuntuportal.com/wp-content/uploads/2013/03/Winter-Fog-by-Daniel-Vesterskov.jpg")',
            'url("https://preview.redd.it/r3gp7qyrv0k01.jpg?auto=webp&s=714d4f58f9104cac9c74816107b94034165094db")'
        ];
        document.documentElement.style.setProperty('--backgroundImage', backgroundImage[e.target.id]);
    };

    const closePicker = (e) => {
        document.querySelector(".theme-picker").style.display = "none";
    };

    const disconnect = (e) => {
        window.location.href = "/";
        localStorage.removeItem("user");
    };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-header-left">
                    <Avatar src={userLocal?.photoURL} />
                    <p className="username">{userLocal?.displayName}</p>
                </div>
                
                <div className="sidebar-header-right">
                    <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <MoreVertIcon/>
                    </IconButton>
                    <Menu
                     id="simple-menu"
                     className="sidebar-toggle-menu"
                     anchorEl={anchorEl}
                     keepMounted
                     open={Boolean(anchorEl)}
                     onClose={handleClose}
                    >
                        <MenuItem onClick={openTheme}>Thème</MenuItem>
                        <MenuItem onClick={disconnect}>Déconnexion</MenuItem>
                    </Menu>
                    <div className="theme-picker">
                        <CloseIcon onClick={closePicker}/>
                        <div className="color-picker">
                            <h3>Choisissez votre couleur :</h3>
                            <div className="colors">
                                <div className="color color-1 color-active" id={0} onClick={choseColor}></div>
                                <div className="color color-2" id={1} onClick={choseColor}></div>
                                <div className="color color-3" id={2} onClick={choseColor}></div>
                                <div className="color color-4" id={3} onClick={choseColor}></div>
                                <div className="color color-5" id={4} onClick={choseColor}></div>
                                <div className="color color-6" id={5} onClick={choseColor}></div>
                            </div>
                        </div>
                        <div className="background-picker">
                            <h3>Choisissez votre fond d'écran :</h3>
                            <div className="backgrounds">
                                <div className="background" onClick={choseBackground}><img id={0} src="https://i.pinimg.com/originals/08/2e/c9/082ec9adbd13b438ee3f9964ebf1a066.jpg" alt="Fond d'écran sombre: Ciel étoilé"/></div>
                                <div className="background" onClick={choseBackground}><img id={1} src="https://topazscarvesandfashion.com/wp-content/uploads/2015/10/LIGHT-RED-BACKGROUND.jpg" alt="Fond d'écran rose"/></div>
                                <div className="background" onClick={choseBackground}><img id={2} src="https://www.muralswallpaper.com/app/uploads/Blue-Illustrated-Landscape-Mountains-Wallpaper-Mural.jpg" alt="Fond dans les tons bleus avec des montagnes"/></div>
                                <div className="background" onClick={choseBackground}><img id={3} src="https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/pf-misctexture01-beer-000_5.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=c1552a7bdc2ea7b6e17d8d0d893c15be" alt="Fond d'écran pastel"/></div>
                                <div className="background" onClick={choseBackground}><img id={4} src="https://www.getpiping.com/content/uploads/2014/11/yellow-background-12.jpg" alt="Fond d'écran jauen-orangé abstrait"/></div>
                                <div className="background" onClick={choseBackground}><img id={5} src="https://i.imgur.com/jUNkjBE.jpg" alt="Illustration forêt avec une tour de garde, tons orangés"/></div>
                                <div className="background" onClick={choseBackground}><img id={6} src="https://24wallpapers.com/Content/Images/WallpaperImages/wi4015e2b52b2-f5aa-427f-bc08-7d4354ca73311.jpg" alt="Tableau noir"/></div>
                                <div className="background" onClick={choseBackground}><img id={7} src="https://img4.goodfon.com/wallpaper/nbig/8/2b/vector-flower-seamless-pattern-background-texture-wallpapers.jpg" alt="Illustration verte avec des fleurs blanches en lignes fines"/></div>
                                <div className="background" onClick={choseBackground}><img id={8} src="https://i.pinimg.com/originals/3b/8a/d2/3b8ad2c7b1be2caf24321c852103598a.jpg" alt="Illustration forêt au crépuscule"/></div>
                                <div className="background" onClick={choseBackground}><img id={9} src="https://i.redd.it/iibrptucse951.png" alt="Motif abstrait aux couleurs vives"/></div>
                                <div className="background" onClick={choseBackground}><img id={10} src="https://ubuntuportal.com/wp-content/uploads/2013/03/Winter-Fog-by-Daniel-Vesterskov.jpg" alt="Arbre en hiver"/></div>
                                <div className="background" onClick={choseBackground}><img id={11} src="https://preview.redd.it/r3gp7qyrv0k01.jpg?auto=webp&s=714d4f58f9104cac9c74816107b94034165094db" alt="Illustration forêt et montagne, tons rosés"/></div>
                            </div>
                        </div>
                    </div>
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
                <SidebarChat addNewPrivateChat/>
                {rooms.reduce((filtered, room) => {
                    if (!room.data.guestA || room.data.guestA === userLocal.displayName || room.data.guestB === userLocal.displayName) {
                        let roomToDisplay =  <SidebarChat key={room.id} id={room.id} name={room.data.name} guestA={room.data.guestA} guestB={room.data.guestB} photo={room.data.photo} picA={room.data.picA} picB={room.data.picB} />
                        filtered.push(roomToDisplay)
                    }
                    return filtered;
                }, [])
                    }

                {/* {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} guestA={room.data.guestA} guestB={room.data.guestB} photo={room.data.photo} picA={room.data.picA} picB={room.data.picB} />
                ))} */}
            </div>
        </div>
    )
}

export default Sidebar;
