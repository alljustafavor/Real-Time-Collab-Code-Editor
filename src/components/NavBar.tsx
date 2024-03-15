
import '../index.css';

export default function NavBar() {
  return (
    <>
      <header>
        <h2 id='nav-title'>RTCCE</h2> 
        <nav className="links-container">
          <ul>
            <li><a href={'/login'}>Login</a></li>
            <li><a href={'/signup'}>Sign Up</a></li>
          </ul>
        </nav>
      </header>
    </>
  );
}
