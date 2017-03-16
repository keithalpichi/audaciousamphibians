import React from 'react'

class Login extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
      Username: <input></input>
      Password: <input></input>
      <button onClick={() => console.log('clicked')}>Login</button>
      </div>
    )
  }
}

export default Login
