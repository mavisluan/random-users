import React, { Component } from 'react'
import User from './User'
import './App.css'

class App extends Component {
  state = {
    users: []
  }

  componentDidMount() {
    this.fetchData().then( users => 
      this.setState({ users })
      )
  }

  fetchData = () => (
    fetch('https://randomuser.me/api/?results=10')
      .then(res => res.json())
      .then(data => data.results)
      .then(users => users.map(user => {
        const { cell, dob, gender, name } = user
        return ({
           name: `${name.first} ${name.last}`,
           dob: dob.date,
           gender: gender,
           cell: cell,
        })
      }))
  )
  
  updateState = () => (
    this.fetchData().then( users => 
      this.setState({ users })
      )
  )
  render() {
    console.log(this.state.users)
    const { users } = this.state

    return (
      <div>
          <button
            onClick={this.updateState} 
            className='update-button'>
            Update state
          </button>
        {users.map(user => (
          <div key={user.name} className='container'> 
            <User user={user}/>
          </div>
          ))}
      </div>
    )
  }
}

export default App
