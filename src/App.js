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
        const { cell, dob, gender, name, picture } = user
        return ({
           name: `${name.first} ${name.last}`,
           dob: dob.date,
           gender: gender,
           cell: cell,
           picture: picture
        })
      }))
  )
  
  updateState = () => (
    this.fetchData().then( users => 
      this.setState({ users })
    )
  )
  
  render() {
    const { users } = this.state

    return (
      <div className='App'>
        <button
          onClick={this.updateState} 
          className='update-button'>
          Update state
        </button>
        <div className='demo'>
          {users.map(user => (
            <div key={user.name} className='container'> 
              <User user={user}/>
            </div>
            ))}
        </div>     
      </div>
    )
  }
}

export default App
