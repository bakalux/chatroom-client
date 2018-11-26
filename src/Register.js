import React from "react";
import { withRouter } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };

    const { socket } = this.props;

    /**Sending username to the server and redirecting to lobby */
    this.sendUsername = e => {
      e.preventDefault();
      if (this.state.username !== "") {
        socket.emit("SEND_USERNAME", {
          user: {
            username: this.state.username,
            id: socket.id
          },
          name: "lobby"
        });
        socket.username = this.state.username;
        this.props.setUsername(this.state.username);
        console.log(this.props.history);
        this.props.history.push("/room/lobby");
      }
    };
  }
  render() {
    return (
      <div className="register-container">
        <form className="register-form">
          <input
            type="text"
            name="name"
            required
            id="name"
            placeholder="John"
            className="input-name"
            autoFocus
            onChange={e => {
              this.setState({ username: e.target.value });
            }}
            value={this.state.username}
          />
          <button onClick={this.sendUsername} className="register-button">
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(Register);
