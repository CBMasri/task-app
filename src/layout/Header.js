import logo from 'assets/icons/logo.svg';
import 'assets/styles/Header.css';

function Header() {
  return (
    <header className="app-header">
      <img src={logo} className="app-logo" alt="logo" />
      <h3>Task App</h3>
    </header>
  );
}

export default Header;
