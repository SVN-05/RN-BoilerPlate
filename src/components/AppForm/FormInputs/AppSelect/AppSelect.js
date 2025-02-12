import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../../../../Styles/theme';
import {fontSizes} from '../../../../constants/constants';
import {Controller} from 'react-hook-form';
import AppText from '../../../AppText/AppText';
import {ErrorText} from '../../../microComponents/ErrorText';
import {flexCol} from '../../../../Styles/commonsStyles';
import AppIcon, {iconFamily} from '../../../AppIcon/AppIcon';

const AppSelect = ({
  placeholder,
  enableSearch,
  labelField = 'label',
  valueField = 'value',
  searchPlaceholder,
  control,
  name,
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

  const Icon = name => <AppIcon name={name} family={iconFamily.antDesign} />;

  const renderDropDownIcon = visible => (visible ? Icon('up') : Icon('down'));

  const renderDropdown = (onChange, value) => (
    <Dropdown
      disable={disabled}
      mode={mode}
      style={styles.dropdown(error, inputBorderColor)}
      placeholderStyle={styles.placeholderStyle(placeholderTextColor)}
      selectedTextStyle={styles.selectedTextStyle(placeholderTextColor)}
      inputSearchStyle={styles.inputSearchStyle(placeholderTextColor)}
      data={options}
      search={enableSearch}
      maxHeight={300}
      labelField={labelField}
      valueField={valueField}
      placeholder={placeholder}
      searchPlaceholder={searchPlaceholder}
      value={sendObject ? value?.[valueField] : value}
      iconColor={colors.placeholderTxtColor}
      renderRightIcon={renderDropDownIcon}
      renderItem={item => (
        <AppText
          textStyle={{
            marginVertical: 10,
            paddingLeft: 20,
            textTransform: 'capitalize',
          }}
          text={item?.[labelField]}
          textColor={colors.black}
        />
      )}
      onChangeText={onSearch}
      onChange={item => onChange(sendObject ? item : item?.[valueField])}
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
          render={({field: {onChange, value}}) =>
            renderDropdown(onChange, value)
          }
        />
      ) : (
        renderDropdown(onChange, value)
      )}
      <ErrorText error={error} />
    </View>
  );
};

export default AppSelect;

const styles = StyleSheet.create({
  dropdown: (error, inputBorderColor) => ({
    height: 40,
    borderColor: error ? colors.errorColor : inputBorderColor,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
  }),
  placeholderStyle: placeholderTextColor => ({
    fs: fontSizes.md,
    color: placeholderTextColor,
  }),
  selectedTextStyle: placeholderTextColor => ({
    fs: fontSizes.md,
    color: placeholderTextColor,
  }),
  inputSearchStyle: placeholderTextColor => ({
    height: 40,
    fs: fontSizes.md,
    color: placeholderTextColor,
  }),
});
