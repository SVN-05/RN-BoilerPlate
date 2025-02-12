/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {flexCol, flexRow} from '../../Styles/commonsStyles';
import {Animated} from 'react-native';

interface AppSkeletonLoaderProps {
  isLoading: boolean;
  LoaderComp?: React.ComponentType<any>;
  horizontal?: boolean;
  length?: number;
  children: React.ReactNode;
  componentKeys?: any;
  containerStyle?: object;
  rowGap?: number;
  columnGap?: number;
}

const AppSkeletonLoader: React.FC<AppSkeletonLoaderProps> = ({
  isLoading,
  LoaderComp,
  horizontal = false,
  length = 5,
  children,
  componentKeys,
  containerStyle,
  rowGap = 10,
  columnGap = 10,
}) => {
  return (
    <Animated.View style={[{width: '100%', flex: 1}, containerStyle]}>
      {isLoading ? (
        <View
          style={
            horizontal
              ? [flexRow, {columnGap: columnGap, width: '100%'}]
              : [
                  flexCol,
                  {
                    flex: 1,
                    rowGap: rowGap,
                    width: '100%',
                  },
                ]
          }>
          {Array(length)
            .fill(0)
            ?.map((item, index) =>
              LoaderComp ? (
                <LoaderComp key={index} {...componentKeys} />
              ) : undefined,
            )}
        </View>
      ) : (
        children
      )}
    </Animated.View>
  );
};

export default AppSkeletonLoader;
