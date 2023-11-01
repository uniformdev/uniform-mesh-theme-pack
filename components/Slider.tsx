import { FC, useState } from 'react';
import ReactSlider from 'react-slider';
import { SliderOptions, SliderType } from '../types/mesh';

type SliderProps = {
  value?: number | string;
  onChange: (value?: number | string) => void;
  minValue?: number;
  maxValue?: number;
  step?: number;
  units?: string;
  type?: SliderType;
  options?: SliderOptions[];
};

const StepSlider: FC<SliderProps> = ({
  value,
  onChange,
  minValue = 0,
  maxValue = 12,
  step = 2,
  units = 'px',
}) => {
  const [currentValue, setCurrentValue] = useState<number>(() => {
    if (!value) return minValue;

    return Number(value?.toString()?.replace?.(units, ''));
  });

  const handleValueChange = (value: number) => {
    setCurrentValue(value);
    onChange(`${value}${units}`);
  };

  return (
    <div className="slider-style-container">
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="slider-thumb"
        min={minValue}
        max={maxValue}
        onChange={handleValueChange}
        step={step}
        value={currentValue}
      />
      <div className="slider-thumb-value">{currentValue + units}</div>
    </div>
  );
};

const CustomSlider: FC<Pick<SliderProps, 'options' | 'onChange' | 'value'>> = ({
  options,
  onChange,
  value,
}) => {
  const [currentValue, setCurrentValue] = useState<number>(() => {
    if (!options) return 0;
    const savedIndex = options.findIndex((option) => String(option.value) === String(value));

    return savedIndex > -1 ? savedIndex : 0;
  });

  const handleValueChange = (value: number) => {
    setCurrentValue(value);
    onChange(options?.[value].value);
  };

  return (
    <div className="slider-style-container">
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="slider-thumb"
        min={0}
        max={options?.length ? options?.length - 1 : 0}
        onChange={handleValueChange}
        step={1}
        value={currentValue}
      />
      <div className="slider-thumb-value">{options?.[currentValue].label}</div>
    </div>
  );
};
const Slider: FC<SliderProps> = ({
  value,
  onChange,
  minValue = 0,
  maxValue = 12,
  step = 2,
  units = 'px',
  type,
  options,
}) =>
  type === SliderType.Steps ? (
    <StepSlider
      value={value}
      onChange={onChange}
      minValue={minValue}
      maxValue={maxValue}
      step={step}
      units={units}
    />
  ) : (
    <CustomSlider options={options} value={value} onChange={onChange} />
  );

export default Slider;
