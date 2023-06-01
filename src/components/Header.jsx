import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../contexts/AppContext';

const Header = ({
  logo,
  headerState: { link, linkText, linkFunc },
}) => {
  const {
    userEmail, isLoggedIn, isMenuVisible, toggleShowMenu, isMobileView,
  } = useContext(AppContext);

  return (
    <header className="header page__section">
      <img src={logo ?? ''} alt="Mesto Russia" lang="en" className="logo" />
      {(!isMobileView || !isLoggedIn) && (
        <div className="header__info">
          {userEmail && <p className="header__user-info">{userEmail}</p>}
          <Link
            className="page__link header__link"
            to={link}
            onClick={linkFunc}
          >
            {linkText}
          </Link>
        </div>
      )}
      {(isLoggedIn && isMobileView) && (
        <button
          onClick={toggleShowMenu}
          className={`page__link header__menu-button ${isMenuVisible && 'header__menu-button_active'}`}
          type="button"
          aria-label={isMenuVisible ? 'Закрыть меню' : 'Открыть меню'}
        />
      )}
    </header>
  );
};

export default Header;
