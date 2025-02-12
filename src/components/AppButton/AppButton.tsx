/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleProp, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../Styles/theme';
import LinearGradient from 'react-native-linear-gradient';
import AppText, {FontWeight} from '../AppText/AppText';
import {fontSizes} from '../../constants/constants';
import {flexRow} from '../../Styles/commonsStyles';
import AppIcon from '../AppIcon/AppIcon';

interface AppButtonProps {
  text: string;
  textStyle?: object;
  fw?: FontWeight;
  buttonStyle?: object;
  width?: string | number;
  textColor?: string;
  borderRadius?: number;
  bgColor?: string;
  btnBorderColor?: string;
  isGradient?: boolean;
  isAcceptType?: boolean;
  isCancelType?: boolean;
  fs?: number;
  paddingVertical?: number;
  onPress?: () => void;
  disabled?: boolean;
  leftIconName?: string;
  leftIconFamilyName?: string;
  rightIconName?: string;
  rightIconFamilyName?: string;
  leftIconProp?: object;
  rightIconProp?: object;
  LeftIcon?: React.ComponentType<any>;
  RightIcon?: React.ComponentType<any>;
}

const AppButton: React.FC<AppButtonProps> = ({
  text,
  textStyle,
  fw = '600',
  buttonStyle,
  width = '100%',
  textColor,
  borderRadius = 20,
  bgColor,
  btnBorderColor = colors.primaryColor,
  isGradient = false,
  isAcceptType = false,
  isCancelType = false,
  fs = fontSizes.lg,
  paddingVertical = 16,
  onPress = () => {},
  disabled = false,
  leftIconName,
  leftIconFamilyName,
  rightIconName,
  rightIconFamilyName,
  LeftIcon,
  RightIcon,
  leftIconProp,
  rightIconProp,
}) => {
  const styles = StyleSheet.create({
    button: {
      ...flexRow,
      borderRadius,
      justifyContent: 'center',
      columnGap: 10,
    },
  });

  const commonTextStyle = {
    ...textStyle,
    textAlign: 'center',
  };

  const getButtonStyle: StyleProp<any> = {
    ...buttonStyle,
    width,
    borderRadius,
    paddingVertical,
  };

  const TextSection = () => (
    <>
      {leftIconName && leftIconFamilyName && (
        <AppIcon
          name={leftIconName}
          family={leftIconFamilyName}
          size={16}
          color={colors.white}
        />
      )}
      {LeftIcon && <LeftIcon {...leftIconProp} />}
      <AppText
        text={text}
        fs={fs}
        fw={fw}
        textStyle={commonTextStyle}
        textColor={
          textColor ? textColor : isCancelType ? colors.black : colors.white
        }
      />
      {rightIconName && rightIconFamilyName && (
        <AppIcon
          name={rightIconName}
          family={rightIconFamilyName}
          size={16}
          color={colors.white}
        />
      )}
      {RightIcon && <RightIcon {...rightIconProp} />}
    </>
  );

  const renderButton = () => {
    if (isGradient) {
      return (
        <TouchableOpacity
          disabled={disabled}
          onPress={onPress}
          style={[getButtonStyle, {paddingVertical: 0}]}>
          <LinearGradient
            style={[styles.button, {paddingVertical}]}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            locations={[0.4, 1]}
            colors={[colors.primaryColor, colors.gradientColor]}>
            <TextSection />
          </LinearGradient>
        </TouchableOpacity>
      );
    }

    const backgroundColor = bgColor
      ? bgColor
      : isAcceptType
      ? colors.btnColor
      : 'transparent';
    const borderColor = isCancelType ? btnBorderColor : undefined;
    const borderWidth = isCancelType ? 1 : undefined;

    return (
      <TouchableOpacity
        disabled={disabled}
        style={[
          styles.button,
          getButtonStyle,
          {backgroundColor, borderColor, borderWidth},
        ]}
        onPress={onPress}>
        <TextSection />
      </TouchableOpacity>
    );
  };

  return renderButton();
};

export default AppButton;
