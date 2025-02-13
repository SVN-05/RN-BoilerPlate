/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../../../../styles/theme';
import {fontSizes} from '../../../../constants/constants';
import {Controller} from 'react-hook-form';
import AppText from '../../../AppText/AppText';
import {ErrorText} from '../../../micro/ErrorText';
import {flexCol} from '../../../../styles/commonsStyles';
import AppIcon, {iconFamily} from '../../../AppIcon/AppIcon';

interface AppSelectProps {
  placeholder?: string;
  enableSearch?: boolean;
  labelField?: string;
  valueField?: string;
  searchPlaceholder?: string;
  control?: any;
  name?: string;
  error?: string;
  rules?: any;
  mode?: 'default' | 'auto' | 'modal';
  disabled?: boolean;
  options?: Array<{[key: string]: any}>;
  value?: any;
  onChange?: (value: any) => void;
  onSearch?: (text: string) => void;
  label?: string;
  sendObject?: boolean;
  style?: any;
}

interface RenderInputProps {
  onSelect: (value: string) => void;
  passed_value: {[key: string]: any};
}

const Icon = (icon_name: string): JSX.Element => (
  <AppIcon name={icon_name} size={14} family={iconFamily.antDesign} />
);

const AppSelect: React.FC<AppSelectProps> = ({
  placeholder,
  enableSearch,
  labelField = 'label',
  valueField = 'value',
  searchPlaceholder,
  control,
  name = '',
  error,
  rules,
  mode = 'default',
  disabled = false,
  options = [],
  value,
  onChange,
  onSearch,
  label,
  sendObject = false,
  style,
}) => {
  const inputBorderColor = colors.inputBorderColor;
  const placeholderTextColor = colors.placeholderTxtColor;
  const labelColor = error ? colors.errorColor : colors.placeholderTxtColor;

  const renderDropDownIcon = (visible: boolean = false) =>
    visible ? Icon('up') : Icon('down');

  const renderDropdown = ({onSelect, passed_value}: RenderInputProps) => (
    <Dropdown
      disable={disabled}
      mode={mode}
      style={{
        ...styles.dropdown,
        borderColor: error ? colors.errorColor : inputBorderColor,
      }}
      placeholderStyle={{
        ...styles.placeholderStyle,
        color: placeholderTextColor,
      }}
      selectedTextStyle={{
        ...styles.selectedTextStyle,
        color: placeholderTextColor,
      }}
      inputSearchStyle={{
        ...styles.inputSearchStyle,
        color: placeholderTextColor,
      }}
      data={options}
      search={enableSearch}
      maxHeight={300}
      labelField={labelField}
      valueField={valueField}
      placeholder={placeholder}
      searchPlaceholder={searchPlaceholder}
      value={sendObject ? passed_value?.[valueField] : passed_value}
      iconColor={colors.placeholderTxtColor}
      renderRightIcon={renderDropDownIcon}
      renderItem={item => (
        <AppText
          textStyle={styles.textStyle}
          text={item?.[labelField]}
          textColor={colors.black}
        />
      )}
      onChangeText={onSearch}
      onChange={item => onSelect(sendObject ? item : item?.[valueField])}
    />
  );

  return (
    <View style={[flexCol, style]}>
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
          render={({
            field: {onChange: controllerOnChange, value: controllerValue},
          }) =>
            renderDropdown({
              onSelect: controllerOnChange,
              passed_value: controllerValue,
            })
          }
        />
      ) : (
        renderDropdown({onSelect: onChange || (() => {}), passed_value: value})
      )}
      <ErrorText error={error} />
    </View>
  );
};

export default AppSelect;

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  placeholderStyle: {
    fontSize: fontSizes.md,
  },
  selectedTextStyle: {
    fontSize: fontSizes.md,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: fontSizes.md,
  },
  textStyle: {
    marginVertical: 10,
    paddingLeft: 20,
    textTransform: 'capitalize',
  },
});
