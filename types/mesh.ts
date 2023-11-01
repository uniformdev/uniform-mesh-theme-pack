import { Theme } from './common';

export const enum SliderType {
  Custom = 'custom',
  Steps = 'steps',
}

export type SliderOptions = {
  label: string;
  value: string;
};

export interface MeshThemePackParametersConfig {
  required?: boolean;
  minValue?: number;
  maxValue?: number;
  step?: number;
  units?: string;
  type?: SliderType;
  options?: SliderOptions[];
}

export interface MeshThemePackParametersDefinition {
  type: string;
}

export interface SettingsParams {
  selectedThemeName: string;
  themes: {
    [name: string]: Theme;
  };
}
