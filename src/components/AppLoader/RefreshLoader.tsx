import React from 'react';
import {RefreshControl} from 'react-native';
import {colors} from '../../Styles/theme';

interface RefreshLoaderProps {
  refreshLoader: boolean;
  refreshFunc: () => void;
}

export const refreshLoaderComponent = (
  refreshLoader: RefreshLoaderProps['refreshLoader'],
  refreshFunc: RefreshLoaderProps['refreshFunc'],
) => (
  <RefreshControl
    refreshing={refreshLoader}
    onRefresh={refreshFunc}
    colors={[colors.white]}
    progressBackgroundColor={colors.primaryColor}
  />
);
