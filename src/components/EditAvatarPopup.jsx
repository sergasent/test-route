import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const inputLinkRef = useRef();

  const handleSubmit = () => onUpdateAvatar({
    avatar: inputLinkRef.current.value,
  });

  useEffect(() => {
    inputLinkRef.current.value = '';
  });

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={inputLinkRef}
        className="modal-form__input modal-form__input_type_avatar-link"
        type="url"
        name="avatar"
        id="avatar"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="avatar-error modal-form__input-error" />
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
