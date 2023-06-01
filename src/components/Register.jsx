import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlockWithForm from './BlockWithForm';
import useFormValidation from '../hooks/useFormValidation';
import useIsCurrentLocation from '../hooks/useIsCurrentLocation';

const Register = ({ fillHeader, onRegister }) => {
  const colorTheme = 'dark';
  const modalType = 'auth';
  const isOpen = useIsCurrentLocation('/sign-up');

  const {
    isFormValid, formValues, validState, handleChange,
  } = useFormValidation({
    isOpen,
    inputs: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = () => onRegister({
    email: formValues?.email,
    password: formValues?.password,
  });

  useEffect(() => {
    if (isOpen) {
      fillHeader({
        link: '/sign-in',
        linkText: 'Вход',
      });
    }
  }, [isOpen]);

  return (
    <>
      <BlockWithForm
        title="Регистрация"
        name="login"
        isValid={isFormValid}
        onSubmit={handleSubmit}
        buttonText="Зарегистрироваться"
        theme={colorTheme}
        type={modalType}
      >
        <input
          value={formValues?.email ?? ''}
          onChange={handleChange}
          className={`modal-form__input modal-form__input_theme_${colorTheme} ${validState?.email && 'modal-form__input_type_error'}`}
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          size="30"
          required
        />
        <span className={`modal-form__input-error ${validState?.email && 'modal-form__input-error_visible'}`}>
          {validState?.email}
        </span>
        <input
          value={formValues?.password ?? ''}
          onChange={handleChange}
          className={`modal-form__input modal-form__input_theme_${colorTheme} ${validState?.password && 'modal-form__input_type_error'}`}
          type="password"
          name="password"
          id="password"
          placeholder="Пароль"
          minLength="8"
          maxLength="16"
          required
        />
        <span className={`modal-form__input-error ${validState?.password && 'modal-form__input-error_visible'}`}>
          {validState?.password}
        </span>
      </BlockWithForm>
      <p className="modal-block__text">
        Уже зарегистрированы?
        <Link to="/sign-in" className="page__link modal-block__link"> Войти</Link>
      </p>
    </>
  );
};

export default Register;
