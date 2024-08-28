

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
  const auth = JSON.parse(localStorage.getItem('user'));
  const role = auth?.role;
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <div className='flex-nav'>
      <ul className="nav-ul">
        <img className='logo' src='https://www.brandbucket.com/sites/default/files/logo_uploads/293712/large_certicue_0.png' alt='logo_img' />
        <li><Link to="/">Home</Link></li>

        {role === 'admin' && (
          <>
            <li><Link to="/upload">Upload</Link></li>
            <li><Link to="/manage">Manage</Link></li>
          </>
        )}

        {role === 'user' && (
          <>
            <li><Link to="/Verify">Verify</Link></li>
            
          </>
        )}

        <li><Link to="/support">Support</Link></li>
      </ul>

      <ul className='nav-ul'>
        {!auth && <li><Link to="/signup">SignUp</Link></li>}
        {!auth && <li><Link to="/login">Login</Link></li>}
        
        {auth && <li><Link onClick={logout} to="/login">Logout ({auth.name})</Link></li>}
      </ul>
    </div>
  );
};

export default Nav;
