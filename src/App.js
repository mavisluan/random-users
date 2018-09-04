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
  

  // componentDidMount() {
  //   const localData = JSON.parse(localStorage.getItem('users'))
  //   const oldTime = JSON.parse(localStorage.getItem('time'))
  //   const currentTime = Date.now()
  //   const timeAge = (currentTime - oldTime) / (1000 * 60)
  //   if (!localData || timeAge >= 1) {
  //     this.fetchData().then(users => this.setState({ 
  //       users: users, time: Date.now() }))
  //      console.log('using fetch API')
  //      console.log('oldTime', oldTime)
  //      console.log('timeAge', timeAge)
  //   } else {    
  //       this.setState({ users: localData, time: oldTime})
  //       console.log('using local data')     
  //   }
  // }

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
  
  // getSnapshotBeforeUpdate = () => {
  //   localStorage.setItem('users', JSON.stringify(this.state.users))
  //   localStorage.setItem('time', this.state.time)
  //   return JSON.parse(localStorage.getItem('time'))
  // }
  
  // componentDidUpdate = (prevProps, prevState, snapshot) => {
  //   console.log('componentDidUpdate', snapshot)
  // }
  
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
