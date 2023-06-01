import React, { useEffect } from 'react';
import BlockWithForm from './BlockWithForm';
import useFormValidation from '../hooks/useFormValidation';
import useIsCurrentLocation from '../hooks/useIsCurrentLocation';

const Login = ({ fillHeader, onLogin }) => {
  const colorTheme = 'dark';
  const modalType = 'auth';
  const isOpen = useIsCurrentLocation('/sign-in');

  const {
    isFormValid, formValues, validState, handleChange,
  } = useFormValidation({
    isOpen,
    inputs: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = () => onLogin({
    email: formValues?.email,
    password: formValues?.password,
  });

  useEffect(() => {
    if (isOpen) {
      fillHeader({
        link: '/sign-up',
        linkText: 'Регистрация',
      });
    }
  }, [isOpen]);

  return (
    <BlockWithForm
      title="Вход"
      name="login"
      isValid={isFormValid}
      onSubmit={handleSubmit}
      buttonText="Войти"
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
  );
};

export default Login;
