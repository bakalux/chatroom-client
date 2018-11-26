import React from "react";
import Chat from "./Chat";
import { Link } from "react-router-dom";

export default props => {
  const { socket, username, chatrooms } = props;

  return (
    <div>
      {chatrooms &&
        Object.keys(chatrooms).map(chatroom => {
          return (
            <Link key={chatroom} to={`/room/${chatroom}`}>
              {chatroom}
            </Link>
          );
        })}
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
