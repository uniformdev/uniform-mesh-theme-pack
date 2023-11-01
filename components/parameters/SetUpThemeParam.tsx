import { FC, useEffect, useMemo } from 'react';
import { SetLocationValueDispatch, ValidationResult } from '@uniformdev/mesh-sdk-react';
import { ThemeIconMap } from '../ThemeSelector';
import CalloutNonThemeSelected from './CalloutNonThemeSelected';
import { TRUE_VALIDATION_RESULT } from '../../constants';
import { deepEqual } from '../../utils';
import { Theme } from '../../types/common';
import { SettingsParams } from '../../types/mesh';

const validate = (settings?: SettingsParams): ValidationResult => {
  if (!settings?.selectedThemeName) {
    return {
      isValid: false,
      validationMessage: 'The theme must be set up',
    };
  }
  return TRUE_VALIDATION_RESULT;
};

type SetUpThemeParamProps = {
  value?: Theme;
  settings?: SettingsParams;
  setValue: SetLocationValueDispatch<Theme | undefined, Theme | undefined>;
  required?: boolean;
};

const SetUpThemeParam: FC<SetUpThemeParamProps> = ({ value, settings, setValue, required = false }) => {
  const newTheme = useMemo(
    () => settings?.themes?.[settings?.selectedThemeName],
    [settings?.selectedThemeName, settings?.themes]
  );

  useEffect(
    () => {
      const validateResult = validate(settings);
      if (!validateResult.isValid || !deepEqual(value, newTheme)) {
        setValue(() => ({
          newValue: newTheme,
          options: required ? validateResult : undefined,
        }));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (!newTheme) return <CalloutNonThemeSelected />;
  return (
    <div className="theme-item selected-theme-item">
      {ThemeIconMap[newTheme.themeName]}
      <p>{newTheme.themeLabel}</p>
    </div>
  );
};

export default SetUpThemeParam;
