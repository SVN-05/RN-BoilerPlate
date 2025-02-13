// AppCheckbox.js
import React from 'react';
import {StyleSheet, TextStyle, View} from 'react-native';
import CheckBox from 'react-native-check-box';
import {colors} from '../../../../Styles/theme';
import {fontSizes} from '../../../../constants/constants';
import {ErrorText} from '../../../micro/ErrorText';
import {Control, Controller} from 'react-hook-form';

interface AppCheckboxProps {
  leftText?: string;
  leftTextStyle?: TextStyle;
  rightText?: string;
  rightTextStyle?: TextStyle;
  checked: boolean;
  error?: string;
  onChange?: () => void;
  control?: Control;
  name: string;
  rules?: object;
}

interface RenderInputProps {
  onSelect: () => void;
  isChecked: boolean;
}

const AppCheckbox: React.FC<AppCheckboxProps> = ({
  leftText,
  leftTextStyle,
  rightText,
  rightTextStyle,
  checked,
  error,
  control,
  name,
  rules,
  onChange,
}) => {
  const renderInput = ({onSelect, isChecked}: RenderInputProps) => (
    <CheckBox
      isChecked={isChecked}
      onClick={onSelect}
      leftText={leftText}
      leftTextStyle={[styles.leftLabel, leftTextStyle]}
      rightText={rightText}
      rightTextStyle={[styles.rightLabel, rightTextStyle]}
      checkBoxColor={colors.primaryColor}
      uncheckedCheckBoxColor={
        error ? colors.errorColor : colors.inputBorderColor
      }
    />
  );

  return (
    <View>
      {control ? (
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({field: {onChange: onSelect, value: isChecked}}) =>
            renderInput({onSelect, isChecked})
          }
        />
      ) : (
        renderInput({
          onSelect: onChange || (() => {}),
          isChecked: checked,
        }) // Handle uncontrolled case
      )}
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
