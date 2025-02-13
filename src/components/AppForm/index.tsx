/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, TextStyle} from 'react-native';
import AppInput from './FormInputs/AppInput/AppInput';
import AppDatePicker from './FormInputs/AppDatePicker/AppDatePicker';
import AppSelect from './FormInputs/AppSelect/AppSelect';
import AppCheckbox from './FormInputs/AppCheckbox/AppCheckbox';
import AppAttachmentPicker from './FormInputs/AppAttachmentPicker/AppAttachmentPicker';
import AppRadioInput from './FormInputs/AppRadioInput/AppRadioInput';
import AppText from '../AppText/AppText';
import {fontSizes} from '../../constants/constants';
import AppButton from '../AppButton/AppButton';

interface AppFormProps {
  title?: string;
  fields: Array<any>;
  errors: any;
  watch: (name: string) => any;
  btnText?: string;
  btnStyle?: any;
  isGradient?: boolean;
  isAcceptType?: boolean;
  isCancelType?: boolean;
  onSubmit: () => void;
  formStyle?: any;
  control: any;
  onSearch?: (query: string) => void;
  textColor?: string;
}

interface Field {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  validation?: object;
  width?: string | number;
  isPhone?: boolean;
  inputProps?: object;
  disabled?: boolean;
  onFocus?: () => void;
  minDate?: Date;
  maxDate?: Date;
  options?: Array<never>;
  labelField?: string;
  valueField?: string;
  enableSearch?: boolean;
  sendObject?: boolean;
  fileTypes?: Array<string>;
  allowMultiSelection?: boolean;
  uploadUrl?: string;
  layout?: 'column' | 'row';
  leftText?: string;
  leftTextStyle?: TextStyle;
  rightText?: string;
  rightTextStyle?: TextStyle;
}

const AppForm: React.FC<AppFormProps> = ({
  title,
  fields,
  errors,
  watch,
  btnText,
  btnStyle,
  isGradient,
  isAcceptType,
  isCancelType,
  onSubmit,
  formStyle,
  control,
  onSearch,
  textColor,
}) => {
  const renderInputField = (field: Field) => {
    const {
      required,
      validation,
      width,
      type,
      name,
      label,
      placeholder,
      isPhone,
      inputProps,
      onFocus,
      minDate,
      maxDate,
      options,
      labelField,
      valueField,
      enableSearch,
      sendObject,
      disabled,
      fileTypes,
      allowMultiSelection,
      uploadUrl,
      layout,
      leftText,
      leftTextStyle,
      rightText,
      rightTextStyle,
    } = field || {};

    const rules = {
      required: {
        value: required ?? true,
        message: 'This field is required',
      },
      ...(validation || {}),
    };

    return (
      <View
        style={{
          flexBasis: typeof width === 'number' ? width : '100%',
          flexGrow: 1,
        }}
        key={name}>
        {(() => {
          switch (type) {
            case 'text':
            case 'numeric':
              return (
                <AppInput
                  label={label}
                  name={name}
                  placeholder={placeholder}
                  control={control}
                  keyboardType={type === 'text' ? 'default' : type}
                  isPhone={isPhone}
                  inputProps={inputProps}
                  error={errors[name]?.message}
                  rules={rules}
                  disabled={disabled}
                  onFocus={onFocus}
                />
              );
            case 'date':
              return (
                <AppDatePicker
                  label={label}
                  name={name}
                  placeholder={placeholder}
                  value={watch(name)}
                  error={errors[name]?.message}
                  control={control}
                  rules={rules}
                  minDate={minDate}
                  maxDate={maxDate}
                />
              );
            case 'select':
              return (
                <AppSelect
                  label={label}
                  name={name}
                  placeholder={placeholder}
                  error={errors[name]?.message}
                  options={options}
                  labelField={labelField}
                  valueField={valueField}
                  control={control}
                  enableSearch={enableSearch}
                  onSearch={onSearch}
                  sendObject={sendObject}
                  disabled={disabled}
                  rules={rules}
                />
              );
            case 'checkbox':
              return (
                <AppCheckbox
                  name={name}
                  checked={watch(name)}
                  error={errors[name]?.message}
                  leftText={leftText}
                  leftTextStyle={leftTextStyle}
                  rightText={rightText}
                  rightTextStyle={rightTextStyle}
                />
              );
            case 'file':
              return (
                <AppAttachmentPicker
                  name={name}
                  placeholder={placeholder}
                  error={errors[name]?.message}
                  fileTypes={fileTypes}
                  allowMultiSelection={allowMultiSelection}
                  control={control}
                  rules={rules}
                  uploadUrl={uploadUrl}
                />
              );
            case 'radio':
              return (
                <AppRadioInput
                  name={name}
                  label={label}
                  error={errors[name]?.message}
                  options={options}
                  layout={layout}
                  control={control}
                  rules={rules}
                />
              );
            default:
              return null;
          }
        })()}
      </View>
    );
  };

  return (
    <View style={[styles.container, formStyle]}>
      {title && (
        <AppText text={title} fs={fontSizes.xl} textStyle={styles.title} />
      )}
      <View style={styles.inputContainer}>{fields?.map(renderInputField)}</View>
      {/* Handle form submission */}
      {btnText && (
        <AppButton
          text={btnText}
          textColor={textColor}
          isGradient={isGradient}
          isAcceptType={isAcceptType}
          isCancelType={isCancelType}
          onPress={onSubmit}
          buttonStyle={btnStyle}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontWeight: '500',
    marginBottom: 25,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 20,
    columnGap: 13,
  },
});

export default AppForm;
