import React, { Component } from "react";
import ReactDOM from "react-dom";
import Draggable from "react-draggable";

import io from "socket.io-client";

import MenuBar from "../windows/MenuBar";

const socketUrl = "http://localhost:5000";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      chats: [<div key="e">Hey</div>],
      xPosition: 100
    };
  }
  componentWillMount() {
    this.initSocket();
  }

  initSocket = () => {
    const socket = io(socketUrl);
    socket.on("connect", () => {
      console.log("connected in client");
    });
    this.setState({ socket });
  };

  onClick = () => {
    const { socket } = this.state;
    socket.emit("chat", {
      message: "test",
      alt: "test"
    });
  };

  render() {
    const { socket, chats, xPosition } = this.state;

    socket.on("NEW_CHAT", data => {
      console.log("new chat recieved from server", data, chats);
      const newChat = <div>{data.message}</div>;
      let newChats = [...chats, newChat];
      console.log(newChats);
      this.setState({ chats: newChats });
    });

    return (
      <Draggable axis="x" handle=".handle" bounds="body">
        <div
          className="chat-open"
          style={{
            right: xPosition
          }}
        >
          <MenuBar
            closeButton={true}
            minimizeButton={true}
            title={"Chat"}
            className="handle"
          />
          <div className="chat-window">
            <h1>Chat</h1>
            <div>{this.state.chats}</div>
            <button onClick={this.onClick}>Press</button>
          </div>
        </div>
      </Draggable>
    );
  }
}
