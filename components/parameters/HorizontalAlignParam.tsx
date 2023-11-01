import { FC, useEffect } from 'react';
import { SegmentedControl, SegmentedControlOption } from '@uniformdev/design-system';
import { SetLocationValueDispatch } from '@uniformdev/mesh-sdk-react';
import { LeftAlignIcon, HorizontalCenterAlignIcon, RightAlignIcon } from '../icons/AlignIcons';

const DEFAULT_VALUE = 'left';

const OPTIONS: SegmentedControlOption[] = [
  {
    icon: (props) => <LeftAlignIcon {...props} />,
    value: 'left',
    tooltip: 'left',
  },
  {
    icon: (props) => <HorizontalCenterAlignIcon {...props} />,
    value: 'center',
    tooltip: 'center',
  },
  {
    icon: (props) => <RightAlignIcon {...props} />,
    value: 'right',
    tooltip: 'right',
  },
];

type HorizontalAlignParamProps = {
  value?: string;
  setValue: SetLocationValueDispatch<string | undefined, string | undefined>;
};

const HorizontalAlignParam: FC<HorizontalAlignParamProps> = ({ value, setValue }) => {
  useEffect(
    () => {
      setValue((previousValue) => ({ newValue: previousValue || DEFAULT_VALUE }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handelSetValue = (newValue: string) => setValue(() => ({ newValue }));

  return (
    <div className="segmented-container">
      <SegmentedControl
        name="alignSelector"
        onChange={handelSetValue}
        options={OPTIONS}
        orientation="horizontal"
        size="md"
        value={value}
        noCheckmark
      />
    </div>
  );
};

export default HorizontalAlignParam;
