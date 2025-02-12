import {Dimensions, Platform} from 'react-native';
import {getDeviceType, getReadableVersion} from 'react-native-device-info';
import {fontSizeCalculator} from '../utils/functions/functions';

export const APP_ENVIRONMENT = 'STAGING'; // 'PRODUCTION' or 'STAGING'
export const isProd = ['PRODUCTION']?.includes(APP_ENVIRONMENT);

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const customHeight = Number(windowHeight * 0.7);

export const fadeAnimDuration = 300;
export const fadeAnimDelay = 300;
export const toastFontSize = {text1: 17, text2: 13};

export const isTablet = ['Tablet']?.includes(getDeviceType());
export const behaviour = Platform.OS === 'ios' ? 'padding' : 'height';
export const iosStyle = {paddingTop: Platform.OS === 'ios' ? 30 : 0};
export const isAndroid = Platform.OS === 'android';

export const designFontSize = {
  xs: 11,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  xxxl: 24,
  fxl: 28,
  fxxl: 30,
  fxxxl: 32,
  fxxxxl: 34,
  fxxxxxl: 38,
};

export const fontSizes = {
  xs: fontSizeCalculator(designFontSize.xs),
  sm: fontSizeCalculator(designFontSize.sm),
  md: fontSizeCalculator(designFontSize.md),
  lg: fontSizeCalculator(designFontSize.lg),
  xl: fontSizeCalculator(designFontSize.xl),
  xxl: fontSizeCalculator(designFontSize.xxl),
  xxxl: fontSizeCalculator(designFontSize.xxxl),
  fxl: fontSizeCalculator(designFontSize.fxl),
  fxxl: fontSizeCalculator(designFontSize.fxxl),
  fxxxl: fontSizeCalculator(designFontSize.fxxxl),
  fxxxxl: fontSizeCalculator(designFontSize.fxxxxl),
  fxxxxxl: fontSizeCalculator(designFontSize.fxxxxxl),
};

export const appVersion = getReadableVersion();
export const envirointmentText = isProd ? '' : 'Staging';
export const versionText = `App Version ${appVersion} ${envirointmentText}`;

export const screenAnimateDuration = 1000;
export const cardAnimateDuration = 700;
export const delayDurationCard = 500;

export const paginationErrorText = {
  text1: 'End of content',
  text2: 'You have reached the end of the list. No more data to fetch.',
};

export const fileMimeType = {
  allFiles: '*/*',
  audio: 'audio/*',
  csv: 'text/csv',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  images: 'image/*',
  json: 'application/json',
  pdf: 'application/pdf',
  plainText: 'text/plain',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  video: 'video/*',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  zip: 'application/zip',
};

export const inr = '₹';

export const drawerWidth = '75%';

export const homePaddingHorizontal = 16;

export const store_url = Platform.select({
  android: '',
  ios: '',
});

export const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
