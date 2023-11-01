import { FC, useEffect } from 'react';
import { SegmentedControl, SegmentedControlOption } from '@uniformdev/design-system';
import { SetLocationValueDispatch } from '@uniformdev/mesh-sdk-react';
import ColumnWidthIcons from '../icons/ColumnWidthIcons';

const DEFAULT_VALUE = '1/2 - 1/2';

const COLUMN_WIDTH_OPTIONS: SegmentedControlOption[] = [
  {
    value: '1/4 - 3/4',
    icon: (props) => <ColumnWidthIcons._1_4_to_3_4 {...props} />,
  },
  {
    value: '1/3 - 2/3',
    icon: (props) => <ColumnWidthIcons._1_3_to_2_3 {...props} />,
  },
  {
    value: '1/2 - 1/2',
    icon: (props) => <ColumnWidthIcons._1_2_to_1_2 {...props} />,
  },
  {
    value: '2/3 - 1/3',
    icon: (props) => <ColumnWidthIcons._2_3_to_1_3 {...props} />,
  },
  {
    value: '3/4 - 1/4',
    icon: (props) => <ColumnWidthIcons._3_4_to_1_4 {...props} />,
  },
];

type ColumnWidthParamProps = {
  value?: string;
  setValue: SetLocationValueDispatch<string | undefined, string | undefined>;
};

const ColumnWidthParam: FC<ColumnWidthParamProps> = ({ value, setValue }) => {
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
        name="columnWidthSelector"
        onChange={handelSetValue}
        options={COLUMN_WIDTH_OPTIONS}
        orientation="horizontal"
        size="md"
        value={value}
        noCheckmark
      />
    </div>
  );
};

export default ColumnWidthParam;
