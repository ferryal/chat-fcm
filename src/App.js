import React, { Component } from "react";
import { database } from "./firebase";
import './style.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      messages: []
    };

    this.onAddMessage = this.onAddMessage.bind(this);
  }

  componentWillMount() {
    const messagesRef = database
      .ref("messages")
      .orderByKey()
      .limitToLast(10);

    messagesRef.on("child_added", snapshot => {
      const message = {
        username: snapshot.val().username,
        text: snapshot.val().text,
        id: snapshot.key
      };

      this.setState(prevState => ({
        messages: [message, ...prevState.messages]
      }));
    });
  }

  onAddMessage(event) {
    event.preventDefault();

    database.ref("messages").push({
      username: this.username.value,
      text: this.text.value
    });

    this.text.value = "";
  }

  render() {
    return (
      <div>
        <h1>Chat Room Firebase</h1>
        <ul className="chat-thread">
          {this.state.messages.map(message => (
            <li key={message.id}>
              {message.text}
              <small style={{ color: "gray" }}> by {message.username}</small>
            </li>
          ))}
        </ul>
        <form onSubmit={this.onAddMessage}>
          <label htmlFor="username">username:</label>
          <br/>
          <input
            type="text"
            placeholder="your name"
            ref={node => (this.username = node)}
          />
          <br />
          <label htmlFor="text">text:</label>
          <br/>
          <input
            type="text"
            placeholder="your message"
            ref={node => (this.text = node)}
          />
          <br />
          <br />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

export default App;
