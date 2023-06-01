/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

const ImagePopup = ({ card: { link, name }, onClose }) => {
  const handleQuitClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div onClick={handleQuitClick} className={`popup popup_type_show-card ${link && 'popup_opened'}`}>
      <div className="modal-block modal-block_type_show-card">
        <figure className="popup__image-container">
          <img className="popup__image" src={link} alt={name} />
          <figcaption className="popup__image-caption">{name}</figcaption>
        </figure>

        <button
          onClick={onClose}
          className="popup__close-button page__link"
          type="button"
          aria-label="Закрыть"
        />
      </div>
    </div>
  );
};

export default ImagePopup;
