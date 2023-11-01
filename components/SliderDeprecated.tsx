import { FC, useState } from 'react';
import ReactSlider from 'react-slider';

type SliderProps = {
  value?: number;
  onChange: (value: number) => void;
  minValue?: number;
  maxValue?: number;
  step?: number;
  valueLabel?: string;
};
// This slider component is deprecated and is currently used for the tp-opacity-parameter and tp-size-parameter. Please remove it once these parameters have been eliminated.
const SliderDeprecated: FC<SliderProps> = ({
  value,
  onChange,
  minValue = 0,
  maxValue = 12,
  step = 2,
  valueLabel = 'px',
}) => {
  const [currentValue, setCurrentValue] = useState<number>(value || 0);

  const handleValueChange = (value: number) => {
    setCurrentValue(value);
    onChange(value);
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
        value={value}
      />
      <div className="slider-thumb-value">{currentValue + valueLabel}</div>
    </div>
  );
};

export default SliderDeprecated;
