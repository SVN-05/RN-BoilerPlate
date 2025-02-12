import React, {useState} from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {colors} from '../../../../Styles/theme';
import AppText from '../../../AppText/AppText';
import {Controller} from 'react-hook-form';
import {ErrorText} from '../../../microComponents/ErrorText';
import {flexRow} from '../../../../Styles/commonsStyles';
import AppIcon, {iconFamily} from '../../../AppIcon/AppIcon';

const AppDatePicker = ({
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
    if (!disabled) setOpen(prev => !prev);
  };

  const renderDatePicker = (onChange, value) => (
    <DatePicker
      modal
      mode={mode}
      open={open}
      date={value ? new Date(value) : new Date()}
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
          style={{
            width: '100%',
            height: 60,
            borderColor: error ? colors.errorColor : inputBorderColor,
            borderWidth: 1,
            borderRadius: 20,
            ...flexRow,
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
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
          render={({field: {onChange, value}}) =>
            renderDatePicker(onChange, value)
          }
        />
      ) : (
        renderDatePicker(() => {}, new Date())
      )}
      <ErrorText error={error} />
    </View>
  );
};

export default AppDatePicker;
