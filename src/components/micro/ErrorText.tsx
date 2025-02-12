/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import AppText from '../AppText/AppText';
import {colors} from '../../Styles/theme';
import {fontSizes} from '../../constants/constants';

interface ErrorTextProps {
  error?: string;
  textStyle?: React.CSSProperties;
}

export const ErrorText: React.FC<ErrorTextProps> = ({error, textStyle}) =>
  error ? (
    <AppText
      text={error}
      textColor={colors.errorColor}
      fs={fontSizes.sm}
      textStyle={{marginLeft: 7, alignSelf: 'start', ...textStyle}}
    />
  ) : null;
