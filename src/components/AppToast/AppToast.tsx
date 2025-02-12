/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../styles/theme';
import {toastFontSize} from '../../constants/constants';
import AppText from '../AppText/AppText';
import {flexCol, flexRow} from '../../styles/commonsStyles';
import AppIcon, {iconFamily} from '../AppIcon/AppIcon';
import {ToastType} from 'react-native-toast-message';

interface AppToastProps {
  text1?: string;
  text2?: string;
  type: ToastType;
}

const AppToast: React.FC<AppToastProps> = ({text1, text2, type}) => {
  const isSuccessType = type === 'success';
  const iconName = isSuccessType ? 'check-circle' : 'cancel';
  const iconColor = isSuccessType ? colors.green2FB344 : colors.errorColor;

  return (
    <View style={[flexRow, styles.container]}>
      <AppIcon
        family={iconFamily.materialIcons}
        name={iconName}
        size={20}
        color={iconColor}
      />
      <View style={flexCol}>
        <AppText
          text={text1 ?? type}
          fs={toastFontSize.text1}
          textColor={colors.white}
          fw={'600'}
          textStyle={{textTransform: 'capitalize'}}
        />
        {text2 && (
          <AppText
            text={text2}
            fs={toastFontSize.text2}
            textColor={colors.white}
          />
        )}
      </View>
    </View>
  );
};

export default AppToast;

const styles = StyleSheet.create({
  container: {
    width: '80%',
    backgroundColor: colors.black,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    columnGap: 16,
  },
});
