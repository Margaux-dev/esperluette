import React from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Login from "./Login"
import Chat from './Chat';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";

import db from "./firebase";

function App() {

  
  // eslint-disable-next-line
  const [{ user }, dispatch] = useStateValue();

  const addNewUser = () => {
    let existingUsers = [];
    db.collection("utilisateurs").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
            const docData = Object.values(doc.data());
            if (docData.some(e => e === user.uid)) {
              return existingUsers.push(1);
            } else {
              return existingUsers.push(0);
            }
      }); 
      if (existingUsers.some(e => e === 1)){
        console.log("Already exists")
        return
      } else {
        console.log("First connection")
        db.collection("utilisateurs").add({
          name: user.displayName,
          id: user.uid,
          photo: user.photoURL
        })
      }
    }); 
  }
  
  let userLocal = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="app">
      {!userLocal ? 
        (!user ? 
          (<Login />) 
          : ( 
              <div className="app-body" onLoad={addNewUser()} >
                <Router>
                  <Sidebar/>
                  <Switch>
                    <Route path="/rooms/:roomId">
                      <Chat />
                    </Route>
                    <Route path="/">
                      <Chat />
                    </Route>
                  </Switch>
                </Router>
              </div>
            )
        ) : ( 
          <div className="app-body">
            <Router>
              <Sidebar/>
              <Switch>
                <Route path="/rooms/:roomId">
                  <Chat />
                </Route>
                <Route path="/">
                  <Chat />
                </Route>
              </Switch>
            </Router>
          </div>
        )
        } 
    </div>
  );
}

export default App;
