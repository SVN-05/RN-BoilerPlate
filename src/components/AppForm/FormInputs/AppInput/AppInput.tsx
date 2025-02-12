/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  InputModeOptions,
} from 'react-native';
import {colors} from '../../../../styles/theme';
import AppText from '../../../AppText/AppText';
import {Controller} from 'react-hook-form';
import {ErrorText} from '../../../micro/ErrorText';
import {flexCol} from '../../../../styles/commonsStyles';
import {fontSizes} from '../../../../constants/constants';
import AppIcon, {iconFamily} from '../../../AppIcon/AppIcon';

interface AppInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  isPhone?: boolean;
  inputContainer?: object;
  inputProps?: object;
  error?: string;
  control?: any;
  name: string;
  disabled?: boolean;
  rules?: object;
  label?: string;
  multiline?: boolean;
  inputMode?: InputModeOptions;
  height?: number;
  borderRadius?: number;
  inputBgColor?: string;
  leftIconName?: string;
  leftIconFamilyName?: string;
  rightIconName?: string;
  rightIconFamilyName?: string;
  isSearch?: boolean;
  onLeftIconCLick?: () => void;
  onRightIconClick?: () => void;
  showRightIcon?: boolean;
  autoComplete?:
    | 'off'
    | 'username'
    | 'password'
    | 'email'
    | 'name'
    | 'tel'
    | 'street-address'
    | 'postal-code'
    | 'cc-number'
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | undefined;
  autoFocus?: boolean;
  onPress?: () => void;
  onFocus?: () => void;
}

const AppInput: React.FC<AppInputProps> = ({
  placeholder,
  value,
  onChangeText,
  keyboardType,
  isPhone = false,
  inputContainer,
  inputProps,
  error,
  control,
  name,
  disabled = false,
  rules,
  label,
  multiline = false,
  inputMode,
  height = 60,
  borderRadius = 20,
  inputBgColor = colors.transparent,
  leftIconName,
  leftIconFamilyName,
  rightIconName,
  rightIconFamilyName,
  isSearch = false,
  onLeftIconCLick,
  onRightIconClick,
  showRightIcon = true,
  autoComplete,
  autoFocus,
  onPress,
  onFocus,
}) => {
  const inputBorderColor = colors.inputBorderColor;
  const placeholderTextColor = colors.placeholderTxtColor;
  const labelColor = error ? colors.errorColor : colors.placeholderTxtColor;
  const applyPaddingLeft =
    isPhone ||
    (leftIconName !== undefined && leftIconFamilyName !== undefined) ||
    isSearch;
  const showRightIconComp =
    (isSearch && showRightIcon) ||
    (rightIconName !== undefined && rightIconFamilyName !== undefined);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
    input: {
      flex: 1,
      height: height,
      borderWidth: 1,
      borderColor: error ? colors.errorColor : inputBorderColor,
      borderRadius: borderRadius,
      paddingLeft: applyPaddingLeft ? 42 : 20,
      paddingRight: 15,
      fontSize: 16,
      color: colors.textColor,
      backgroundColor: inputBgColor,
    },
    prefix: {
      position: 'absolute',
      left: 12,
      zIndex: 2,
    },
    prefixText: {
      color: colors.placeholderTxtColor,
    },
  });

  const renderInput = ({
    field,
  }: {
    field: {
      value?: string;
      onBlur?: () => void;
      onChange?: (text: string) => void;
    };
  }) => (
    <TextInput
      style={styles.input}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      onFocus={onFocus}
      multiline={multiline}
      inputMode={inputMode}
      value={field.value} // Use field.value or fallback to value prop
      onBlur={field.onBlur}
      onPress={onPress}
      onChangeText={text => {
        if (field?.onChange) {
          field?.onChange(text);
        }
      }}
      keyboardType={keyboardType}
      placeholder={placeholder}
      cursorColor={colors.primaryColor}
      placeholderTextColor={placeholderTextColor}
      editable={disabled ? false : true}
      {...inputProps}
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
      <View style={styles.container}>
        {applyPaddingLeft && (
          <View style={[styles.prefix, isPhone ? {top: 19} : {}]}>
            {isPhone ? (
              <AppText
                text={'+91'}
                textColor={placeholderTextColor}
                fs={fontSizes.md}
              />
            ) : (
              <AppIcon
                name={isSearch ? 'search' : leftIconName}
                family={isSearch ? iconFamily.feather : leftIconFamilyName}
                size={24}
                color={colors.iconColor}
                onPress={onLeftIconCLick}
              />
            )}
          </View>
        )}
        {control ? (
          <Controller
            control={control}
            name={name}
            rules={rules}
            render={renderInput}
          />
        ) : (
          renderInput({field: {value, onChange: onChangeText}}) // Handle uncontrolled case
        )}
        {showRightIconComp && (
          <AppIcon
            name={isSearch ? 'clear' : rightIconName}
            family={isSearch ? iconFamily.materialIcons : rightIconFamilyName}
            size={24}
            color={colors.iconColor}
            style={{position: 'absolute', right: 12, zIndex: 5}}
            onPress={event => {
              event.stopPropagation();
              if (onRightIconClick) {
                onRightIconClick();
              }
            }}
          />
        )}
      </View>
      <ErrorText error={error} />
    </View>
  );
};

export default AppInput;
