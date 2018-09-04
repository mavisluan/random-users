import React, { Component } from 'react'
import User from './User'
import './App.css'

class App extends Component {
  state = {
    users: [],
  }

  componentDidMount = () => {
    const localData = JSON.parse(localStorage.getItem('users'))
    const oldTime = localStorage.getItem('time')
    const currentTime = Date.now()
    const dataAge = (currentTime - oldTime) / (1000* 60)

    if (!localData || dataAge >= 1) {
      console.log('dataAge', dataAge)
      this.fetchData()
      .then(users => {
        localStorage.setItem('users', JSON.stringify(users))
        localStorage.setItem('time', Date.now())
        this.setState({ users })
      })
    } else {
      console.log('using local data', localData)
      console.log('dataAge', dataAge)
      this.setState({ users: localData })
    }  
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
    console.log('render this state', this.state.users)

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
