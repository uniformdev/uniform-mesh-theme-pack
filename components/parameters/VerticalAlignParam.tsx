import { FC, useEffect } from 'react';
import { SegmentedControl, SegmentedControlOption } from '@uniformdev/design-system';
import { SetLocationValueDispatch } from '@uniformdev/mesh-sdk-react';
import { BottomAlignIcon, VerticalCenterAlignIcon, TopAlignIcon } from '../icons/AlignIcons';

const DEFAULT_VALUE = 'top';

const OPTIONS: SegmentedControlOption[] = [
  {
    icon: (props) => <TopAlignIcon {...props} />,
    value: 'top',
    tooltip: 'top',
  },
  {
    icon: (props) => <VerticalCenterAlignIcon {...props} />,
    value: 'center',
    tooltip: 'center',
  },
  {
    icon: (props) => <BottomAlignIcon {...props} />,
    value: 'bottom',
    tooltip: 'bottom',
  },
];

type VerticalAlignParamProps = {
  value?: string;
  setValue: SetLocationValueDispatch<string | undefined, string | undefined>;
};

const VerticalAlignParam: FC<VerticalAlignParamProps> = ({ value, setValue }) => {
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

export default VerticalAlignParam;
