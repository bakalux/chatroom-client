import React from "react";
import User from "./User";

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };

    const { socket } = this.props;

    this.sendMessage = e => {
      e.preventDefault();
      if(this.state.message !== "") {
        socket.emit("SEND_MESSAGE", {
          author: socket.username,
          message: this.state.message,
          name: this.props.name
        });
        this.setState({ message: "" });
      }
    };
  }

  /**Checking props for changing room
   * and emitting "CHANGE_ROOM" with user, old and new rooms data
   */
  componentWillReceiveProps(newProps) {
    if(newProps.name !== this.props.name) {
      console.log("room changed to ", newProps.name);
      const userAndRooms = {
        user: {
          id: this.props.socket.id,
          username: this.props.socket.username
        },
        oldRoom: this.props.name,
        newRoom: newProps.name
      };
      this.props.socket.emit("CHANGE_ROOM", userAndRooms);
    }
  }

  render() {
    const { usernames, messages } = this.props;
    return (
      <div className="chatroom-container">
        <ul className="user-list">
          { usernames &&
            usernames.map(username => {
              return <User username={ username } key={ username.toString() } />;
            }) }
        </ul>
        <div className="chat">
          <div className="chat-messages">
            { messages.map(message => {
              return (
                <div key={ message.id }>
                  <span className="time">{ message.time }</span> { message.author }:{ " " }
                  <span className="chat-message">{ message.message }</span>
                </div>
              );
            }) }
          </div>

          <form onSubmit={ this.sendMessage }>
            <input
              className="input-message"
              type="text"
              autoFocus
              placeholder="Message"
              onChange={ e => {
                this.setState({ message: e.target.value });
              } }
              value={ this.state.message }
            />
            <button>Send</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Chat;
