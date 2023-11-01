import { FC, ReactElement } from 'react';
import StaticThemes from '../public/staticThemes.json';
import UniformThemeIcon from './icons/UniformThemeIcon';
import JavaDripThemeIcon from './icons/JavaDripThemeIcon';
import { UniformBadge } from '@uniformdev/design-system';
import { Theme } from '../types/common';

export const ThemeIconMap: { [name: string]: ReactElement } = {
  uniform: <UniformThemeIcon />,
  javadrip: <JavaDripThemeIcon />,
  custom: <UniformBadge />,
};

const CUSTOM = 'custom';

type StaticThemesSelectorProps = {
  themes: { [name: string]: Theme };
  setTheme: (theme: Theme) => void;
  selectedTheme?: Theme;
};
const StaticThemesSelector: FC<StaticThemesSelectorProps> = ({ themes, selectedTheme, setTheme }) => {
  const handelSetCustomTheme = () => {
    const colors = themes?.[CUSTOM]?.colors ? themes[CUSTOM].colors : StaticThemes[0].colors;
    setTheme({ colors, themeName: CUSTOM, themeLabel: 'Custom' });
  };

  const isCustomTheme = selectedTheme?.themeName === CUSTOM;

  return (
    <>
      {Object.values(themes)
        .filter((theme) => !theme.themeName.includes(CUSTOM))
        .map((theme, index) => {
          const isSelectedTheme = !isCustomTheme && selectedTheme?.themeName === theme.themeName;
          return (
            <div
              key={`${theme.themeName}-${index}`}
              className={`theme-item ${isSelectedTheme ? 'selected-theme-item' : ''}`}
              onClick={!isSelectedTheme ? () => setTheme(theme) : undefined}
            >
              {ThemeIconMap[theme.themeName]}
              <p>{theme.themeLabel}</p>
            </div>
          );
        })}
      <div className="theme-selector-divider" />
      <div
        className={`theme-item ${isCustomTheme ? 'selected-theme-item' : ''}`}
        onClick={!isCustomTheme ? handelSetCustomTheme : undefined}
      >
        {ThemeIconMap[CUSTOM]}
        <p>Custom</p>
      </div>
    </>
  );
};

export default StaticThemesSelector;
