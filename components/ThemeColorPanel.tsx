import { ChangeEvent, FC } from 'react';
import { Input } from '@uniformdev/design-system';
import { Theme } from '../types/common';

type ThemeColorPanelProps = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  disabled?: boolean;
};

const ThemeColorPanel: FC<ThemeColorPanelProps> = ({ theme, setTheme, disabled = false }) => {
  const handleSetColors = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTheme({
      ...theme,
      colors: theme.colors.map((colorItem) =>
        colorItem.name === name ? { ...colorItem, value } : colorItem
      ),
    });
  };

  return (
    <div className="color-pick-container">
      {theme.colors?.map((item, index) => (
        <div key={`${item.name}-${index}`} className="color-item">
          <p>{item.label}</p>
          <div className="color-item-pick" style={{ backgroundColor: item.value }} />
          <Input
            className="color-item-input"
            name={item.name}
            value={item.value}
            onChange={handleSetColors}
            disabled={disabled}
          />
        </div>
      ))}
    </div>
  );
};

export default ThemeColorPanel;
