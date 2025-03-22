import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
        <li className="nav-item"><Link to="/saved-candidates" className="nav-link">Potential Candidates</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;