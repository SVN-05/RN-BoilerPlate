import {ViewStyle} from 'react-native';
import {fontSizes, iosStyle} from '../constants/constants';
import {colors, fonts} from './theme';

export const flexCol: ViewStyle = {display: 'flex', flexDirection: 'column'};
export const flexRow: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
};

export const appPaddingHorizontal = 20;
export const appPaddingTop = 43;

export const container: ViewStyle = {
  width: '100%',
  flex: 1,
  paddingHorizontal: appPaddingHorizontal,
  backgroundColor: colors.primaryBackground,
  position: 'relative',
  overflow: 'hidden',
  ...iosStyle,
  ...flexCol,
};

export const tabScreenContainer: ViewStyle = {
  width: '100%',
  flex: 1,
  paddingBottom: 40,
  backgroundColor: colors.primaryBackground,
  position: 'relative',
  ...iosStyle,
  ...flexCol,
};

export const scrollStyle: ViewStyle = {
  width: '100%',
  flex: 1,
  backgroundColor: colors.primaryBackground,
};

export const scrollContentStyle: ViewStyle = {
  ...flexCol,
  paddingBottom: 120,
};

export const commonSlide = {
  animationTypeForReplace: 'push',
  presentation: 'card',
};

export const slideFromRight = {
  animation: 'slide_from_right',
  ...commonSlide,
};

export const slideFromLeft = {
  animation: 'slide_from_left',
  ...commonSlide,
};

export const slideFromBottom = {
  animation: 'slide_from_bottom',
  ...commonSlide,
};

export const fadeFromBottom = {
  animation: 'fade_from_bottom',
  ...commonSlide,
};

export const commonTabBarStyle = {
  width: '100%',
  backgroundColor: '',
  borderWidth: 1,
  borderColor: '',
  elevation: 1,
  borderRadius: 50,
};

export const commonTabBarIndicatorStyle = {
  display: 'none',
};

export const commonTopTabLabelStyle = {
  fontFamily: fonts.primaryMedium,
  textTransform: 'capitalize',
  fs: fontSizes.xs,
};

export const dividerColor = colors.greyE6E6E6;

export const greyLine: ViewStyle = {
  width: '100%',
  height: 1,
  backgroundColor: dividerColor,
  opacity: 0.7,
};

export const lineStyle: ViewStyle = {
  height: 1,
  backgroundColor: dividerColor,
  opacity: 0.7,
  flex: 1,
};

export const verticalGreyLine: ViewStyle = {
  width: 1,
  height: '100%',
  backgroundColor: dividerColor,
  opacity: 0.7,
};
