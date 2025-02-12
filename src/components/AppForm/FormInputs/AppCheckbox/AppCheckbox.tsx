// AppCheckbox.js
import React from 'react';
import {StyleSheet, TextStyle, View} from 'react-native';
import CheckBox from 'react-native-check-box';
import {colors} from '../../../../Styles/theme';
import {fontSizes} from '../../../../constants/constants';
import {ErrorText} from '../../../micro/ErrorText';

interface AppCheckboxProps {
  leftText: string;
  leftTextStyle?: TextStyle;
  rightText: string;
  rightTextStyle?: TextStyle;
  checked: boolean;
  error?: string;
  onChange?: () => void;
}

const AppCheckbox: React.FC<AppCheckboxProps> = ({
  leftText,
  leftTextStyle,
  rightText,
  rightTextStyle,
  checked,
  error,
  onChange,
}) => {
  return (
    <View>
      <CheckBox
        isChecked={checked}
        onClick={onChange ? onChange : () => {}}
        leftText={leftText}
        leftTextStyle={[styles.leftLabel, leftTextStyle]}
        rightText={rightText}
        rightTextStyle={[styles.rightLabel, rightTextStyle]}
        checkBoxColor={colors.primaryColor}
        uncheckedCheckBoxColor={
          error ? colors.errorColor : colors.inputBorderColor
        }
      />
      <ErrorText error={error} />
    </View>
  );
};

const styles = StyleSheet.create({
  rightLabel: {
    marginLeft: 15,
    fontSize: fontSizes.md,
    color: '',
  },
  leftLabel: {
    marginRight: 15,
    fontSize: fontSizes.md,
    color: '',
  },
});

export default AppCheckbox;
