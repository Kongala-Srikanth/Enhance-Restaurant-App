import {useState} from 'react'
import Cookies from 'js-cookie'

import './index.css'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorStatus, seterrorStatus] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const {history} = props
  const jwtToken = Cookies.get('jwt_token') !== undefined && history.push('/')
  console.log(jwtToken)

  const loginPage = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const body = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(body),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      // const {history} = props

      Cookies.set('jwt_token', data.jwt_token, {expires: 30, path: '/'})
      history.replace('/login')
    } else {
      seterrorStatus(true)
      setErrorMsg(data.error_msg)
    }
  }

  return (
    <div className="container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={loginPage}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            required
            value={username}
            onChange={e => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
          {errorStatus && <p className="error-message">{errorMsg}</p>}
        </form>
      </div>
    </div>
  )
}

export default Login
