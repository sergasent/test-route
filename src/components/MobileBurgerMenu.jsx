import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../contexts/AppContext';

const MobileBurgerMenu = ({ onSignOut }) => {
  const { userEmail } = useContext(AppContext);

  return (
    <div className="burger-menu">
      <p className="burger-menu__user-info">{userEmail}</p>
      <Link
        className="page__link burger-menu__link"
        to="/sign-in"
        onClick={onSignOut}
      >
        Выйти
      </Link>
    </div>
  );
};

export default MobileBurgerMenu;
