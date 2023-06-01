import React, { useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import useFormValidation from '../hooks/useFormValidation';

import AppContext from '../contexts/AppContext';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const {
    currentUser: {
      name: currentName,
      about: currentAbout,
    },
  } = useContext(AppContext);

  const {
    isFormValid, formValues, validState, handleChange,
  } = useFormValidation({
    isOpen,
    inputs: {
      name: currentName,
      about: currentAbout,
    },
  });

  const handleSubmit = () => onUpdateUser({
    name: formValues?.name,
    about: formValues?.about,
  });

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen}
      isValid={isFormValid}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        onChange={handleChange}
        value={formValues?.name ?? ''}
        className="modal-form__input modal-form__input_type_username"
        type="text"
        name="name"
        id="profile-name"
        placeholder="Ваше имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className={`modal-form__input-error ${validState?.name && 'modal-form__input-error_visible'}`}>
        {validState?.name}
      </span>
      <input
        onChange={handleChange}
        value={formValues?.about ?? ''}
        className="modal-form__input modal-form__input_type_user-description"
        type="text"
        name="about"
        id="profile-description"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
      />
      <span className={`modal-form__input-error ${validState?.about && 'modal-form__input-error_visible'}`}>
        {validState?.about}
      </span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
