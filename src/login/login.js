import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/auth'

export default function Login() {

  const { setAuthTokens } = useAuth()
  const [loginusername, setloginusername] = useState('')
  const [loginpassword, setloginpassword] = useState('')
  const [signupusername, setsignupusername] = useState('')
  const [signuppassword1, setsignuppassword1] = useState('')
  const [signuppassword2, setsignuppassword2] = useState('')
  const [mismatchMessage, setMismatchMessage] = useState('')

  useEffect(() => {
    if (signuppassword1 === signuppassword2 || signuppassword2 === '') {
      setMismatchMessage('')
    } else {
      setMismatchMessage('Passwords do not match')
    }
  })

  function loginHandler() {
    axios.post('http://localhost:3001/users/login', { 'username' : loginusername , 'password' : loginpassword })
      .then((response) => {
        console.log(response)
        setAuthTokens(response.data.username)
      })
      .catch((error) => {
        alert('user does not exist')
        setloginusername('')
        setloginpassword('')
      })
  }

  function signupHandler() {
    axios.post('http://localhost:3001/users/signup', { 'username' : signupusername, 'password' : signuppassword1})
      .then((response) => {
        console.log(response)
        setAuthTokens(response.data.username)
      })
      .catch((error) => {
        alert('user already exists')
        setsignuppassword1('')
        setsignuppassword2('')
        setsignupusername('')
      })
  }

  function logoutHandler() {
    setAuthTokens(null)
  }

  return (
    <div>
      <h1>Login Page</h1>
      <input placeholder="username" type="username" value={loginusername} onChange={(e) => setloginusername(e.target.value)}/>
      <input placeholder="password" type="password" value={loginpassword} onChange={(e) => setloginpassword(e.target.value)}/>
      <br/>
      <button onClick={() => loginHandler()} disabled={!loginusername || !loginpassword}>Sign In</button>
      <br/>
      <input placeholder="username" type="username" value={signupusername} onChange={(e) => setsignupusername(e.target.value)}/>
      <input placeholder="password" type="password" value={signuppassword1} onChange={(e) => setsignuppassword1(e.target.value)}/>
      <input placeholder="password" type="password" value={signuppassword2} onChange={(e) => setsignuppassword2(e.target.value)}/>
      <div>{mismatchMessage}</div>
      <br/>
      <button onClick={() => signupHandler()} disabled={mismatchMessage || !signuppassword1 || !signuppassword2 
        || !signupusername}>Sign Up</button>
      <button onClick={() => logoutHandler()}>Sign Out</button>
    </div>
  )
}