/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TextStyle, View} from 'react-native';
import {flexCol} from '../../Styles/commonsStyles';
import {fontSizes, windowHeight} from '../../constants/constants';
import AppText from '../AppText/AppText';

const NoData = ({
  horizontal = false,
  is_full_screen = false,
  textStyle = {} as TextStyle,
}: {
  horizontal?: boolean;
  is_full_screen?: boolean;
  textStyle?: TextStyle;
}) => {
  return (
    <View
      style={[
        flexCol,
        {
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        },
        horizontal
          ? {
              height: 100,
            }
          : is_full_screen
          ? {height: windowHeight}
          : {flex: 1},
      ]}>
      <AppText
        text={'No Data Found'}
        fs={fontSizes.md}
        fw={'500'}
        textStyle={textStyle}
      />
    </View>
  );
};

export default NoData;
