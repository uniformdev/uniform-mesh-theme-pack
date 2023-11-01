import { FC, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { useMeshLocation, InputToggle } from '@uniformdev/mesh-sdk-react';
import { MeshThemePackParametersConfig } from '../../types/mesh';

const ThemePackParametersConfig: FC = () => {
  const router = useRouter();
  const { value: config, setValue: setConfig } = useMeshLocation<
    'paramTypeConfig',
    MeshThemePackParametersConfig
  >();

  const showRequired = router?.query?.showRequired === 'true';

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setConfig((previousValue) => {
      const newValue = { ...previousValue, [name]: checked };
      return { newValue };
    });
  };

  return (
    <div className="config-parameter-container">
      {showRequired && (
        <InputToggle
          label="Required"
          name="required"
          type="checkbox"
          checked={Boolean(config?.required)}
          onChange={handleToggle}
        />
      )}
    </div>
  );
};

export default ThemePackParametersConfig;
