import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Register from "./Register";
import socketIOClient from "socket.io-client";
import ChatroomContainer from "./ChatroomContainer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      isRegistered: false,

      chatrooms: {
        lobby: {
          usernames: [],
          messages: []
        },
        series: {
          usernames: [],
          messages: []
        },
        games: {
          usernames: [],
          messages: []
        }
      }
    };

    this.socket = socketIOClient("localhost:8989");

    this.socket.on("RECIEVE_MESSAGE", data => {
      addMessage(data);
    });

    /**Setting updated users to the state */
    this.socket.on("UPDATE_USERNAMES", data => {
      console.log("update_usernames data is ", data);
      const room = data.name;
      let usernames;
      if (data.users !== []) {
        usernames = data.users.map(user => {
          return user.username;
        });
      } else usernames = [];
      this.setState({
        chatrooms: {
          ...this.state.chatrooms,
          [room]: {
            ...this.state.chatrooms[room],
            usernames
          }
        }
      });
    });

    this.socket.on("RECIEVE_USERNAME", data => {
      this.setState({ username: data });
    });

    /**Adding message to the required room */
    const addMessage = data => {
      console.log("data name", data.name);
      const room = data.name;

      const message = {
        author: data.author,
        message: data.message,
        time: data.time
      };

      this.setState({
        chatrooms: {
          ...this.state.chatrooms,
          [room]: {
            ...this.state.chatrooms[room],
            messages: [...this.state.chatrooms[room].messages, message]
          }
        }
      });
      console.log(this.state.chatrooms[room].messages);
    };
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/register" />
          <Route
            exact
            path="/room/:name"
            render={props =>
              this.state.username ? (
                <ChatroomContainer
                  {...props}
                  socket={this.socket}
                  username={this.state.username}
                  chatrooms={this.state.chatrooms}
                />
              ) : (
                <Redirect to="/register" />
              )
            }
          />
          <Route
            exact
            path="/register"
            component={() => (
              <Register
                socket={this.socket}
                setUsername={username => {
                  this.setState({ username });
                }}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
