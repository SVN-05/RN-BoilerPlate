/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';
import {colors} from '../../../../Styles/theme';
import AppText from '../../../AppText/AppText';
import {Controller, Control} from 'react-hook-form';
import {ErrorText} from '../../../micro/ErrorText';
import {flexCol} from '../../../../styles/commonsStyles';
import {RadioGroup, RadioButtonProps} from 'react-native-radio-buttons-group';

interface AppRadioInputProps {
  value: string;
  inputContainer?: StyleProp<ViewStyle>;
  error?: string;
  control?: Control;
  name: string;
  rules?: object;
  label?: string;
  options: RadioButtonProps[];
  layout?: 'row' | 'column';
  radioContainerStyle?: StyleProp<ViewStyle>;
  onChange?: (value: string) => void;
  borderColor?: string;
  borderWidth?: number;
  color?: string;
}

const AppRadioInput: React.FC<AppRadioInputProps> = ({
  value,
  inputContainer,
  error,
  control,
  name,
  rules,
  label,
  options,
  layout = 'row',
  radioContainerStyle,
  onChange,
  borderColor = colors.black,
  borderWidth = 1,
  color = colors.appColor,
}) => {
  const labelColor = colors.placeholderTxtColor;
  const formattedOptions = options.map(option => ({
    ...option,
    color: color,
    borderColor: borderColor,
    borderWidth: borderWidth,
  }));

  interface RenderInputProps {
    onChange: (value: string) => void;
    value: string;
  }

  const renderInput = ({onChange, value}: RenderInputProps) => (
    <RadioGroup
      radioButtons={formattedOptions}
      layout={layout}
      containerStyle={radioContainerStyle}
      selectedId={value}
      onPress={id => onChange(id)}
    />
  );

  return (
    <View style={[flexCol, inputContainer]}>
      {label && (
        <AppText
          text={label}
          fw={'600'}
          textColor={labelColor}
          textStyle={{marginBottom: 14}}
        />
      )}
      {control ? (
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({field: {onChange, value}}) => renderInput(onChange, value)}
        />
      ) : (
        renderInput(onChange, value) // Handle uncontrolled case
      )}
      <ErrorText error={error} />
    </View>
  );
};

export default AppRadioInput;
