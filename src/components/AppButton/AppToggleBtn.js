import React from 'react';
import ToggleSwitch from 'toggle-switch-react-native';
import {View} from 'react-native';
import {colors} from '../../Styles/theme';
import AppText from '../AppText/AppText';
import {fontSizes} from '../../constants/constants';
import {flexRow} from '../../Styles/commonsStyles';

const AppToggleBtn = ({
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
        <AppText
          text={leftSideText}
          fs={fontSizes.sm}
          textColor={colors.greyFFFFFF66}
        />
      )}
      <ToggleSwitch
        isOn={isOn}
        disabled={disabled}
        onColor={colors.primaryColor}
        offColor={colors.primaryBackground}
        thumbOnStyle={{
          backgroundColor: colors.whiteF4F2F1,
        }}
        thumbOffStyle={{
          backgroundColor: colors.grey82827D,
        }}
        size={size}
        onToggle={onChange}
      />
      {rightSideText && (
        <AppText
          text={rightSideText}
          fs={fontSizes.sm}
          textColor={colors.greyFFFFFF66}
        />
      )}
    </View>
  );
};

export default AppToggleBtn;
