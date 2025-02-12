/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {colors} from '../../Styles/theme';
import AppText from '../AppText/AppText';
import {fontSizes} from '../../constants/constants';

const ListFooterComp = ({
  loading = false,
  data = [],
  showText = false,
  horizontal = false,
}) => {
  return (
    <View
      style={{
        width: horizontal ? 'auto' : '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
      }}>
      {loading ? (
        <ActivityIndicator
          animating={loading}
          size={'small'}
          color={colors.primaryColor}
        />
      ) : data?.length > 3 && showText ? (
        <AppText
          text={"You're up to date"}
          fs={fontSizes.md}
          textColor={colors.primaryColor}
          textStyle={{
            marginBottom: horizontal ? 0 : 60,
          }}
        />
      ) : null}
    </View>
  );
};

export default ListFooterComp;
