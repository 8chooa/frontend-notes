import { useState } from 'react';

const LoginForm = ({ sendData }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    sendData({ username, password })
      .then(() => {
        setUsername('');
        setPassword('');
      })
    
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="formulario formulario-login">
        <div>
          <label>
            username {' '}
            <input type="text" value={username} onChange={event => setUsername(event.target.value)} required/>
          </label>
          
        </div>
        <div>
          <label>
            password {' '}
            <input type="password" value={password} onChange={event => setPassword(event.target.value)} required/>
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
};

export default LoginForm;