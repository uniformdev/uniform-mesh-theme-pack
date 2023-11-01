import { FC, ChangeEvent } from 'react';
import { useMeshLocation, InputToggle, Input, ValidationResult } from '@uniformdev/mesh-sdk-react';
import { MeshThemePackParametersConfig } from '../../types/mesh';
import { TRUE_VALIDATION_RESULT } from '../../constants';

type Configuration = { minValue: number; maxValue: number; step: number };

const validate = ({ minValue, maxValue, step }: Configuration): ValidationResult => {
  const validations = [];

  if (minValue < 0) {
    validations.push('Min value');
  }

  if (maxValue < 0) {
    validations.push('Max value');
  }

  if (step < 0) {
    validations.push('Step');
  }

  if (validations.length > 0) {
    return {
      isValid: false,
      validationMessage: `The ${validations.join(', ')} should be positive numbers`,
    };
  }
  return TRUE_VALIDATION_RESULT;
};

const ThemePackParametersConfig: FC = () => {
  const { value: config, setValue: setConfig } = useMeshLocation<
    'paramTypeConfig',
    MeshThemePackParametersConfig
  >();

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setConfig((previousValue) => {
      const newValue = { ...previousValue, [name]: checked };
      return { newValue };
    });
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, valueAsNumber } = e.target;
    setConfig((previousValue) => {
      const newValue = { ...previousValue, [name]: valueAsNumber };
      return { newValue, options: validate(newValue as Configuration) };
    });
  };

  return (
    <div className="config-parameter-container">
      <Input
        name="minValue"
        value={config?.minValue}
        label="Min Value"
        defaultValue={0}
        min={0}
        type="number"
        onChange={handleValueChange}
      />
      <Input
        name="maxValue"
        value={config?.maxValue}
        label="Max Value"
        defaultValue={12}
        min={1}
        type="number"
        onChange={handleValueChange}
      />
      <Input
        name="step"
        value={config?.step}
        label="Step"
        defaultValue={2}
        min={1}
        type="number"
        onChange={handleValueChange}
      />
      <InputToggle
        label="Required"
        name="required"
        type="checkbox"
        checked={Boolean(config?.required)}
        onChange={handleToggle}
      />
    </div>
  );
};

export default ThemePackParametersConfig;
