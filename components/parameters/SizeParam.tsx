import { FC, useEffect } from 'react';
import { SetLocationValueDispatch, ValidationResult } from '@uniformdev/mesh-sdk-react';
import { Theme } from '../../types/common';
import { TRUE_VALIDATION_RESULT } from '../../constants';
import Slider from '../SliderDeprecated';

const validate = (value?: number): ValidationResult => {
  if (!value) {
    return {
      isValid: false,
      validationMessage: 'The Size must be selected',
    };
  }
  return TRUE_VALIDATION_RESULT;
};

type SizeParamProps = {
  value?: number;
  selectedTheme?: Theme;
  setValue: SetLocationValueDispatch<number | undefined>;
  required?: boolean;
  minValue?: number;
  maxValue?: number;
  step?: number;
};

const SizeParam: FC<SizeParamProps> = ({
  value,
  setValue,
  required = false,
  minValue = 0,
  maxValue = 12,
  step = 2,
}) => {
  useEffect(
    () => {
      if (!required) return;

      setValue((previousValue) => ({
        newValue: previousValue,
        options: validate(previousValue),
      }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handelSaveValue = (value: number | string | undefined) => {
    const valueAsNumber = Number(value);
    setValue(() => ({ newValue: valueAsNumber, options: required ? validate(valueAsNumber) : undefined }));
  };

  return (
    <Slider
      onChange={handelSaveValue}
      minValue={minValue}
      maxValue={maxValue}
      step={step}
      value={isNaN(Number(value)) ? 0 : value}
    />
  );
};

export default SizeParam;
