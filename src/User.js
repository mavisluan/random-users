import React from 'react'

const User = ({ user: { name, dob, gender, cell, picture } }) => (
    <div className='user'>            
        <img src={picture.large} alt={name}/>
        <h1>{name}</h1>
        <div>DOB: {dob}</div>
        <div>Gender: {gender}</div>
        <div>Cell: {cell}</div>
    </div>
)

export default User 