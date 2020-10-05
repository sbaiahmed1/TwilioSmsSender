import React, { Component } from "react";
import "./SMSForm.css";

class SMSForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        to: "",
        body: "",
      },
      all: "",
      submitting: false,
      error: false,
      sendingNow: null,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({ submitting: true });
    this.extractNumbers();
  }

  onHandleChange(event) {
    const name = event.target.getAttribute("name");
    this.setState({
      message: { ...this.state.message, [name]: event.target.value },
    });
  }

  fetchingServer = (toParam) => {
    fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: toParam,
        body: this.state.message.body,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
          this.setState({
            error: false,
            submitting: false,
            message: {
              to: "",
              body: this.state.message.body,
            },
          });
        } else {
          this.setState({
            error: true,
            submitting: false,
          });
        }
      });
  };

  handleTextArea = (event) => {
    this.setState({ all: event.target.value });
  };
  async extractNumbers(c) {
    c = this.state.all;
    let strArray = c.split(/[\n]/);
    for (let i = 0; i < strArray.length; i++) {
      let number = strArray[i];
      console.log("before send " + i);
      this.fetchingServer(number);
      this.setState({
        sendingNow: number,
      });
      await new Promise((resolve, reject) => setTimeout(resolve, 20000));
      console.log("after send " + i);
    }
  }

  render() {
    return (
      <form
        onSubmit={this.onSubmit}
        className={this.state.error ? "error sms-form" : "sms-form"}
      >
        <div>
          <label htmlFor="to">To:</label>
          <textarea
            type="text"
            name="all"
            id="all"
            onChange={this.handleTextArea}
          />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea
            name="body"
            id="body"
            value={this.state.message.body}
            onChange={this.onHandleChange}
          />
        </div>
        <button
          type="submit"
          disabled={this.state.submitting}
          className="buttonSubmit"
        >
          Send message
        </button>
        <div className="sendingNow">
          <h1 className="h1oB">sending to : {this.state.sendingNow}</h1>
        </div>
      </form>
    );
  }
}

export default SMSForm;
