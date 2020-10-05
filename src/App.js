import React, { Component } from 'react';
import './App.css';
import './SMSForm.css'
import SMSForm from "./SMSFrom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      greeting: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
        <div>
          <header className='App-header'>
            <h1 className='H1_Tiltle'>SmS Sender</h1>
            <SMSForm />
          </header>
        </div>
    );
  }
}

export default App;
