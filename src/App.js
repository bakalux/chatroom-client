import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://127.0.0.1:8989",
      color: "white"
    };
  }

  //method for emitting a socket.io event
  send = () => {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit("change color", this.state.color);
  };

  setColor = color => {
    this.setState({ color });
  };

  render() {
    // Within the render method, we will be checking for any sockets.
    // We do it in the render method because it is ran very often.
    const socket = socketIOClient(this.state.endpoint);

    // socket.on is another method that checks for incoming events from the server
    // This method is looking for the event 'change color'
    // socket.on takes a callback function for the first argument

    socket.on("change color", color => {
      //setting color of our button
      document.body.style.backgroundColor = color;
    });

    return (
      <div style={{ textAlign: "center" }}>
        <button onClick={() => this.send()}>Change Color</button>
        <button id="blue" onClick={() => this.setColor("blue")}>
          Blue
        </button>
        <button id="red" onClick={() => this.setColor("red")}>
          Red
        </button>
      </div>
    );
  }
}

export default App;
