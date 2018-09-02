import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount = () => {
    if (!JSON.parse(localStorage.getItem('contacts'))) {
      this.fetchData()
    } else {
      console.log('using data from localStorage')
    }
  }
  
  fetchData = () => {
    fetch('https://randomuser.me/api/?results=5')
      .then(res => res.json())
      .then(data => data.results.map(user => {
        const {cell, email, age, name, login} = user
        return { cell, email, age, name, login}
      }))
      .then(contacts => this.setState({
        contacts,
        isloading: false
      }))
      .catch(error => console.log('parsing failed', error))
  }

  getSnapshotBeforeUpdate = (prevProps, prevState) => {
    localStorage.setItem('contacts', 'something')
  }
  
  getSnapshotBeforeUpdate = (nextProps, nextState) => {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    const snapshot = JSON.parse(localStorage.getItem('contacts'))
    return snapshot
  }
  
  componentDidUpdate = (prevProps, prevState, snapshot) => {
    console.log('snapshot', snapshot)
  }
  

  render() {
    console.log(this.state.contacts)
    const {contacts} = this.state
    return (
      <div className="App">
        {contacts.map(contact => (
          <div key={contact.login.uuid}>
            {contact.name.first}
            {contact.email}
          </div>
        ))}
      </div>
    );
  }
}

export default App;
