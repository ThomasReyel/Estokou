import '../css/UserNavbar.css';
import profile from './Profiles';
import logo from '../img/Logo.jpeg';
import avatar from '../img/Avatar.png';
function UserNavbar() {

    function handleExit() {
        profile.setName("");
        profile.setId(0);
        profile.setStorageId(null);
        profile.setStorageName("");
    }

    return (
        <div className='header'>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet"></link>
            <a href='/usuario'>
                <img src={logo} alt="Avatar" className="avatar"></img>
                <span className="nameSite">Estokou</span>
            </a>
            <div className="user-section">
                <img src={avatar} alt="Avatar" className="avatar"></img>
                <span>Olá {profile.getName()}!</span>
                <a href='/'>
                    <button className="logout-button" onClick={handleExit}>
                        <b>Sair</b>
                        <i className="fas fa-sign-out-alt"></i>
                    </button>
                </a>
            </div>
        </div>
    );
}

export default UserNavbar;