import { CalloutType } from '@uniformdev/design-system';

export interface ClientError {
  type: CalloutType;
  title?: string;
  text: string;
}

export interface Theme {
  themeLabel: string;
  themeName: string;
  colors: ColorItem[];
}

export interface ColorItem {
  label: string;
  name: string;
  value: string;
}
