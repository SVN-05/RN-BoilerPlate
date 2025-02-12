/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import ToggleSwitch from 'toggle-switch-react-native';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../Styles/theme';
import AppText from '../AppText/AppText';
import {fontSizes} from '../../constants/constants';
import {flexRow} from '../../Styles/commonsStyles';

import {ViewStyle} from 'react-native';

interface AppToggleBtnProps {
  isOn?: boolean;
  size?: 'small' | 'medium' | 'large';
  rightSideText?: string;
  leftSideText?: string;
  disabled?: boolean;
  onChange?: () => void;
  containerStyle?: ViewStyle;
}

const AppToggleBtn: React.FC<AppToggleBtnProps> = ({
  isOn = false,
  size = 'small',
  rightSideText = '',
  leftSideText = '',
  disabled = false,
  onChange = () => {},
  containerStyle,
}) => {
  return (
    <View style={[{...containerStyle, columnGap: 10}, flexRow]}>
      {leftSideText && (
        <AppText text={leftSideText} fs={fontSizes.sm} textColor={''} />
      )}
      <ToggleSwitch
        isOn={isOn}
        disabled={disabled}
        onColor={colors.primaryColor}
        offColor={colors.primaryBackground}
        thumbOnStyle={styles.thumbOnStyle}
        thumbOffStyle={styles.thumbOffStyle}
        size={size}
        onToggle={onChange}
      />
      {rightSideText && (
        <AppText text={rightSideText} fs={fontSizes.sm} textColor={''} />
      )}
    </View>
  );
};

export default AppToggleBtn;

const styles = StyleSheet.create({
  thumbOnStyle: {
    backgroundColor: '',
  },
  thumbOffStyle: {
    backgroundColor: '',
  },
});
