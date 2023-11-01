import { FC } from 'react';
import { Callout, SetLocationValueDispatch, useMeshLocation } from '@uniformdev/mesh-sdk-react';
import TitleStyleParam from '../components/parameters/TitleStyleParam';
import VerticalAlignParam from '../components/parameters/VerticalAlignParam';
import HorizontalAlignParam from '../components/parameters/HorizontalAlignParam';
import SetUpThemeParam from '../components/parameters/SetUpThemeParam';
import ButtonStyleParam from '../components/parameters/ButtonStyleParam';
import BadgeStyleParam from '../components/parameters/BadgeStyleParam';
import ColumnWidthParam from '../components/parameters/ColumnWidthParam';
import ColorStyleParam from '../components/parameters/ColorStyleParam';
import { ThemePackParameters } from '../constants';
import {
  MeshThemePackParametersConfig,
  MeshThemePackParametersDefinition,
  SettingsParams,
} from '../types/mesh';
import { Theme } from '../types/common';
import BackgroundTypeParam from '../components/parameters/BackgroundTypeParam';
import ItemsOrderParam from '../components/parameters/ItemsOrderParam';
import SizeParam from '../components/parameters/SizeParam';
import OpacityParam from '../components/parameters/OpacityParam';
import ConfigurableSliderParam from '../components/parameters/ConfigurableSliderParam';
import ReadOnlyContainer from '../components/ReadOnlyContainer';
import PlayAnimationParam from '../components/parameters/PlayAnimationParam';

const ThemePackParametersEditor: FC = () => {
  const { value, setValue, metadata, isReadOnly } = useMeshLocation<
    'paramType',
    string | Theme | undefined
  >();

  const { selectedThemeName, themes } = (metadata?.settings as SettingsParams) || {};

  const selectedParameter = (metadata.parameterDefinition as MeshThemePackParametersDefinition).type || '';

  const {
    required = false,
    minValue,
    maxValue,
    units,
    step,
    type,
    options,
  } = (metadata.parameterConfiguration as MeshThemePackParametersConfig) || {};

  switch (selectedParameter) {
    case ThemePackParameters.setUpTheme:
      return (
        <ReadOnlyContainer isReadOnly={isReadOnly}>
          <SetUpThemeParam
            value={value as Theme | undefined}
            settings={metadata?.settings as SettingsParams | undefined}
            setValue={setValue as SetLocationValueDispatch<Theme | undefined, Theme | undefined>}
            required={required}
          />
        </ReadOnlyContainer>
      );
    case ThemePackParameters.titleStyle:
      return (
        <ReadOnlyContainer isReadOnly={isReadOnly}>
          <TitleStyleParam
            value={value as string | undefined}
            setValue={setValue as SetLocationValueDispatch<string | undefined, string | undefined>}
          />
        </ReadOnlyContainer>
      );
    case ThemePackParameters.colorStyle:
      return (
        <ReadOnlyContainer isReadOnly={isReadOnly}>
          <ColorStyleParam
            value={value as string | undefined}
            selectedTheme={themes?.[selectedThemeName] as Theme | undefined}
            setValue={setValue as SetLocationValueDispatch<string | undefined, string | undefined>}
            required={required}
          />
        </ReadOnlyContainer>
      );
    case ThemePackParameters.verticalAlign:
      return (
        <ReadOnlyContainer isReadOnly={isReadOnly}>
          <VerticalAlignParam
            value={value as string | undefined}
            setValue={setValue as SetLocationValueDispatch<string | undefined, string | undefined>}
          />
        </ReadOnlyContainer>
      );
    case ThemePackParameters.size:
      return (
        <ReadOnlyContainer isReadOnly={isReadOnly}>
          <SizeParam
            value={value as number | undefined}
            minValue={minValue}
            maxValue={maxValue}
            step={step}
            required={required}
            setValue={setValue as SetLocationValueDispatch<number | undefined>}
          />
        </ReadOnlyContainer>
      );
    case ThemePackParameters.slider:
      return (
        <ReadOnlyContainer isReadOnly={isReadOnly}>
          <ConfigurableSliderParam
            value={value?.toString()}
            units={units}
            minValue={minValue}
            maxValue={maxValue}
            step={step}
            type={type}
            options={options}
            setValue={setValue as SetLocationValueDispatch<number | string | undefined>}
          />
        </ReadOnlyContainer>
      );
    case ThemePackParameters.opacity:
      return (
        <ReadOnlyContainer isReadOnly={isReadOnly}>
          <OpacityParam
            value={value as number | undefined}
            minValue={minValue}
            maxValue={maxValue}
            step={step}
            required={required}
            setValue={setValue as SetLocationValueDispatch<number | undefined>}
          />
        </ReadOnlyContainer>
      );
    case ThemePackParameters.horizontalAlign:
      return (
        <ReadOnlyContainer isReadOnly={isReadOnly}>
          <HorizontalAlignParam
            value={value as string | undefined}
            setValue={setValue as SetLocationValueDispatch<string | undefined, string | undefined>}
          />
        </ReadOnlyContainer>
      );
    case ThemePackParameters.columnWidth:
      return (
        <ColumnWidthParam
          value={value as string | undefined}
          setValue={setValue as SetLocationValueDispatch<string | undefined, string | undefined>}
        />
      );
    case ThemePackParameters.buttonStyle:
      return (
        <ReadOnlyContainer isReadOnly={isReadOnly}>
          <ButtonStyleParam
            value={value as string | undefined}
            selectedTheme={themes?.[selectedThemeName] as Theme | undefined}
            setValue={setValue as SetLocationValueDispatch<string | undefined, string | undefined>}
            required={required}
          />
        </ReadOnlyContainer>
      );
    case ThemePackParameters.backgroundType:
      return (
        <ReadOnlyContainer isReadOnly={isReadOnly}>
          <BackgroundTypeParam
            value={value as string | undefined}
            selectedTheme={themes?.[selectedThemeName] as Theme | undefined}
            setValue={setValue as SetLocationValueDispatch<string | undefined, string | undefined>}
            required={required}
          />
        </ReadOnlyContainer>
      );
    case ThemePackParameters.badgeStyle:
      return (
        <ReadOnlyContainer isReadOnly={isReadOnly}>
          <BadgeStyleParam
            value={value as string | undefined}
            selectedTheme={themes?.[selectedThemeName] as Theme | undefined}
            setValue={setValue as SetLocationValueDispatch<string | undefined, string | undefined>}
            required={required}
          />
        </ReadOnlyContainer>
      );
    case ThemePackParameters.itemsOrder:
      return (
        <ReadOnlyContainer isReadOnly={isReadOnly}>
          <ItemsOrderParam
            value={value as string | undefined}
            setValue={setValue as SetLocationValueDispatch<string | undefined, string | undefined>}
          />
        </ReadOnlyContainer>
      );
    case ThemePackParameters.playAnimationButton:
      return (
        <ReadOnlyContainer isReadOnly={isReadOnly}>
          <PlayAnimationParam
            setValue={setValue as SetLocationValueDispatch<boolean | undefined, boolean | undefined>}
          />
        </ReadOnlyContainer>
      );
    default:
      return (
        <Callout type="error">
          <p>{`It looks like parameter ${selectedParameter} was not found`}</p>
        </Callout>
      );
  }
};

export default ThemePackParametersEditor;
