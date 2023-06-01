import { useEffect, useState } from 'react';
import useInputs from './useInputs';

const useFormValidation = ({ isOpen, inputs }) => {
  const [isFormValid, setFormValid] = useState(false);

  const inputsState = useInputs(inputs, setFormValid);

  useEffect(() => {
    if (isOpen) {
      setFormValid(false);
      inputsState.refreshForm(inputs);
    }
  }, [isOpen]);

  return { isFormValid, ...inputsState };
};

export default useFormValidation;
