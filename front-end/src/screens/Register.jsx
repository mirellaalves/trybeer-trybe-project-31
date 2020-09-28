import React, { useState } from 'react';
import '../styles/Register.css';
const emailTest = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
const nameTest = /[A-Z-a-z]+$/i;

function Register(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(0);
  const [role, setRole] = useState('client');
  const [errorMessage, setErrorMessage] = useState('');

  const valideteNewUser = () => (
    (name.length >= 12 && nameTest.test(name))
    && (emailTest.test(email))
    && (password.length >= 6 && typeof password !== 'number')
  );
  console.log((name.length >= 12 && nameTest.test(name))
    && (emailTest.test(email))
    && (password.length >= 6 && typeof password !== 'number'))

  const setLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
  }

  return (
    <div className="ContainerRegister">
      <h1>Registro</h1>
      <form id="register-form" className="FormRegister">
        <label htmlFor="name">Nome
          <input
            data-testid="signup-name"
            id="name"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </label><br />
        <label htmlFor="email">Email<br />
          <input
            data-testid="signup-email"
            id="email"
            type="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </label><br />
        <label htmlFor="password">Password<br />
          <input
            data-testid="signup-password"
            id="password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </label><br />
        <label htmlFor="saleOption">Quero Vender
          <input
            data-testid="signup-seller"
            id="saleOption"
            type="checkbox"
            onChange={() => {
              if (role === 'client') {
                setRole('administrator')
              }
              else {
                setRole('client')
              }
            }}
          />
        </label><br />
        <button
          className="SignupBtn"
          data-testid="signup-btn"
          type="button"
          onClick={async () => {
            const body = { "name": name, "email": email, "password": password, "role": role }
            const headers = new Headers({
              "Content-Type": "application/json",
              "Content-Length": JSON.stringify(body).length
            })
            const user = await
              fetch('http://localhost:3001/register', { method: 'POST', body: JSON.stringify(body), headers })
                .then((response) => response.json()
                  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))))
                .catch((err) => {
                  if (err.message) {
                    setErrorMessage(err.message);
                    return 'error';
                  }
                  return null;
                });;
            if (user === 'error') return;
            setLocalStorage(user);
            if (body.role === 'administrator') {
              return props.history.push('/admin/orders');
            }
            return props.history.push('/products');
          }}
          disabled={!valideteNewUser()}
        >
          Cadastrar
          </button>
        <p>{errorMessage}</p>
      </form>
    </div>
  )
}

export default Register;
