import React from "react";
import Chat from "./Chat";
import { NavLink } from "react-router-dom";

export default props => {
  const { socket, username, chatrooms } = props;

  return (
    <div>
      <div className="room-links">
        {chatrooms &&
          Object.keys(chatrooms).map(chatroom => {
            return (
              <NavLink
                key={chatroom}
                to={`/room/${chatroom}`}
                className="styled-link"
                activeClassName="selected"
              >
                {chatroom}
              </NavLink>
            );
          })}
      </div>
      <Chat
        username={username}
        socket={socket}
        messages={chatrooms[props.match.params.name].messages}
        usernames={chatrooms[props.match.params.name].usernames}
        name={props.match.params.name}
      />
    </div>
  );
};
