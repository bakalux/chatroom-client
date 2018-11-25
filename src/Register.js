import React from "react";
import { Redirect } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      toRedirect: false
    };

    const { socket, setUsername } = this.props;

    this.sendUsername = e => {
      e.preventDefault();
      if (this.state.username !== "") {
        socket.emit("SEND_USERNAME", {
          username: this.state.username
        });
        socket.username = this.state.username;
        this.setState({ toRedirect: true });
      }
    };
  }
  render() {
    return this.state.toRedirect ? (
      <Redirect to="/room" />
    ) : (
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
          <button onClick={this.sendUsername}>Register</button>
        </form>
      </div>
    );
  }
}

export default Register;
