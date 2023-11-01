import { FC, useEffect } from 'react';
import { SegmentedControl, SegmentedControlOption } from '@uniformdev/design-system';
import { SetLocationValueDispatch } from '@uniformdev/mesh-sdk-react';

const DEFAULT_VALUE = 'h1';

const TITLE_STYLE_OPTIONS: SegmentedControlOption[] = new Array(4)
  .fill('h')
  .map((v: string, index) => ({ label: `${v.toUpperCase()}${index + 1}`, value: `${v}${index + 1}` }));

type TitleStyleParamsProps = {
  value?: string;
  setValue: SetLocationValueDispatch<string | undefined, string | undefined>;
};

const TitleStyleParam: FC<TitleStyleParamsProps> = ({ value, setValue }) => {
  useEffect(
    () => {
      setValue((previousValue) => ({ newValue: previousValue || DEFAULT_VALUE }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handelSetValue = (newValue: string) => setValue(() => ({ newValue }));

  return (
    <SegmentedControl
      name="titleStyleSelector"
      onChange={handelSetValue}
      options={TITLE_STYLE_OPTIONS}
      orientation="horizontal"
      size="md"
      value={value}
      noCheckmark
    />
  );
};

export default TitleStyleParam;
