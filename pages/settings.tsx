import { FC, useMemo, useState } from 'react';
import { Button, Callout, useMeshLocation } from '@uniformdev/mesh-sdk-react';
import { LoadingOverlay } from '@uniformdev/design-system';
import ThemeColorPanel from '../components/ThemeColorPanel';
import ThemesSelector from '../components/ThemeSelector';
import { SettingsParams } from '../types/mesh';
import { ClientError, Theme } from '../types/common';
import StaticThemes from '../public/staticThemes.json';

const DefaultSettings: SettingsParams = {
  selectedThemeName: '',
  themes: {
    uniform: StaticThemes[0],
    javadrip: StaticThemes[1],
  },
};

const Settings: FC = () => {
  const { value, setValue } = useMeshLocation<'settings', SettingsParams>();
  const [formValue, setFormValue] = useState<SettingsParams>({
    selectedThemeName: value.selectedThemeName || DefaultSettings.selectedThemeName,
    themes: value.themes || DefaultSettings.themes,
  });

  const selectedTheme = useMemo(
    () => formValue.themes?.[formValue.selectedThemeName],
    [formValue.selectedThemeName, formValue.themes]
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isNeedToSave, setIsNeedToSave] = useState(false);
  const [infoMessage, setInfoMessage] = useState<ClientError | null>(null);
  const [actionMessage, setActionMessage] = useState<ClientError | null>(null);

  const handelSetTheme = (theme: Theme) => {
    setFormValue((prevState) => ({
      selectedThemeName: theme.themeName,
      themes: { ...prevState.themes, [theme.themeName]: theme },
    }));
    setActionMessage(null);
    setIsNeedToSave(true);
  };

  const handleSaveClick = async () => {
    setIsLoading(true);
    try {
      await setValue(() => ({ newValue: formValue }));
      setInfoMessage({
        type: 'success',
        title: 'Your theme configuration was saved successfully.',
        text: `To apply theme changes to your app, please open the "Header" component then "Main Header" pattern, save and publish it.`,
      });
      setActionMessage({
        type: 'success',
        text: 'Saved',
      });
      setIsNeedToSave(false);
    } catch (error) {
      setInfoMessage({ type: 'error', title: 'Unable to save theme configuration.', text: error.message });
      setActionMessage({
        type: 'error',
        text: 'Error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="settings-container">
      <LoadingOverlay isActive={isLoading} statusMessage="Saving..." />
      <Callout title="Important" type="caution">
        This integration does not install the content for the Theme Pack. Please make sure to follow the steps{' '}
        <a
          href="https://github.com/uniformdev/uniform-component-starter-kit#readme"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>{' '}
        to perform the installation of the components of the starter kit.
      </Callout>

      <div className="settings-theme-container">
        <div className="theme-selector-container">
          <p>Themes</p>
          <ThemesSelector themes={formValue.themes} setTheme={handelSetTheme} selectedTheme={selectedTheme} />
        </div>
        <div className="settings-color-panel-container">
          <p>Colors</p>
          {selectedTheme ? (
            <>
              <ThemeColorPanel
                theme={selectedTheme}
                setTheme={handelSetTheme}
                disabled={selectedTheme.themeName !== 'custom'}
              />
              <div className="container-settings-button">
                <Button
                  type="button"
                  buttonType="secondary"
                  onClick={handleSaveClick}
                  disabled={isLoading || !isNeedToSave}
                >
                  Save
                </Button>
                {actionMessage && <Callout type={actionMessage.type}>{actionMessage.text}</Callout>}
              </div>
            </>
          ) : (
            <Callout type="info" title="Select the theme">
              <p>You can choose one of the suggested themes or customize it as you wish</p>
            </Callout>
          )}
        </div>
      </div>
      {infoMessage && (
        <Callout title={infoMessage.title} type={infoMessage.type}>
          {infoMessage.text}
        </Callout>
      )}
    </div>
  );
};

export default Settings;
