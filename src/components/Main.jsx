import React, { useContext, useEffect } from 'react';
import Card from './Card';
import defaultUserIcon from '../images/profile/user-default.svg';
import useIsCurrentLocation from '../hooks/useIsCurrentLocation';

import AppContext from '../contexts/AppContext';

const Main = ({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  fillHeader,
  onSignOut,
}) => {
  const { currentUser: { avatar, name, about } } = useContext(AppContext);

  const isOpen = useIsCurrentLocation('/');

  useEffect(() => {
    if (isOpen) {
      fillHeader({
        link: '/sign-in',
        linkText: 'Выйти',
        linkFunc: onSignOut,
      });
    }
  }, [isOpen]);

  return (
    <main className="main page__section">
      <section
        className="profile"
        aria-label="Информация о профиле пользователя"
      >
        <div className="profile__container">
          <button onClick={onEditAvatar} type="button" className="profile__avatar-link">
            <img
              src={avatar ?? defaultUserIcon}
              alt="Аватар пользователя"
              className="profile__image"
            />
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{name ?? ''}</h1>
            <button
              onClick={onEditProfile}
              className="profile__edit-button page__link"
              type="button"
              aria-label="Редактировать профиль"
            />
            <p className="profile__description">{about ?? ''}</p>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__add-button page__link"
          type="button"
          aria-label="Новое место"
        />
      </section>

      <section className="cards" aria-label="Список изображений">
        <ul className="cards__list">
          {cards.map((item) => (
            <Card
              key={item._id}
              card={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;
