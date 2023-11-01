import { FC, useEffect } from 'react';
import { SegmentedControl, SegmentedControlOption } from '@uniformdev/design-system';
import { SetLocationValueDispatch } from '@uniformdev/mesh-sdk-react';

const DEFAULT_VALUE = 'first';

const OPTIONS: SegmentedControlOption[] = [
  {
    label: 'First',
    value: 'first',
    tooltip: 'First',
  },
  {
    label: 'Last',
    value: 'last',
    tooltip: 'Last',
  },
];

type ItemsOrderParamProps = {
  value?: string;
  setValue: SetLocationValueDispatch<string | undefined, string | undefined>;
};

const ItemsOrderParam: FC<ItemsOrderParamProps> = ({ value, setValue }) => {
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

export default ItemsOrderParam;
