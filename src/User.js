import React from 'react'

const User = ({ user: { name, dob, gender, cell } }) => (
    <div className='user'>
        <h1>Name: {name}</h1>
        <div>DOB: {dob}</div>
        <div>Gender: {gender}</div>
        <div>Cell: {cell}</div>
    </div>
)

export default User 