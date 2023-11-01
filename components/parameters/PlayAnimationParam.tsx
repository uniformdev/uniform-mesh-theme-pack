import { FC } from 'react';
import { Button } from '@uniformdev/design-system';
import { SetLocationValueDispatch } from '@uniformdev/mesh-sdk-react';

type ItemsOrderParamProps = {
  setValue: SetLocationValueDispatch<boolean | undefined, boolean | undefined>;
};

const PlayAnimationParam: FC<ItemsOrderParamProps> = ({ setValue }) => {
  const handelSetValue = () => {
    setValue(() => ({ newValue: true }));

    setTimeout(() => {
      setValue(() => ({ newValue: undefined }));
    }, 1000);
  };

  return (
    <Button onClick={handelSetValue} buttonType="secondary">
      Animation Preview
    </Button>
  );
};

export default PlayAnimationParam;
