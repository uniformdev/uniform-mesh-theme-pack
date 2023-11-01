import { FC, ChangeEvent, useState, useMemo, useEffect } from 'react';
import { useMeshLocation, Input, InputSelect, ValidationResult } from '@uniformdev/mesh-sdk-react';
import { MeshThemePackParametersConfig, SliderOptions, SliderType } from '../../types/mesh';
import { TRUE_VALIDATION_RESULT } from '../../constants';

type Configuration = {
  minValue?: number;
  maxValue?: number;
  step?: number;
  type?: SliderType;
  options?: SliderOptions[];
};

const validate = ({ minValue, maxValue, step, type, options }: Configuration): ValidationResult => {
  if (type === SliderType.Custom && !options?.length) {
    return {
      isValid: false,
      validationMessage: `The options is required for custom slider type`,
    };
  }

  const validations = [];

  if (minValue === null || minValue === undefined || minValue < 0) {
    validations.push('min value should be positive numbers');
  }

  if (!maxValue || maxValue < 0) {
    validations.push('max value should be positive numbers');
  }

  if (!step || step < 0) {
    validations.push('step should be positive numbers');
  }

  if (step && maxValue && step > maxValue) {
    validations.push('step should not be more than max value');
  }

  if (validations.length > 0) {
    return {
      isValid: false,
      validationMessage: `The ${validations.join(', ')}`,
    };
  }
  return TRUE_VALIDATION_RESULT;
};

const SLIDER_TYPES = [
  {
    label: 'Custom Options',
    value: SliderType.Custom,
  },
  {
    label: 'Steps',
    value: SliderType.Steps,
  },
];

const POSSIBLE_UNITS = [
  {
    value: 'px',
    label: 'px',
  },
  {
    value: '%',
    label: '%',
  },
  {
    value: 'em',
    label: 'em',
  },
  {
    value: 'rem',
    label: 'rem',
  },
  {
    value: 'vw',
    label: 'vw',
  },
  {
    value: 'vh',
    label: 'vh',
  },
];

const StepTypeDefaultOptions = {
  minValue: 0,
  maxValue: 10,
  step: 1,
  unit: 'px',
};

const CustomTypeDefaultOptions = {
  options: [],
};

const fromOptionsToString = (options: SliderOptions[]) => {
  return options?.map?.((option) => `${option.label}:${option.value}`).join('|');
};

const fromStringToOptions = (options: string) => {
  if (!options) return [];
  return options.split('|').map((option) => {
    if (option.includes(':')) {
      const [label, value] = option.split(':');
      return { label, value };
    }
    return { label: option, value: option };
  });
};

const ThemePackParametersConfig: FC = () => {
  const { value: config, setValue: setConfig } = useMeshLocation<
    'paramTypeConfig',
    MeshThemePackParametersConfig
  >();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isFirstRender = useMemo(() => !config?.type, []);

  const [options, setOptions] = useState<string>(() => fromOptionsToString(config?.options || []));

  const optionsToRender = useMemo(() => fromStringToOptions(options || ''), [options]);

  useEffect(() => {
    if (!config?.type) {
      setConfig(() => {
        const newValue: Configuration = {
          type: SliderType.Custom,
          ...CustomTypeDefaultOptions,
          ...StepTypeDefaultOptions,
        };
        return { newValue, options: validate(newValue) };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, valueAsNumber, value } = e.target;
    const valueToSet = isNaN(valueAsNumber) ? value : valueAsNumber;

    setConfig((previousValue) => {
      const newValue = { ...previousValue, [name]: valueToSet };
      return { newValue, options: validate(newValue as Configuration) };
    });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setConfig((previousValue) => {
      const newValue = { ...previousValue, [name]: value };
      return { newValue, options: validate(newValue as Configuration) };
    });
  };

  const handleTypeChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;

    const newType = value as SliderType;

    // reset all params to default when slider type changed
    setOptions('');
    setConfig((previousValue) => {
      const newValue = {
        ...previousValue,
        [name]: newType,
        ...CustomTypeDefaultOptions,
        ...StepTypeDefaultOptions,
      };
      return { newValue, options: validate(newValue as Configuration) };
    });
  };

  const handleOptionsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setOptions(value);
    setConfig((previousValue) => {
      const newValue = { ...previousValue, options: fromStringToOptions(value) };
      return { newValue, options: validate(newValue as Configuration) };
    });
  };

  const renderConfigurationFields = () => {
    if (config?.type === SliderType.Custom) {
      return (
        <>
          <Input
            name="options"
            label="Options (<text-and-value>|<text>:<value>|...)"
            value={options}
            onChange={handleOptionsChange}
          />
          <ul>
            {optionsToRender?.map((option) => (
              <li key={option.value}>
                {option.label} ({option.value})
              </li>
            ))}
          </ul>
        </>
      );
    } else {
      return (
        <>
          <Input
            name="minValue"
            value={config?.minValue || StepTypeDefaultOptions.minValue}
            label="Min Value"
            defaultValue={StepTypeDefaultOptions.minValue}
            min={0}
            type="number"
            onChange={handleValueChange}
          />
          <Input
            name="maxValue"
            value={config?.maxValue || StepTypeDefaultOptions.maxValue}
            label="Max Value"
            defaultValue={StepTypeDefaultOptions.maxValue}
            min={1}
            type="number"
            onChange={handleValueChange}
          />
          <Input
            name="step"
            value={config?.step || StepTypeDefaultOptions.step}
            label="Step"
            defaultValue={StepTypeDefaultOptions.step}
            min={1}
            type="number"
            onChange={handleValueChange}
          />
          <InputSelect
            label="Units"
            name="units"
            options={POSSIBLE_UNITS}
            onChange={handleSelectChange}
            value={config?.units || StepTypeDefaultOptions.unit}
          />
        </>
      );
    }
  };

  return (
    <div className="config-parameter-container">
      <InputSelect
        label="Slider Type"
        name="type"
        options={SLIDER_TYPES}
        disabled={!isFirstRender}
        onChange={handleTypeChanged}
        value={config?.type}
        caption='Please select type of your slider. If you select "Steps" you will be able to select min and max value and step. If you select "Custom Options" you will be able to configure custom options.'
      />
      {renderConfigurationFields()}
    </div>
  );
};

export default ThemePackParametersConfig;
