import '../css/Navbar.css';
import logo from '../img/Logo.jpeg';


function Navbar() {
  return (
    <div className='body'>
      <div className='nav'>
        <a href='/' className='linkLogo'>
          <div className='logo'>
            <img src={logo} className="App-logo" alt="logo" />

          </div>
          <span className="nameSite">Estokou</span>
        </a>
        <div className='users'>
          <a href='/registro'>Cadastrar</a>
          <a href='/login'>Login</a>
        </div>

      </div>
    </div>
  );
}

export default Navbar;


