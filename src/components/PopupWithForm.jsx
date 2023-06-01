/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

const PopupWithForm = ({
  name, isOpen, isValid, title, children, buttonText, onClose, onSubmit,
}) => {
  const [buttonCaption, setButtonText] = useState(buttonText || 'Сохранить');
  const defaultButtonCaption = buttonCaption;

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonText('Загрузка');
    onSubmit()
      .finally(() => setTimeout(() => {
        setButtonText(defaultButtonCaption);
      }, 300)); // 300мс на анимацию закрытия
  };

  const handleQuitClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onClick={handleQuitClick}
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
    >
      <div className="modal-block">
        <h2 className="modal-block__title">{title}</h2>
        <form
          onSubmit={handleSubmit}
          className="modal-form"
          name={`${name}-form`}
          method="post"
          action="/"
          noValidate
        >
          <fieldset className="modal-form__input-group">{children}</fieldset>
          <button
            className={`modal-block__button modal-form__button ${!isValid && 'modal-form__button_disabled'}`}
            type="submit"
            disabled={!isValid}
          >
            {buttonCaption}
          </button>
        </form>

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

export default PopupWithForm;
