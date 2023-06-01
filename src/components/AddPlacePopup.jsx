import React from 'react';

import PopupWithForm from './PopupWithForm';
import useFormValidation from '../hooks/useFormValidation';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const {
    isFormValid, formValues, validState, handleChange,
  } = useFormValidation({
    isOpen,
    inputs: {
      name: '',
      link: '',
    },
  });

  const handleSubmit = () => onAddPlace({
    name: formValues?.name,
    link: formValues?.link,
  });

  return (
    <PopupWithForm
      title="Новое место"
      name="new-card"
      isOpen={isOpen}
      isValid={isFormValid}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={formValues?.name ?? ''}
        onChange={handleChange}
        className={`modal-form__input modal-form__input_type_card-name ${validState?.name && 'modal-form__input_type_error'}`}
        type="text"
        name="name"
        id="card-name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className={`modal-form__input-error ${validState?.name && 'modal-form__input-error_visible'}`}>
        {validState?.name}
      </span>
      <input
        value={formValues?.link ?? ''}
        onChange={handleChange}
        className={`modal-form__input modal-form__input_type_card-link ${validState?.link && 'modal-form__input_type_error'}`}
        type="url"
        name="link"
        id="image-link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className={`modal-form__input-error ${validState?.link && 'modal-form__input-error_visible'}`}>
        {validState?.link}
      </span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
