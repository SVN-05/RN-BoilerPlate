import React from 'react';
import {Linking, Text, TextProps, useWindowDimensions} from 'react-native';
import {colors, fonts} from '../../Styles/theme';
import Hyperlink from 'react-native-hyperlink';
import RenderHTML from 'react-native-render-html';
import {fontSizes} from '../../constants/constants';

export type FontWeight = '500' | '600' | 'bold' | 'extra' | 'italic' | 'normal';

interface AppTextProps extends TextProps {
  text?: string;
  numberOfLines?: number;
  fs?: number;
  fw?: FontWeight;
  textStyle?: object;
  textColor?: string;
  onPress?: () => void;
  onTextLayout?: (event: any) => void;
  enableOnpress?: boolean;
  hasHyperLink?: boolean;
  isHtmlContent?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

const AppText: React.FC<AppTextProps> = ({
  text = '',
  numberOfLines,
  fs = fontSizes.lg,
  fw = 'normal',
  textStyle = {},
  textColor = colors.textColor,
  onPress = () => {},
  onTextLayout = () => {},
  enableOnpress = false,
  hasHyperLink = false,
  isHtmlContent = false,
  disabled = false,
  children,
  ...props
}) => {
  const {width} = useWindowDimensions();
  const source = {html: text};

  const fontFamily = (() => {
    switch (fw) {
      case '500':
        return fonts.primaryMedium;
      case '600':
        return fonts.primarySemiBold;
      case 'bold':
        return fonts.primaryBold;
      case 'extra':
        return fonts.primaryExtraBold;
      case 'italic':
        return fonts.primaryItalic;
      default:
        return fonts.primaryRegular;
    }
  })();

  const commonStyle = {
    fontFamily,
    color: textColor,
    fontSize: fs,
    flexShrink: 1,
    ...textStyle,
  } as const;

  const areaDisabled = enableOnpress ? false : true;

  if (isHtmlContent) {
    return (
      <RenderHTML
        source={source}
        contentWidth={width}
        baseStyle={commonStyle}
        {...props}
      />
    );
  }

  const handleHyperlinkPress = (url: string) => {
    Linking.openURL(url).catch(err =>
      console.error('Failed to open URL:', err),
    );
  };

  if (hasHyperLink) {
    return (
      <Hyperlink linkStyle={commonStyle} onPress={handleHyperlinkPress}>
        <Text style={commonStyle} aria-disabled={areaDisabled} {...props}>
          {children ?? text}
        </Text>
      </Hyperlink>
    );
  }

  return (
    <Text
      disabled={disabled}
      onPress={enableOnpress ? onPress : undefined}
      onTextLayout={onTextLayout}
      numberOfLines={numberOfLines}
      style={commonStyle}
      aria-disabled={areaDisabled}
      {...props}>
      {children ?? text}
    </Text>
  );
};

export default AppText;
