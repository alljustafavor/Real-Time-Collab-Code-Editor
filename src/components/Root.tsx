import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { useEffect, useState} from 'react';

import NavBar from "./NavBar";

export default function Root() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.token) {
      setLoggedIn(false);
      return
    }

    fetch('http://localhost:3080/verify', {
      method: 'POST',
      headers: {
        'jwt-token': user.token,
      },
    })
      .then((r) => r.json)
      .then((r) => {
        setLoggedIn('success' === r.message);
        setEmail(user.email || "")
      })
  }, [])

  return (
    <>
      <NavBar />
      <h3>test you programs</h3>
    </>
  )
}   
