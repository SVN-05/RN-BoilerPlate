/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {colors} from '../../../../styles/theme';
import AppText from '../../../AppText/AppText';
import {Controller} from 'react-hook-form';
import {ErrorText} from '../../../micro/ErrorText';
import {flexRow} from '../../../../styles/commonsStyles';
import AppIcon, {iconFamily} from '../../../AppIcon/AppIcon';

interface AppDatePickerProps {
  mode?: 'date' | 'time' | 'datetime';
  minDate?: string;
  maxDate?: string;
  control?: any;
  name: string;
  error?: string;
  placeholder?: string;
  rules?: object;
  disabled?: boolean;
  value?: string;
  label?: string;
}

interface RenderDatePickerProps {
  onChange: (date: string) => void;
  value: string | Date;
}

const AppDatePicker: React.FC<AppDatePickerProps> = ({
  mode = 'date',
  minDate,
  maxDate,
  control,
  name,
  error,
  placeholder,
  rules,
  disabled = false,
  value,
  label,
}) => {
  const inputBorderColor = colors.inputBorderColor;
  const placeholderTextColor = colors.placeholderTxtColor;
  const labelColor = error ? colors.errorColor : colors.placeholderTxtColor;

  const [open, setOpen] = useState(false);

  const handleDatePicker = () => {
    if (!disabled) {
      setOpen(prev => !prev);
    }
  };

  const renderDatePicker = ({
    onChange,
    value: passed_value,
  }: RenderDatePickerProps) => (
    <DatePicker
      modal
      mode={mode}
      open={open}
      date={passed_value ? new Date(passed_value) : new Date()}
      {...(minDate ? {minimumDate: new Date(minDate)} : {})}
      {...(maxDate ? {maximumDate: new Date(maxDate)} : {})}
      onConfirm={date => {
        const dateString = new Date(date).toISOString().slice(0, 10);
        setOpen(false);
        onChange(dateString);
      }}
      onCancel={() => setOpen(false)}
    />
  );

  return (
    <View style={{width: '100%'}}>
      {label && (
        <AppText
          text={label}
          fw={'600'}
          textColor={labelColor}
          textStyle={{marginBottom: 14}}
        />
      )}
      <TouchableWithoutFeedback onPress={handleDatePicker}>
        <View
          style={[
            styles.inputStyle,
            {
              borderColor: error ? colors.errorColor : inputBorderColor,
            },
          ]}>
          <AppText
            text={value || placeholder}
            textColor={placeholderTextColor}
          />
          <AppIcon
            name={'calendar-outline'}
            family={iconFamily.ionicons}
            size={20}
            color={colors.black}
          />
        </View>
      </TouchableWithoutFeedback>
      {control ? (
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({field: {onChange, value: controllerValue}}) =>
            renderDatePicker({onChange, value: controllerValue})
          }
        />
      ) : (
        renderDatePicker({onChange: () => {}, value: new Date()})
      )}
      <ErrorText error={error} />
    </View>
  );
};

export default AppDatePicker;

const styles = StyleSheet.create({
  inputStyle: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderRadius: 20,
    ...flexRow,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});
