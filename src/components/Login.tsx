import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

    const onButtonClick = () => {

        // Set initial error values to empty
        setEmailError("")
        setPasswordError("")

        // Check if the user has entered both fields correctly
        if ("" === email) {
            setEmailError("Please enter your email")
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email")
            return
        }

        if ("" === password) {
            setPasswordError("Please enter a password")
            return
        }

        if (password.length < 7) {
            setPasswordError("The password must be 8 characters or longer")
            return
        }

        // Check if email has an account associated with it
        checkAccountExists(accountExists => {
            // If yes, log in 
            if (accountExists)
                logIn()
            else
            // Else, ask user if they want to create a new account and if yes, then log in
                if (window.confirm("An account does not exist with this email address: " + email + ". Do you want to create a new account?")) {
                    logIn()
                }
        })        
  

    }

    // Call the server API to check if the given email ID already exists
    const checkAccountExists = (callback) => {
        fetch("http://localhost:3080/check-account", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({email})
        })
        .then(r => r.json())
        .then(r => {
            callback(r?.userExists)
        })
    }

    // Log in a user using email and password
    const logIn = () => {
        fetch("http://localhost:3080/auth", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({email, password})
        })
        .then(r => r.json())
        .then(r => {
            if ('success' === r.message) {
                localStorage.setItem("user", JSON.stringify({email, token: r.token}))
                props.setLoggedIn(true)
                props.setEmail(email)
                navigate("/")
            } else {
                window.alert("Wrong email or password")
            }
        })
    }  
  return (
    <>
      <NavBar />
      <div className={'main-container'}>
        <div className={'title-container'}>
          <h1>Login</h1>
        </div>
        <br />
        <div className={'input-container'}>
          <input
            defaultValue={email}
            placeholder='email'
            onChange={(evt) => setEmail(evt.target.value)}
            className={'input-box'}
          />
          <label className='error-lable'>{emailError}</label>
        </div>
        <br />
        <div className={'input-container'}>
          <input
            defaultValue={password}
            placeholder='password'  
            onChange={(evt) => setPassword(evt.target.value)}
            className={'input-box'}
          />
          <label className={'error-lable'}>{passwordError}</label>
        </div>
        <br />
        <div className={'button-container'}>
          <input className={'input-btn'} type='button' onClick={onButtonClick} value={'Log in'} />
        </div>
      </div>
    </>
  );
}
