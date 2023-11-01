import { FC, useEffect, useMemo } from 'react';
import { Callout, SetLocationValueDispatch } from '@uniformdev/mesh-sdk-react';
import { Theme } from '../../types/common';
import Slider from '../Slider';
import { SliderOptions, SliderType } from '../../types/mesh';
import DeleteButton from '../DeleteButton';

type ConfigurableSliderParamProps = {
  value?: string;
  selectedTheme?: Theme;
  setValue: SetLocationValueDispatch<number | string | undefined>;
  minValue?: number;
  maxValue?: number;
  step?: number;
  units?: string;
  type?: SliderType;
  options?: SliderOptions[];
};

const ConfigurableSliderParam: FC<ConfigurableSliderParamProps> = ({
  value,
  setValue,
  minValue = 0,
  maxValue = 10,
  step = 1,
  type = SliderType.Steps,
  options = [],
  units = 'px',
}) => {
  useEffect(
    () => {
      if (!value) {
        setValue(() => ({
          newValue: options?.[0]?.value,
        }));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handelSaveValue = (value?: number | string) => {
    setValue(() => ({ newValue: value }));
  };

  const isValidValue = useMemo(() => {
    if (!value) return true;

    if (type === SliderType.Steps) {
      return value.includes(units);
    } else {
      return options?.some((option) => option.value === value);
    }
  }, [type, value, options, units]);

  if (!isValidValue) {
    return (
      <Callout type="danger">
        <div className="wrong-value-container">
          The parameter configuration changed. Clear data and save new.
          <DeleteButton onClick={() => setValue(() => ({ newValue: options?.[0]?.value }))} title="Clear" />
        </div>
      </Callout>
    );
  }

  return (
    <Slider
      onChange={handelSaveValue}
      minValue={minValue}
      maxValue={maxValue}
      step={step}
      units={units}
      type={type}
      options={options}
      value={value}
    />
  );
};

export default ConfigurableSliderParam;
