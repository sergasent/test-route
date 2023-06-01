import React, { useState } from 'react';

const BlockWithForm = ({
  name, isValid, title, children, buttonText, onSubmit, theme, type,
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

  return (
    <div className={`modal-block ${theme ? `modal-block_theme_${theme}` : ''} ${type ? `modal-block_type_${type}` : ''}`}>
      <h2 className={`modal-block__title ${type ? `modal-block__title_type_${type}` : ''}`}>{title}</h2>
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
          className={`modal-block__button modal-form__button ${!isValid && 'modal-form__button_disabled'} ${theme ? `modal-block__button_theme_${theme}` : ''} ${type ? `modal-block__button_type_${type}` : ''}`}
          type="submit"
          disabled={!isValid}
        >
          {buttonCaption}
        </button>
      </form>
    </div>
  );
};

export default BlockWithForm;
